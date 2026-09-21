import {
  Card,
  GameState,
  PlayerState,
  Question,
  ClientQuestion,
  GameMode,
  AiDifficulty,
  MathLevel,
  GameEventLog,
} from '../../shared/types.ts';
import { DECK_60_CARDS } from '../../shared/cards.ts';
import { ALL_RUNES } from '../../shared/runes.ts';
import { getQuestionForCategory } from '../questions/questionBank.ts';
import { db } from '../database/db.ts';

function shuffleDeck<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Function to deal 2 random distinct runes from ALL_RUNES
function pick2RandomRunes(): string[] {
  const shuffled = [...ALL_RUNES].sort(() => Math.random() - 0.5);
  return [shuffled[0].id, shuffled[1].id];
}

function canTriggerRune(player: PlayerState | undefined, runeId: string): boolean {
  if (!player) return false;
  const hasRune = player.chosenRuneId === runeId || player.runes.some(r => r.runeId === runeId);
  if (!hasRune) return false;

  const def = ALL_RUNES.find(r => r.id === runeId);
  if (!def) return false;

  // Once-per-match check (Rune Bất Tử, Rune Hồi Sinh):
  if (def.limitType === 'once_per_match') {
    if (player.runeUsedInMatch) return false;
    const slot = player.runes.find(r => r.runeId === runeId);
    if (slot && (slot.usedInMatch || slot.usesLeft <= 0)) return false;
    return true;
  }

  // Once-per-turn check (Shield, Insurance, Harvest, Siphon, Retry, Swap, Purify, Double, Bank Bonus):
  if (def.limitType === 'once_per_turn') {
    if (player.runeUsedThisTurn) return false;
    const slot = player.runes.find(r => r.runeId === runeId);
    if (slot && (slot.usedThisTurn || slot.usesLeft <= 0)) return false;
    return true;
  }

  // Continuous passive
  return true;
}

function triggerRune(player: PlayerState, runeId: string): void {
  const def = ALL_RUNES.find(r => r.id === runeId);
  if (!def) return;

  if (def.limitType === 'once_per_match') {
    player.runeUsedInMatch = true;
    player.runes.forEach(slot => {
      if (slot.runeId === runeId) {
        slot.usedInMatch = true;
        slot.usesLeft = 0;
        slot.active = false;
      }
    });
  } else if (def.limitType === 'once_per_turn') {
    player.runeUsedThisTurn = true;
    player.runes.forEach(slot => {
      if (slot.runeId === runeId) {
        slot.usedThisTurn = true;
        slot.usesLeft = 0;
        slot.active = false;
      }
    });
  }
}

function hasActiveRune(player: PlayerState | undefined, runeId: string): boolean {
  return canTriggerRune(player, runeId);
}

export class GameEngine {
  private games: Map<string, {
    state: GameState;
    fullDeck: Card[];
    currentFullQuestion?: Question;
    pendingCard?: Card;
    aiTimer?: NodeJS.Timeout;
  }> = new Map();

  public onStateChange?: (gameId: string, state: GameState, event: string, extra?: any) => void;

  public notifyState(gameId: string, event: string, extra?: any) {
    const session = this.games.get(gameId);
    if (session && this.onStateChange) {
      this.onStateChange(gameId, session.state, event, extra);
    }
  }

  public getGame(gameId: string): GameState | undefined {
    return this.games.get(gameId)?.state;
  }

  private updateNextCardPreview(state: GameState, session: { fullDeck: Card[] }) {
    // Check if any player has the foresight rune
    const hasForesight = Object.values(state.players).some(p => hasActiveRune(p, 'rune_foresight'));
    if (hasForesight && session.fullDeck.length > 0) {
      const nextCard = session.fullDeck[session.fullDeck.length - 1];
      state.nextCardPreview = {
        domainId: nextCard.domainId,
        domainNameVi: nextCard.domainNameVi,
        pointValue: nextCard.pointValue,
        elementColor: nextCard.elementColor,
      };
    } else {
      state.nextCardPreview = undefined;
    }
  }

  public createGame(options: {
    gameId: string;
    roomCode: string;
    mode: GameMode;
    aiDifficulty?: AiDifficulty;
    mathLevel?: MathLevel;
    player1: { id: string; name: string; avatar: string; runes?: string[] };
    player2?: { id: string; name: string; avatar: string; runes?: string[] };
  }): GameState {
    const mathLevel = options.mathLevel || 'CO_BAN';
    const deck = shuffleDeck(DECK_60_CARDS);

    // Player 1 gets 2 random distinct runes to choose 1 from
    const p1Draft = pick2RandomRunes();

    const p1State: PlayerState = {
      id: options.player1.id,
      name: options.player1.name,
      avatar: options.player1.avatar,
      hp: 100,
      safeScore: 0,
      currentTurnScore: 0,
      runes: [],
      draftRunes: p1Draft,
      chosenRuneId: undefined,
      runeUsedThisTurn: false,
      runeUsedInMatch: false,
      connected: true,
      stats: {
        correctCount: 0,
        wrongCount: 0,
        bustCount: 0,
        comboMax: 0,
        currentCombo: 0,
        categoryAccuracy: {},
      },
    };

    let p2State: PlayerState;
    if (options.mode === 'ai') {
      const aiDiff = options.aiDifficulty || 'medium';
      const aiDraft = pick2RandomRunes();
      // AI chooses 1 of its 2 random runes immediately
      const aiChosenRune = aiDraft[Math.floor(Math.random() * aiDraft.length)];
      const aiRuneDef = ALL_RUNES.find(r => r.id === aiChosenRune);
      const isAiOncePerMatch = aiRuneDef?.limitType === 'once_per_match';

      p2State = {
        id: 'bot-ai',
        name: `AI Archimedes (${aiDiff === 'easy' ? 'DỄ' : aiDiff === 'medium' ? 'VỪA' : 'CAO CẤP'})`,
        avatar: '🤖',
        hp: 100,
        safeScore: 0,
        currentTurnScore: 0,
        runes: [{
          runeId: aiChosenRune,
          usesLeft: isAiOncePerMatch ? 1 : 1,
          active: true,
          usedThisTurn: false,
          usedInMatch: false,
        }],
        draftRunes: aiDraft,
        chosenRuneId: aiChosenRune,
        runeUsedThisTurn: false,
        runeUsedInMatch: false,
        isAi: true,
        connected: true,
        stats: {
          correctCount: 0,
          wrongCount: 0,
          bustCount: 0,
          comboMax: 0,
          currentCombo: 0,
          categoryAccuracy: {},
        },
      };
    } else {
      const p2Draft = pick2RandomRunes();
      p2State = {
        id: options.player2?.id || 'waiting_player',
        name: options.player2?.name || 'Đang chờ đối thủ...',
        avatar: options.player2?.avatar || '👤',
        hp: 100,
        safeScore: 0,
        currentTurnScore: 0,
        runes: [],
        draftRunes: p2Draft,
        chosenRuneId: undefined,
        runeUsedThisTurn: false,
        runeUsedInMatch: false,
        connected: !!options.player2,
        stats: {
          correctCount: 0,
          wrongCount: 0,
          bustCount: 0,
          comboMax: 0,
          currentCombo: 0,
          categoryAccuracy: {},
        },
      };
    }

    const gameState: GameState = {
      gameId: options.gameId,
      roomCode: options.roomCode,
      mode: options.mode,
      aiDifficulty: options.aiDifficulty,
      status: options.mode === 'ai' ? 'drafting' : (options.player2 ? 'drafting' : 'waiting'),
      targetScore: 150,
      round: 1,
      turn: 1,
      currentPlayerId: options.player1.id,
      players: {
        [p1State.id]: p1State,
        [p2State.id]: p2State,
      },
      tableCards: [],
      deckRemaining: deck.length,
      historyLog: [
        {
          id: `log_${Date.now()}`,
          timestamp: Date.now(),
          type: 'turn_switch',
          playerId: p1State.id,
          playerName: p1State.name,
          message: `Trận đấu chuẩn bị bắt đầu! Mỗi người chơi được chia 2 lá Rune ngẫu nhiên — hãy chọn 1 lá để kích hoạt nội tại xuyên suốt trận!`,
        },
      ],
      mathLevel,
    };

    const session = {
      state: gameState,
      fullDeck: deck,
    };
    this.games.set(options.gameId, session);
    this.updateNextCardPreview(gameState, session);

    return gameState;
  }

  public joinGame(gameId: string, player: { id: string; name: string; avatar: string; runes?: string[] }): GameState | null {
    const session = this.games.get(gameId);
    if (!session) return null;
    const { state } = session;

    if (Object.keys(state.players).length >= 2 && !state.players['waiting_player']) {
      return null;
    }

    const p2Draft = pick2RandomRunes();
    const pState: PlayerState = {
      id: player.id,
      name: player.name,
      avatar: player.avatar,
      hp: 100,
      safeScore: 0,
      currentTurnScore: 0,
      runes: [],
      draftRunes: p2Draft,
      chosenRuneId: undefined,
      runeUsedThisTurn: false,
      runeUsedInMatch: false,
      connected: true,
      stats: {
        correctCount: 0,
        wrongCount: 0,
        bustCount: 0,
        comboMax: 0,
        currentCombo: 0,
        categoryAccuracy: {},
      },
    };

    if (state.players['waiting_player'] && player.id !== 'waiting_player') {
      delete state.players['waiting_player'];
    }
    state.players[player.id] = pState;

    // Both players must draft their rune
    state.status = 'drafting';
    state.historyLog.push({
      id: `log_${Date.now()}`,
      timestamp: Date.now(),
      type: 'turn_switch',
      playerId: player.id,
      playerName: player.name,
      message: `${player.name} đã tham gia phòng! Hai bên tiến hành chọn 1 trong 2 lá Rune nội tại.`,
    });

    return state;
  }

  // CHOOSE DRAFT RUNE (1 of 2 random dealt runes)
  public chooseDraftRune(gameId: string, playerId: string, runeId: string): { success: boolean; state: GameState; error?: string } {
    const session = this.games.get(gameId);
    if (!session) return { success: false, error: 'Trận đấu không tồn tại.', state: {} as any };
    const { state } = session;
    const player = state.players[playerId];
    if (!player) return { success: false, error: 'Người chơi không tìm thấy.', state };

    if (player.chosenRuneId) {
      return { success: false, error: 'Bạn đã chọn lá bài Rune nội tại rồi.', state };
    }

    if (!player.draftRunes || !player.draftRunes.includes(runeId)) {
      return { success: false, error: 'Lá bài Rune này không nằm trong 2 lá được chia.', state };
    }

    const runeDef = ALL_RUNES.find(r => r.id === runeId);
    const isOncePerMatch = runeDef?.limitType === 'once_per_match';

    player.chosenRuneId = runeId;
    player.runes = [{
      runeId,
      usesLeft: isOncePerMatch ? 1 : 1,
      active: true,
      usedThisTurn: false,
      usedInMatch: false,
    }];
    player.runeUsedThisTurn = false;
    player.runeUsedInMatch = false;
    state.historyLog.push({
      id: `log_${Date.now()}`,
      timestamp: Date.now(),
      type: 'rune_used',
      playerId,
      playerName: player.name,
      message: `⚡ ${player.name} đã chọn ấn chú nội tại: [${runeDef?.name || runeId}]! Tác dụng kích hoạt xuyên suốt cả trận đấu.`,
    });

    // Check if all connected players have chosen their rune
    const activePlayers = Object.values(state.players).filter(p => p.connected);
    const allChosen = activePlayers.length >= 2 && activePlayers.every(p => !!p.chosenRuneId);

    if (allChosen) {
      state.status = 'playing';
      state.historyLog.push({
        id: `log_${Date.now()}`,
        timestamp: Date.now(),
        type: 'turn_switch',
        playerId: state.currentPlayerId,
        playerName: state.players[state.currentPlayerId]?.name || 'Pháp sư',
        message: `✨ Tất cả pháp sư đã chọn xong ấn chú nội tại! Trận đấu chính thức bắt đầu!`,
      });

      this.updateNextCardPreview(state, session);

      // If AI goes first
      if (state.currentPlayerId === 'bot-ai') {
        this.checkAiTurn(gameId);
      }
    }

    if (this.onStateChange) {
      this.onStateChange(gameId, state, 'rune_chosen');
    }

    return { success: true, state };
  }

  // DRAW ACTION
  public drawCard(gameId: string, playerId: string): { success: boolean; error?: string; state: GameState; isBust?: boolean } {
    const session = this.games.get(gameId);
    if (!session) return { success: false, error: 'Trận đấu không tồn tại.', state: {} as any };
    const { state } = session;

    if (state.status !== 'playing') {
      return { success: false, error: 'Trận đấu chưa sẵn sàng hoặc đã kết thúc.', state };
    }
    if (state.currentPlayerId !== playerId) {
      return { success: false, error: 'Chưa tới lượt của bạn.', state };
    }
    if (state.currentQuestion) {
      return { success: false, error: 'Bạn đang có câu hỏi toán chưa giải xong!', state };
    }

    const player = state.players[playerId];

    // Refill deck if empty
    if (session.fullDeck.length === 0) {
      session.fullDeck = shuffleDeck(DECK_60_CARDS);
    }

    const drawnCard = session.fullDeck.pop()!;
    state.deckRemaining = session.fullDeck.length;
    this.updateNextCardPreview(state, session);

    // CHECK BUST: Does table already have this domain?
    const hasDomain = state.tableCards.some(c => c.domainId === drawnCard.domainId);

    if (hasDomain) {
      // 1. Check if Rune Khiên Chắn (Shield) is active (1 lần/lượt!)
      if (state.activeShield || canTriggerRune(player, 'rune_shield')) {
        state.activeShield = false;
        triggerRune(player, 'rune_shield');
        state.historyLog.push({
          id: `log_${Date.now()}`,
          timestamp: Date.now(),
          type: 'rune_used',
          playerId,
          playerName: player.name,
          message: `🛡️ [KHIÊN CHẮN (1 LẦN/LƯỢT)] đã kích hoạt bảo mệnh cho ${player.name}, hóa giải BUST trùng hệ ${drawnCard.domainNameVi}! (Lượt này không thể dùng khiên thêm)`,
        });
        // Shield absorbed the duplicate card safely without losing points!
        return { success: true, state, isBust: false };
      }

      // 2. Check for Rune Hồi Sinh (Revive - DUY NHẤT 1 LẦN/TRẬN!)
      if (canTriggerRune(player, 'rune_revive')) {
        triggerRune(player, 'rune_revive');
        const preserved = Math.ceil(player.currentTurnScore * 0.5);
        player.safeScore += preserved;
        player.currentTurnScore = 0;
        state.tableCards = [];

        state.historyLog.push({
          id: `log_${Date.now()}`,
          timestamp: Date.now(),
          type: 'bust',
          playerId,
          playerName: player.name,
          message: `🔥 BUST trùng hệ [${drawnCard.domainNameVi}]! Nhưng [HỒI SINH BẢO MỆNH - DUY NHẤT 1 LẦN/TRẬN] đã cứu mạng: Tự động bảo toàn 50% điểm (+${preserved}đ) vào kho an toàn! (Đã tiêu hao hết trận)`,
        });

        this.switchTurn(state);
        this.checkAiTurn(gameId);
        return { success: true, isBust: true, state };
      }

      // Standard BUST
      player.stats.bustCount += 1;
      const lostScore = player.currentTurnScore;
      player.currentTurnScore = 0;
      state.tableCards = [];

      state.historyLog.push({
        id: `log_${Date.now()}`,
        timestamp: Date.now(),
        type: 'bust',
        playerId,
        playerName: player.name,
        message: `💥 BUST (NỔ LƯỢT)! Rút trùng hệ [${drawnCard.domainNameVi}] với lá đã có trên bàn! Mất ${lostScore}đ tạm thời. Chuyển lượt!`,
      });

      this.switchTurn(state);
      this.checkAiTurn(gameId);
      return { success: true, isBust: true, state };
    }

    // Not bust: generate matching friendly math question
    const fullQuestion = getQuestionForCategory(drawnCard.domainId, state.mathLevel);
    session.currentFullQuestion = fullQuestion;
    session.pendingCard = drawnCard;

    // Time calculations: default generous 50s!
    let qTimeLimit = Math.max(fullQuestion.timeLimit || 50, 50);

    // If player has Rune Thời Gian or Đóng Băng: permanently +20s!
    if (hasActiveRune(player, 'rune_freeze') || hasActiveRune(player, 'rune_time_plus')) {
      qTimeLimit = 65;
    }

    // Check if opponent has Rune Tăng Tốc (Haste): reduce this player's time
    const opponent = Object.values(state.players).find(p => p.id !== playerId);
    if (opponent && hasActiveRune(opponent, 'rune_haste')) {
      qTimeLimit = Math.max(35, qTimeLimit - 8);
    }

    const clientQuestion: ClientQuestion = {
      id: fullQuestion.id,
      question: fullQuestion.question,
      formula: fullQuestion.formula,
      options: fullQuestion.options,
      timeLimit: qTimeLimit,
      difficulty: fullQuestion.difficulty,
      category: fullQuestion.category,
      level: fullQuestion.level,
    };

    state.currentCard = drawnCard;
    state.currentQuestion = clientQuestion;
    state.questionStartTime = Date.now();
    state.questionTimeLimit = qTimeLimit;

    state.historyLog.push({
      id: `log_${Date.now()}`,
      timestamp: Date.now(),
      type: 'draw',
      playerId,
      playerName: player.name,
      message: `${player.name} rút được lá [${drawnCard.domainNameVi}] (+${drawnCard.pointValue}đ) - Kỹ năng: ${drawnCard.skillName}!`,
    });

    return { success: true, state };
  }

  // ANSWER ACTION
  public answerQuestion(gameId: string, playerId: string, answer: string): { success: boolean; correct: boolean; earnedPoints: number; state: GameState; explanation?: string } {
    const session = this.games.get(gameId);
    if (!session || !session.currentFullQuestion || !session.pendingCard) {
      return { success: false, correct: false, earnedPoints: 0, state: {} as any };
    }
    const { state, currentFullQuestion, pendingCard } = session;
    const player = state.players[playerId];

    if (state.currentPlayerId !== playerId) {
      return { success: false, correct: false, earnedPoints: 0, state };
    }

    // Verify answer
    const cleanUser = answer.trim().toLowerCase();
    const cleanTarget = currentFullQuestion.answer.trim().toLowerCase();
    const isCorrect = cleanUser === cleanTarget || (parseFloat(cleanUser) === parseFloat(cleanTarget));

    if (isCorrect) {
      // Calculate points
      let points = pendingCard.pointValue;

      // 1. Double Points Rune (1 lần/lượt)
      if (state.doublePointsActive || canTriggerRune(player, 'rune_double')) {
        points = Math.round(points * 1.5);
        state.doublePointsActive = false;
        triggerRune(player, 'rune_double');
      }

      // 2. Frenzy Rune (+25% bonus points - nội tại liên tục)
      if (canTriggerRune(player, 'rune_frenzy')) {
        points = Math.round(points * 1.25);
      }

      // 3. Time speed bonus for rune_time_plus
      const elapsedSec = (Date.now() - (state.questionStartTime || Date.now())) / 1000;
      if (canTriggerRune(player, 'rune_time_plus') && elapsedSec <= 12) {
        points += 3;
      }

      player.stats.correctCount += 1;
      player.stats.currentCombo += 1;
      if (player.stats.currentCombo > player.stats.comboMax) {
        player.stats.comboMax = player.stats.currentCombo;
      }

      const cat = pendingCard.domainId;
      if (!player.stats.categoryAccuracy[cat]) {
        player.stats.categoryAccuracy[cat] = { correct: 0, total: 0 };
      }
      player.stats.categoryAccuracy[cat].correct += 1;
      player.stats.categoryAccuracy[cat].total += 1;

      // Add to table
      state.tableCards.push(pendingCard);
      player.currentTurnScore += points;

      // Check Rune Thu Hoạch (Harvest - 1 LẦN/LƯỢT): >= 3 cards on table gives +15 bonus points
      if (canTriggerRune(player, 'rune_harvest') && state.tableCards.length >= 3) {
        triggerRune(player, 'rune_harvest');
        player.currentTurnScore += 15;
        state.historyLog.push({
          id: `log_${Date.now()}`,
          timestamp: Date.now(),
          type: 'rune_used',
          playerId,
          playerName: player.name,
          message: `🌾 [BỘI THU (1 LẦN/LƯỢT)] gom được chuỗi 3 lá bài trên bàn, nhận thêm +15 điểm thưởng!`,
        });
      }

      // Check Rune Bảo Hiểm (Insurance - 1 LẦN/LƯỢT): Lock highest card on table if >= 2 cards
      if (canTriggerRune(player, 'rune_insurance') && state.tableCards.length >= 2) {
        triggerRune(player, 'rune_insurance');
        const sorted = [...state.tableCards].sort((a, b) => b.pointValue - a.pointValue);
        const topCard = sorted[0];
        player.safeScore += topCard.pointValue;
        player.currentTurnScore = Math.max(0, player.currentTurnScore - topCard.pointValue);
        state.tableCards = state.tableCards.filter(c => c.id !== topCard.id);

        state.historyLog.push({
          id: `log_${Date.now()}`,
          timestamp: Date.now(),
          type: 'rune_used',
          playerId,
          playerName: player.name,
          message: `🔒 [BẢO HIỂM KHO (1 LẦN/LƯỢT)] đã tự động bảo hiểm lá bài cao nhất [${topCard.domainNameVi}] (+${topCard.pointValue}đ) thẳng vào kho an toàn!`,
        });
      }

      // Check Rune Đạo Tặc (Siphon - 1 LẦN/LƯỢT): Steal 3 safe points from opponent
      if (canTriggerRune(player, 'rune_siphon')) {
        const opp = Object.values(state.players).find(p => p.id !== playerId);
        if (opp && opp.safeScore > 0) {
          triggerRune(player, 'rune_siphon');
          const stolen = Math.min(opp.safeScore, 3);
          opp.safeScore -= stolen;
          player.safeScore += stolen;
          state.historyLog.push({
            id: `log_${Date.now()}`,
            timestamp: Date.now(),
            type: 'rune_used',
            playerId,
            playerName: player.name,
            message: `🦹 [MA HÚT (1 LẦN/LƯỢT)] hút +${stolen} điểm từ đối thủ sang kho an toàn của bạn!`,
          });
        }
      }

      state.lastAnswerResult = {
        correct: true,
        earnedPoints: points,
      };

      state.historyLog.push({
        id: `log_${Date.now()}`,
        timestamp: Date.now(),
        type: 'answer_correct',
        playerId,
        playerName: player.name,
        message: `✓ CHÍNH XÁC! ${player.name} giải đúng câu hỏi, nhận +${points} điểm!`,
      });

      // Clear question & pending card
      state.currentQuestion = undefined;
      state.currentCard = undefined;
      session.currentFullQuestion = undefined;
      session.pendingCard = undefined;

      // Auto-check if win can be achieved immediately
      if (player.safeScore + player.currentTurnScore >= state.targetScore) {
        state.historyLog.push({
          id: `log_${Date.now()}`,
          timestamp: Date.now(),
          type: 'turn_switch',
          playerId,
          playerName: player.name,
          message: `⭐ ${player.name} đã đủ điểm chiến thắng! Bấm BANK để hoàn tất!`,
        });
      }

      return { success: true, correct: true, earnedPoints: points, state };
    } else {
      // Check for Rune Sửa Sai (Retry - 1 LẦN/LƯỢT)
      if (canTriggerRune(player, 'rune_retry')) {
        triggerRune(player, 'rune_retry');
        state.questionTimeLimit = (state.questionTimeLimit || 45) + 15;
        state.historyLog.push({
          id: `log_${Date.now()}`,
          timestamp: Date.now(),
          type: 'rune_used',
          playerId,
          playerName: player.name,
          message: `✨ [SỬA SAI (1 LẦN/LƯỢT)] thấu triệt! ${player.name} được làm lại ngay lập tức với thêm 15 giây hồi phục! (Lượt này không thể dùng thêm)`,
        });
        return { success: true, correct: false, earnedPoints: 0, state };
      }

      // Wrong answer: discard pending card, preserve turn score, switch turn
      player.stats.wrongCount += 1;
      player.stats.currentCombo = 0;

      const cat = pendingCard.domainId;
      if (!player.stats.categoryAccuracy[cat]) {
        player.stats.categoryAccuracy[cat] = { correct: 0, total: 0 };
      }
      player.stats.categoryAccuracy[cat].total += 1;

      state.lastAnswerResult = {
        correct: false,
        earnedPoints: 0,
        revealedAnswer: currentFullQuestion.answer,
        explanation: currentFullQuestion.explanation,
      };

      state.historyLog.push({
        id: `log_${Date.now()}`,
        timestamp: Date.now(),
        type: 'answer_wrong',
        playerId,
        playerName: player.name,
        message: `✗ Chưa chính xác! Đáp án là: ${currentFullQuestion.answer}. Lá bài bị hủy, chuyển lượt!`,
      });

      state.currentQuestion = undefined;
      state.currentCard = undefined;
      session.currentFullQuestion = undefined;
      session.pendingCard = undefined;

      this.switchTurn(state);
      this.checkAiTurn(gameId);

      return {
        success: true,
        correct: false,
        earnedPoints: 0,
        state,
        explanation: currentFullQuestion.explanation,
      };
    }
  }

  // BANK ACTION
  public bank(gameId: string, playerId: string): { success: boolean; state: GameState } {
    const session = this.games.get(gameId);
    if (!session) return { success: false, state: {} as any };
    const { state } = session;
    const player = state.players[playerId];

    if (state.currentPlayerId !== playerId) return { success: false, state };
    if (state.currentQuestion) return { success: false, state };

    let bankScore = player.currentTurnScore;

    // Check Rune Tích Lũy (Bank bonus - 1 LẦN/LƯỢT): +15 extra points on bank
    if (canTriggerRune(player, 'rune_bank_bonus')) {
      triggerRune(player, 'rune_bank_bonus');
      bankScore += 15;
      state.historyLog.push({
        id: `log_${Date.now()}`,
        timestamp: Date.now(),
        type: 'rune_used',
        playerId,
        playerName: player.name,
        message: `💰 [KHO BÁU (1 LẦN/LƯỢT)] kích hoạt khi Bank: Thưởng thêm +15 điểm trực tiếp vào kho an toàn!`,
      });
    }

    player.safeScore += bankScore;
    player.currentTurnScore = 0;
    state.tableCards = [];

    state.historyLog.push({
      id: `log_${Date.now()}`,
      timestamp: Date.now(),
      type: 'bank',
      playerId,
      playerName: player.name,
      message: `🏦 BANK THÀNH CÔNG! ${player.name} cất giữ +${bankScore} điểm (Tổng an toàn: ${player.safeScore}đ).`,
    });

    // Check Victory
    if (player.safeScore >= state.targetScore) {
      // Check if opponent has Rune Bất Tử (Immortal - DUY NHẤT 1 LẦN/TRẬN!)
      const opp = Object.values(state.players).find(p => p.id !== playerId);
      if (opp && canTriggerRune(opp, 'rune_immortal')) {
        triggerRune(opp, 'rune_immortal');
        player.safeScore = Math.max(120, state.targetScore - 30);
        state.historyLog.push({
          id: `log_${Date.now()}`,
          timestamp: Date.now(),
          type: 'rune_used',
          playerId: opp.id,
          playerName: opp.name,
          message: `👑 [BẤT TỬ CẢNH GIỚI - DUY NHẤT 1 LẦN/TRẬN] của ${opp.name} phát huy uy lực! Chặn đứng chiến thắng của đối thủ, giảm 30 điểm và mở ra vòng đấu lội ngược dòng! (Đã tiêu hao hết trận)`,
        });
        this.switchTurn(state);
        this.checkAiTurn(gameId);
        return { success: true, state };
      }

      state.status = 'game_over';
      state.winnerId = playerId;
      state.historyLog.push({
        id: `log_${Date.now()}`,
        timestamp: Date.now(),
        type: 'game_over',
        playerId,
        playerName: player.name,
        message: `👑 CHIẾN THẮNG! ${player.name} đã chạm mốc ${state.targetScore} điểm và trở thành Nhà Vô Địch!`,
      });

      this.recordGameOver(state);
      return { success: true, state };
    }

    this.switchTurn(state);
    this.checkAiTurn(gameId);
    return { success: true, state };
  }

  // SURRENDER / FORFEIT ACTION
  public surrender(gameId: string, playerId: string): { success: boolean; state: GameState } {
    const session = this.games.get(gameId);
    if (!session) return { success: false, state: {} as any };
    const { state } = session;
    const player = state.players[playerId];
    if (!player || state.status === 'game_over') {
      return { success: false, state };
    }

    if (session.aiTimer) {
      clearTimeout(session.aiTimer);
      session.aiTimer = undefined;
    }

    // Find opponent to award victory
    const opponent = Object.values(state.players).find(p => p.id !== playerId);
    state.status = 'game_over';
    state.winnerId = opponent ? opponent.id : undefined;
    state.aiThinkingStatus = null;

    state.historyLog.push({
      id: `log_${Date.now()}`,
      timestamp: Date.now(),
      type: 'surrender',
      playerId,
      playerName: player.name,
      message: `🏳️ ${player.name} đã giương cờ trắng ĐẦU HÀNG! ${opponent ? `${opponent.name} giành chiến thắng vinh quang!` : 'Trận đấu kết thúc.'}`,
    });

    this.recordGameOver(state);
    return { success: true, state };
  }

  // USE RUNE ACTION (for active powers like Swap Question or Purify)
  public useRune(gameId: string, playerId: string, runeId: string): { success: boolean; message: string; state: GameState } {
    const session = this.games.get(gameId);
    if (!session) return { success: false, message: 'Game không tồn tại', state: {} as any };
    const { state } = session;
    const player = state.players[playerId];

    if (state.currentPlayerId !== playerId) {
      return { success: false, message: 'Chưa tới lượt của bạn!', state };
    }

    const runeDef = ALL_RUNES.find(r => r.id === runeId);
    const rName = runeDef?.name || runeId;

    if (!canTriggerRune(player, runeId)) {
      if (runeDef?.limitType === 'once_per_match') {
        return { success: false, message: `${rName} là ấn chú tối thượng chỉ được dùng DUY NHẤT 1 LẦN trong cả trận đấu (đã tiêu hao)!`, state };
      }
      return { success: false, message: `${rName} chỉ được kích hoạt 1 LẦN MỖI LƯỢT (đã sử dụng trong lượt này)!`, state };
    }

    switch (runeId) {
      case 'rune_swap_question':
        if (state.currentQuestion && session.pendingCard) {
          triggerRune(player, runeId);
          const newQ = getQuestionForCategory(session.pendingCard.domainId, state.mathLevel);
          session.currentFullQuestion = newQ;
          state.currentQuestion = {
            id: newQ.id,
            question: newQ.question,
            formula: newQ.formula,
            options: newQ.options,
            timeLimit: Math.max(newQ.timeLimit || 50, 50),
            difficulty: newQ.difficulty,
            category: newQ.category,
            level: newQ.level,
          };
          state.questionStartTime = Date.now();
          state.questionTimeLimit = 55;
          state.historyLog.push({
            id: `log_${Date.now()}`,
            timestamp: Date.now(),
            type: 'rune_used',
            playerId,
            playerName: player.name,
            message: `🔄 [HOÁN ĐỔI (1 LẦN/LƯỢT)] đã đổi câu hỏi sang câu mới và làm mới thời gian!`,
          });
          return { success: true, message: 'Đã đổi câu hỏi thành công!', state };
        }
        return { success: false, message: 'Chỉ có thể đổi câu hỏi khi đang giải toán!', state };

      case 'rune_purify':
        if (state.tableCards.length > 0) {
          triggerRune(player, runeId);
          const removed = state.tableCards.pop()!;
          state.historyLog.push({
            id: `log_${Date.now()}`,
            timestamp: Date.now(),
            type: 'rune_used',
            playerId,
            playerName: player.name,
            message: `🪶 [THANH LỌC (1 LẦN/LƯỢT)] đã loại bỏ lá [${removed.domainNameVi}] khỏi bàn đấu để tránh trùng hệ!`,
          });
          return { success: true, message: `Đã thanh lọc lá ${removed.domainNameVi}!`, state };
        }
        return { success: false, message: 'Không có lá bài nào trên bàn để thanh lọc!', state };

      case 'rune_shield':
        triggerRune(player, runeId);
        state.activeShield = true;
        state.historyLog.push({
          id: `log_${Date.now()}`,
          timestamp: Date.now(),
          type: 'rune_used',
          playerId,
          playerName: player.name,
          message: `🛡️ ${player.name} kích hoạt Khiên Chắn (1 lần/lượt) bảo mệnh cho lần rút tiếp theo!`,
        });
        return { success: true, message: 'Khiên chắn sẵn sàng!', state };

      case 'rune_double':
        triggerRune(player, runeId);
        state.doublePointsActive = true;
        state.historyLog.push({
          id: `log_${Date.now()}`,
          timestamp: Date.now(),
          type: 'rune_used',
          playerId,
          playerName: player.name,
          message: `✨ ${player.name} kích hoạt hiệu ứng nhân đôi điểm số (1 lần/lượt)!`,
        });
        return { success: true, message: 'Hiệu ứng nhân điểm kích hoạt!', state };

      default:
        return { success: true, message: `${rName} là ấn chú nội tại kích hoạt tự động theo điều kiện thi đấu!`, state };
    }
  }

  private switchTurn(state: GameState) {
    const playerIds = Object.keys(state.players);
    const nextIdx = (playerIds.indexOf(state.currentPlayerId) + 1) % playerIds.length;
    state.currentPlayerId = playerIds[nextIdx];
    state.turn += 1;
    if (nextIdx === 0) {
      state.round += 1;
    }
    state.activeShield = false;
    state.doublePointsActive = false;
    state.aiThinkingStatus = null;

    // Reset per-turn rune limits for the player entering their new turn
    Object.values(state.players).forEach(p => {
      p.runeUsedThisTurn = false;
      p.runes.forEach(slot => {
        slot.usedThisTurn = false;
        const def = ALL_RUNES.find(r => r.id === slot.runeId);
        if (def?.limitType === 'once_per_match') {
          if (!slot.usedInMatch) {
            slot.usesLeft = 1;
            slot.active = true;
          } else {
            slot.usesLeft = 0;
            slot.active = false;
          }
        } else if (def?.limitType === 'once_per_turn') {
          slot.usesLeft = 1;
          slot.active = true;
        } else {
          slot.usesLeft = 999;
          slot.active = true;
        }
      });
    });

    const session = this.games.get(state.gameId);
    if (session) {
      this.updateNextCardPreview(state, session);
    }

    const nextPlayer = state.players[state.currentPlayerId];
    state.historyLog.push({
      id: `log_${Date.now()}`,
      timestamp: Date.now(),
      type: 'turn_switch',
      playerId: nextPlayer.id,
      playerName: nextPlayer.name,
      message: `Tới lượt của ${nextPlayer.name}! (Hiệu ứng Rune của lượt mới đã sẵn sàng)`,
    });
  }

  // Realistic AI player decision-making with extended thinking time
  private checkAiTurn(gameId: string) {
    const session = this.games.get(gameId);
    if (!session) return;
    const { state } = session;

    if (state.status !== 'playing') return;
    const curPlayer = state.players[state.currentPlayerId];
    if (!curPlayer?.isAi) {
      state.aiThinkingStatus = null;
      return;
    }

    if (session.aiTimer) clearTimeout(session.aiTimer);

    const diff = state.aiDifficulty || 'medium';
    const isSolvingQuestion = !!state.currentQuestion;
    state.aiThinkingStatus = isSolvingQuestion ? 'solving' : 'thinking';

    this.notifyState(gameId, isSolvingQuestion ? 'ai_solving' : 'ai_thinking');

    let thinkDelay = 5500;
    if (isSolvingQuestion) {
      if (diff === 'easy') thinkDelay = 5000 + Math.random() * 2000;
      else if (diff === 'medium') thinkDelay = 6500 + Math.random() * 2500;
      else thinkDelay = 7500 + Math.random() * 2500;
    } else {
      if (diff === 'easy') thinkDelay = 3800 + Math.random() * 1500;
      else if (diff === 'medium') thinkDelay = 4500 + Math.random() * 2000;
      else thinkDelay = 5500 + Math.random() * 2000;
    }

    session.aiTimer = setTimeout(() => {
      this.executeAiTurn(gameId);
    }, thinkDelay);
  }

  private executeAiTurn(gameId: string) {
    const session = this.games.get(gameId);
    if (!session) return;
    const { state } = session;
    const ai = state.players[state.currentPlayerId];
    if (!ai || !ai.isAi || state.status !== 'playing') return;

    // 1. If currently facing a question, AI answers it
    if (state.currentQuestion && session.currentFullQuestion) {
      const diff = state.aiDifficulty || 'medium';
      let accuracyRate = 0.65;
      if (diff === 'easy') accuracyRate = 0.50; // friendly and approachable
      if (diff === 'hard') accuracyRate = 0.80;

      const answersCorrectly = Math.random() < accuracyRate;
      let finalAnswer = session.currentFullQuestion.answer;
      if (!answersCorrectly) {
        if (session.currentFullQuestion.options) {
          const wrongOpts = session.currentFullQuestion.options.filter(o => o !== finalAnswer);
          finalAnswer = wrongOpts[Math.floor(Math.random() * wrongOpts.length)] || '0';
        } else {
          finalAnswer = (parseInt(finalAnswer, 10) + 1).toString();
        }
      }

      state.aiThinkingStatus = null;
      const res = this.answerQuestion(gameId, ai.id, finalAnswer);
      this.notifyState(gameId, res.correct ? 'answer_correct' : 'answer_wrong', {
        explanation: res.explanation,
      });

      setTimeout(() => this.checkAiTurn(gameId), 4000);
      return;
    }

    // 2. If already reached winning score, BANK immediately
    if (ai.safeScore + ai.currentTurnScore >= state.targetScore) {
      state.aiThinkingStatus = null;
      this.bank(gameId, ai.id);
      this.notifyState(gameId, 'bank');
      return;
    }

    // 3. AI decides: DRAW or BANK?
    const tableCount = state.tableCards.length;
    const currentScore = ai.currentTurnScore;
    const diff = state.aiDifficulty || 'medium';

    let shouldBank = false;
    if (diff === 'easy') {
      shouldBank = tableCount >= 2 || currentScore >= 16;
    } else if (diff === 'medium') {
      shouldBank = tableCount >= 3 || currentScore >= 26;
    } else {
      shouldBank = tableCount >= 4 || currentScore >= 38;
    }

    if (shouldBank && currentScore > 0) {
      state.aiThinkingStatus = null;
      this.bank(gameId, ai.id);
      this.notifyState(gameId, 'bank');
    } else {
      state.aiThinkingStatus = null;
      const res = this.drawCard(gameId, ai.id);
      this.notifyState(gameId, res.isBust ? 'bust' : 'card_drawn');
      if (!res.isBust) {
        setTimeout(() => this.checkAiTurn(gameId), 3500);
      }
    }
  }

  private recordGameOver(state: GameState) {
    Object.values(state.players).forEach(p => {
      if (p.isAi) return;
      const isWin = p.id === state.winnerId;
      const totalQ = p.stats.correctCount + p.stats.wrongCount;
      const acc = totalQ > 0 ? Math.round((p.stats.correctCount / totalQ) * 100) : 0;
      const opp = Object.values(state.players).find(o => o.id !== p.id);

      db.recordMatch({
        id: `match_${Date.now()}_${p.id.substr(0, 5)}`,
        userId: p.id,
        opponentName: opp?.name || 'Đối thủ',
        isWin,
        score: p.safeScore,
        accuracy: acc,
        correctAnswers: p.stats.correctCount,
        totalQuestions: totalQ,
        busts: p.stats.bustCount,
        maxCombo: p.stats.comboMax,
        mode: state.mode,
        timestamp: Date.now(),
      });
    });
  }
}

export const gameEngine = new GameEngine();
