import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  GameState,
  Card,
  PlayerState,
  MathCategory,
} from '../../shared/types.ts';
import { ALL_RUNES } from '../../shared/runes.ts';
import { MATH_DOMAINS } from '../../shared/cards.ts';
import { HowToPlayModal } from './HowToPlayModal.tsx';
import {
  Shield,
  Coins,
  Layers,
  Clock,
  Sparkles,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Trophy,
  ArrowRight,
  Flame,
  Award,
  Zap,
  HelpCircle,
  BookOpen,
  X,
  Info,
  Flag,
} from 'lucide-react';

interface GameArenaProps {
  gameState: GameState;
  currentUserId: string;
  onDraw: () => void;
  onSubmitAnswer: (answer: string) => void;
  onBank: () => void;
  onUseRune: (runeId: string) => void;
  onChooseDraftRune: (runeId: string) => void;
  onSurrender: () => void;
  onExit: () => void;
  lastBustAlert: boolean;
  errorMessage: string | null;
}

export const GameArena: React.FC<GameArenaProps> = ({
  gameState,
  currentUserId,
  onDraw,
  onSubmitAnswer,
  onBank,
  onUseRune,
  onChooseDraftRune,
  onSurrender,
  onExit,
  lastBustAlert,
  errorMessage,
}) => {
  const [answerInput, setAnswerInput] = useState('');
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);
  const [showSurrenderModal, setShowSurrenderModal] = useState<boolean>(false);
  const [inspectedTableCard, setInspectedTableCard] = useState<Card | null>(null);

  // Identify who is YOU and who is OPPONENT
  const you: PlayerState | undefined = gameState.players[currentUserId] || Object.values(gameState.players)[0];
  const opponent: PlayerState | undefined = Object.values(gameState.players).find(p => p.id !== you?.id);

  const isMyTurn = gameState.currentPlayerId === you?.id;
  const isGameOver = gameState.status === 'game_over';
  const isWinner = gameState.winnerId === you?.id;

  // Calculate unique domains on table to show live BUST risk
  const tableDomains = new Set(gameState.tableCards.map(c => c.domainId));
  const bustRiskPercent = Math.min(100, Math.round((tableDomains.size / 10) * 100));

  // Countdown timer effect: pure client countdown per question ID (immune to clock drift)
  useEffect(() => {
    if (!gameState.currentQuestion) {
      setTimeLeft(45);
      return;
    }

    // Give abundant 45s for solving math
    const limit = Math.max(gameState.currentQuestion.timeLimit || gameState.questionTimeLimit || 45, 45);
    setTimeLeft(limit);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (isMyTurn) {
            onSubmitAnswer('TIMEOUT_NO_ANSWER');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.currentQuestion?.id, isMyTurn]);

  // Confetti on win
  useEffect(() => {
    if (isGameOver && isWinner) {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (e) {
        console.warn('Confetti error:', e);
      }
    }
  }, [isGameOver, isWinner]);

  const handleAnswerSubmit = (ans: string) => {
    if (!ans) return;
    onSubmitAnswer(ans);
    setAnswerInput('');
  };

  return (
    <div className={`relative min-h-[calc(100vh-65px)] flex flex-col justify-between px-3 sm:px-6 py-3 max-w-5xl mx-auto select-none ${lastBustAlert ? 'animate-shake' : ''}`}>
      {/* ⚠️ BUST FULLSCREEN IMPACT OVERLAY */}
      {lastBustAlert && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-rose-950/60 backdrop-blur-sm animate-in zoom-in-95 duration-200">
          <div className="text-center p-6 sm:p-8 rounded-3xl bg-slate-900 border-4 border-rose-500 shadow-2xl shadow-rose-950 max-w-md mx-4 transform scale-105">
            <div className="text-6xl animate-bounce mb-2">💥</div>
            <h2 className="font-cinzel text-4xl sm:text-5xl font-black text-rose-400 tracking-wider">
              BUST!
            </h2>
            <p className="text-base font-bold text-amber-300 mt-2">
              NỔ LƯỢT DO RÚT TRÙNG HỆ TOÁN!
            </p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Bạn đã rút trúng một lá bài có <strong>cùng Hệ Toán</strong> với lá bài đã nằm trên bàn trong lượt này. Điểm tạm thời của lượt này trở về 0 và chuyển lượt sang đối thủ!
            </p>
            <div className="mt-3 p-2 bg-amber-950/50 border border-amber-500/40 rounded-xl text-xs text-amber-200 font-semibold">
              💡 Mẹo sống còn: Sau khi giải được 2-3 lá, hãy nhớ bấm [BANK] để cất điểm vào Kho An Toàn!
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 🌟 RUNE DRAFTING MODAL: DEALT 2 RUNES, PICK 1 FOR MATCH    */}
      {/* ========================================================= */}
      {gameState.status === 'drafting' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-250">
          <div className="w-full max-w-2xl my-auto p-5 sm:p-7 bg-slate-900 border-2 border-amber-500/80 rounded-3xl shadow-2xl space-y-6 text-center">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>GIAI ĐOẠN KHỞI NGUYÊN • ĐẤU TRƯỜNG TOÁN HỌC</span>
              </div>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 drop-shadow">
                CHỌN 1 TRONG 2 LÁ BÀI RUNE
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                Bạn và đối thủ được chia 2 lá bài Rune ngẫu nhiên khác nhau. Hãy chọn <strong>1 lá bài duy nhất</strong> — lá bài này sẽ có <strong className="text-amber-300">tác dụng xuyên suốt toàn bộ trận đấu</strong>!
              </p>
            </div>

            {!you?.chosenRuneId ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                {(you?.draftRunes || []).map((rId) => {
                  const rDef = ALL_RUNES.find(r => r.id === rId);
                  if (!rDef) return null;
                  return (
                    <div
                      key={rId}
                      style={{ borderColor: rDef.color, boxShadow: `0 0 16px ${rDef.color}33` }}
                      className="p-4 bg-slate-950/90 border-2 rounded-2xl flex flex-col justify-between space-y-4 hover:border-amber-400 transition-all group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl p-2 rounded-xl bg-slate-900 border border-slate-800">{rDef.icon}</span>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-cinzel text-base font-bold text-amber-200 group-hover:text-amber-100">
                                {rDef.name}
                              </h4>
                              {rDef.limitType === 'once_per_match' && (
                                <span className="px-2 py-0.5 text-[9px] font-black rounded-md bg-rose-950/80 text-rose-300 border border-rose-500/50 uppercase tracking-wider animate-pulse">
                                  1 Lần / Trận
                                </span>
                              )}
                              {rDef.limitType === 'once_per_turn' && (
                                <span className="px-2 py-0.5 text-[9px] font-black rounded-md bg-amber-950/80 text-amber-300 border border-amber-500/50 uppercase tracking-wider">
                                  1 Lần / Lượt
                                </span>
                              )}
                              {rDef.limitType === 'continuous' && (
                                <span className="px-2 py-0.5 text-[9px] font-black rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 uppercase tracking-wider">
                                  Liên Tục
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider">
                              Ấn Chú Nội Tại Trận Đấu
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed font-light">
                          {rDef.description}
                        </p>

                        <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-[11px] text-amber-200 font-medium">
                          <div className="font-bold text-amber-400 flex items-center justify-between mb-0.5">
                            <div className="flex items-center gap-1">
                              <Zap className="w-3.5 h-3.5" />
                              <span>Hiệu năng kích hoạt:</span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-300">
                              {rDef.limitType === 'once_per_match'
                                ? '⚠️ Duy nhất 1 lần cả trận'
                                : rDef.limitType === 'once_per_turn'
                                ? '🔄 Tự làm mới mỗi lượt'
                                : '⚡ Kích hoạt vĩnh viễn'}
                            </span>
                          </div>
                          <span>{rDef.persistentEffectDesc || rDef.description}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => onChooseDraftRune(rId)}
                        className="w-full py-2.5 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all active:scale-95 uppercase tracking-wider flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>CHỌN LÁ RUNE NÀY</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 bg-slate-950/90 border border-amber-500/50 rounded-2xl space-y-3">
                <div className="text-4xl animate-bounce">✨</div>
                <h3 className="font-cinzel text-lg font-bold text-amber-300">
                  BẠN ĐÃ CHỌN XONG ẤN CHÚ NỘI TẠI!
                </h3>
                <p className="text-xs text-slate-300">
                  {ALL_RUNES.find(r => r.id === you.chosenRuneId)?.name}: {ALL_RUNES.find(r => r.id === you.chosenRuneId)?.persistentEffectDesc}
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-slate-400 animate-pulse">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Đang chờ đối thủ chọn xong... Trận đấu sẽ tự động bắt đầu!</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOP BAR: Room Code, Round, Target Score, Rules and Exit */}
      <div className="flex items-center justify-between gap-2 px-3 py-1.5 bg-slate-900/80 border border-slate-800 rounded-xl text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">PHÒNG:</span>
          <span className="font-bold text-amber-300 tracking-wider">{gameState.roomCode}</span>
          <span className="hidden sm:inline text-slate-500">• Cấp: {gameState.mathLevel}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-slate-300">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Bộ Bài: <strong className="text-slate-100">{gameState.deckRemaining}</strong></span>
          </div>

          <div className="flex items-center gap-1 text-amber-300 bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded-md">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Mục Tiêu: <strong>{gameState.targetScore}đ</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRulesModal(true)}
            className="flex items-center gap-1 px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-bold transition-all shadow-sm"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Luật Chơi</span>
          </button>
          {!isGameOver && (
            <button
              onClick={() => setShowSurrenderModal(true)}
              className="flex items-center gap-1 px-2.5 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-lg text-xs font-bold transition-all shadow-sm"
              title="Đầu hàng và chấp nhận thất bại"
            >
              <Flag className="w-3.5 h-3.5 text-rose-400" />
              <span>Đầu Hàng</span>
            </button>
          )}
          <button
            onClick={onExit}
            className="text-[11px] text-slate-400 hover:text-rose-400 underline transition-colors ml-1"
          >
            Rời Trận
          </button>
        </div>
      </div>

      {/* ERROR MESSAGE ALERT */}
      {errorMessage && (
        <div className="my-2 p-2.5 bg-rose-950/80 border border-rose-700 text-rose-200 text-xs rounded-xl text-center flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ========================================================= */}
      {/* 1. OPPONENT SECTION */}
      {/* ========================================================= */}
      <div className={`mt-2 p-3 rounded-2xl border transition-all ${
        !isMyTurn ? 'bg-indigo-950/40 border-indigo-500/60 shadow-lg shadow-indigo-950/40' : 'bg-slate-900/60 border-slate-800/80'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl p-1 bg-slate-950 rounded-xl border border-slate-800">
              {opponent?.avatar || '👤'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-200">{opponent?.name || 'Đang chờ...'}</span>
                {!isMyTurn && (
                  <span className={`px-2.5 py-0.5 text-slate-950 font-black text-[10px] rounded-full uppercase flex items-center gap-1 shadow ${
                    gameState.aiThinkingStatus ? 'bg-amber-400 animate-pulse ring-2 ring-amber-300/60' : 'bg-amber-500'
                  }`}>
                    {gameState.aiThinkingStatus === 'solving'
                      ? '⚡ Đang Giải Toán...'
                      : gameState.aiThinkingStatus === 'thinking'
                      ? '💭 Đang Suy Tính...'
                      : 'Đang Lượt'}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-3 mt-0.5 font-mono">
                <span>❤️ HP: {opponent?.hp || 100}</span>
                <span className="text-amber-400">⭐ Kho An Toàn: {opponent?.safeScore || 0}đ</span>
              </div>
              {opponent?.chosenRuneId && (() => {
                const rDef = ALL_RUNES.find(r => r.id === opponent.chosenRuneId);
                const isOncePerMatch = rDef?.limitType === 'once_per_match';
                const isOncePerTurn = rDef?.limitType === 'once_per_turn';
                const oppUsed = isOncePerMatch ? opponent.runeUsedInMatch : isOncePerTurn ? opponent.runeUsedThisTurn : false;

                return (
                  <div className="text-[10px] text-indigo-300 flex items-center gap-1.5 mt-0.5 flex-wrap" title={rDef?.persistentEffectDesc || rDef?.description}>
                    <span>{rDef?.icon}</span>
                    <span className="font-bold">Nội tại: {rDef?.name}</span>
                    {isOncePerMatch && (
                      <span className={`px-1.5 py-0.2 text-[9px] font-mono rounded ${
                        oppUsed ? 'bg-slate-800 text-slate-500' : 'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}>
                        {oppUsed ? 'Đã dùng (Hết trận)' : '1 Lần/Trận'}
                      </span>
                    )}
                    {isOncePerTurn && (
                      <span className={`px-1.5 py-0.2 text-[9px] font-mono rounded ${
                        oppUsed ? 'bg-slate-800 text-slate-500' : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {oppUsed ? 'Đã dùng lượt này' : '1 Lần/Lượt'}
                      </span>
                    )}
                    <span className="text-slate-400 hidden sm:inline">— {rDef?.persistentEffectDesc}</span>
                  </div>
                );
              })()}
            </div>
          </div>

          <div className="text-right font-mono">
            <div className="text-[10px] text-slate-400">Điểm Lượt Này</div>
            <div className="text-lg font-black text-indigo-300">
              +{opponent?.currentTurnScore || 0}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. CENTER STAGE: CARDS ON TABLE & MATH QUESTION CHAMBER   */}
      {/* ========================================================= */}
      <div className="my-3 flex-1 flex flex-col items-center justify-center min-h-[260px] relative">
        {/* FORESIGHT PREVIEW BANNER (If Rune Tiên Tri is active) */}
        {gameState.nextCardPreview && (
          <div className="w-full mb-2 p-2 bg-purple-950/70 border border-purple-500/60 rounded-xl flex items-center justify-center gap-2 text-xs font-mono text-purple-200 shadow-md">
            <span>👁️ TIÊN TRI NỘI TẠI: Lá bài trên cùng của xấp bài là</span>
            <span className="font-bold px-2 py-0.5 rounded bg-slate-950 border border-purple-400 text-amber-300">
              [{gameState.nextCardPreview.domainNameVi}] (+{gameState.nextCardPreview.pointValue}đ)
            </span>
          </div>
        )}

        {/* CARDS DRAWN ON TABLE THIS TURN */}
        <div className="w-full mb-3">
          <div className="text-center text-[11px] font-mono text-slate-400 mb-1.5 flex items-center justify-center gap-2">
            <span>BÀI ĐANG CÓ TRÊN BÀN LƯỢT NÀY ({gameState.tableCards.length} LÁ)</span>
            {gameState.tableCards.length > 0 && (
              <span className="text-amber-400 font-bold">
                (Tổng: +{gameState.tableCards.reduce((sum, c) => sum + c.pointValue, 0)}đ)
              </span>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 flex-wrap min-h-[105px] p-2 bg-slate-950/60 border border-slate-800/80 rounded-2xl">
            {gameState.tableCards.length === 0 ? (
              <div className="text-xs text-slate-400 italic py-4 text-center">
                {isMyTurn
                  ? 'Chưa có lá bài nào trên bàn. Bấm [🃏 DRAW BÀI] để bắt đầu lượt rút!'
                  : `Đang trong lượt của ${opponent?.name || 'Đối thủ'}. Đang tính toán bước đi...`}
              </div>
            ) : (
              gameState.tableCards.map((c, idx) => (
                <button
                  type="button"
                  key={`${c.id}-${idx}`}
                  onClick={() => setInspectedTableCard(c)}
                  title={`Nhấp để xem tác dụng của lá ${c.domainNameVi}`}
                  style={{ borderColor: c.elementColor, boxShadow: `0 0 12px ${c.accentGlow}` }}
                  className="w-20 sm:w-24 p-2 bg-slate-900 rounded-xl border-2 flex flex-col items-center text-center transform transition-transform hover:scale-110 active:scale-95 animate-in zoom-in-75 duration-150 cursor-pointer group"
                >
                  <div className="text-[10px] font-black tracking-tight" style={{ color: c.elementColor }}>
                    {c.domainNameVi}
                  </div>
                  <div className="text-base sm:text-lg font-black text-amber-300 my-0.5">
                    +{c.pointValue}
                  </div>
                  <div className="text-[9px] text-slate-400 truncate w-full group-hover:text-amber-300">
                    {c.skillName}
                  </div>
                </button>
              ))
            )}
          </div>

          {/* REALTIME BUST RISK METER & TACTICAL ADVICE */}
          {gameState.tableCards.length > 0 && isMyTurn && !gameState.currentQuestion && (
            <div className="mt-2.5 p-2.5 px-3.5 bg-slate-950/95 border border-amber-500/40 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-2 text-xs shadow-lg animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  RỦI RO BÙM (BUST):
                </span>
                <span className={`font-mono font-black text-sm px-2 py-0.5 rounded-lg border ${
                  bustRiskPercent >= 40
                    ? 'bg-rose-950/70 border-rose-500 text-rose-300 animate-pulse'
                    : bustRiskPercent >= 20
                    ? 'bg-amber-950/70 border-amber-500 text-amber-300'
                    : 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                }`}>
                  ~{bustRiskPercent}%
                </span>
                <span className="text-[11px] text-slate-400">
                  ({tableDomains.size}/10 hệ toán đã có trên bàn)
                </span>
              </div>
              <div className="text-[11px] text-slate-300 text-center sm:text-right">
                {bustRiskPercent >= 40 ? (
                  <span className="text-amber-300 font-bold">
                    ⚠️ Nguy cơ trùng hệ cao! Cân nhắc bấm <strong>[BANK]</strong> để giữ an toàn +{you?.currentTurnScore || 0}đ!
                  </span>
                ) : (
                  <span>
                    💡 An toàn! Bạn có thể <strong>[RÚT BÀI]</strong> thêm hoặc <strong>[BANK]</strong> để cất điểm.
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* OPPONENT DELIBERATION BANNER (When it's opponent's turn and no active question) */}
        {!isMyTurn && !gameState.currentQuestion && (
          <div className="w-full max-w-lg mb-3 p-3 bg-slate-950/85 border border-indigo-600/50 rounded-2xl flex items-center justify-center gap-3 text-xs text-indigo-200 shadow-xl animate-pulse">
            <span className="text-lg">💭</span>
            <div className="flex flex-col text-center sm:text-left">
              <span className="font-bold text-amber-300">{opponent?.name || 'Đối thủ'} đang suy nghĩ nước đi...</span>
              <span className="text-[11px] text-slate-400">Đang cân nhắc: Rút thêm lá bài mới hay Dừng lại để BANK điểm an toàn</span>
            </div>
          </div>
        )}

        {/* MATH QUESTION CHAMBER (If a card was drawn and waiting for answer) */}
        {gameState.currentQuestion && (
          <div className="w-full max-w-xl p-4 sm:p-5 bg-gradient-to-b from-slate-900 to-indigo-950/90 border-2 border-amber-500/70 rounded-2xl shadow-2xl space-y-3 animate-in fade-in zoom-in-95 duration-200">
            {/* ACTIVE DRAWN CARD & TÁC DỤNG HEADER */}
            {gameState.currentCard && (
              <div
                style={{
                  borderColor: gameState.currentCard.elementColor,
                  boxShadow: `0 0 16px ${gameState.currentCard.accentGlow}`,
                }}
                className="p-3 bg-slate-950/95 border-2 rounded-xl flex items-center justify-between gap-3 animate-in fade-in"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl border shrink-0"
                    style={{
                      backgroundColor: `${gameState.currentCard.elementColor}22`,
                      borderColor: gameState.currentCard.elementColor,
                    }}
                  >
                    🎴
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-100">
                        Lá Rút: {gameState.currentCard.domainNameVi}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-500/30">
                        +{gameState.currentCard.pointValue} điểm
                      </span>
                    </div>
                    <div className="text-[11px] text-amber-200/95 font-medium mt-0.5 flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>
                        <strong>Tác dụng:</strong> {gameState.currentCard.skillName} — {gameState.currentCard.skillDesc}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Question Header: Category & Countdown Timer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🧮</span>
                <span className="text-xs font-bold text-amber-300 font-cinzel uppercase tracking-wider">
                  CÂU HỎI TOÁN HỌC: {MATH_DOMAINS[gameState.currentQuestion.category]?.nameVi || gameState.currentQuestion.category}
                </span>
              </div>

              {/* Live Timer */}
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${
                timeLeft <= 5 ? 'bg-rose-950 border-rose-600 text-rose-400 animate-bounce' : 'bg-slate-950 border-slate-700 text-amber-300'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{timeLeft}s</span>
              </div>
            </div>

            {/* Prompt & Formula */}
            <div className="py-2 text-center bg-slate-950/80 rounded-xl border border-slate-800 px-3">
              <div className="text-sm sm:text-base font-semibold text-slate-100">
                {gameState.currentQuestion.question}
              </div>
              {gameState.currentQuestion.formula && (
                <div className="mt-1 font-mono text-lg sm:text-xl font-black text-amber-400 tracking-wide">
                  {gameState.currentQuestion.formula}
                </div>
              )}
            </div>

            {/* If it's YOUR TURN: show interactive answering controls */}
            {isMyTurn ? (
              <div className="space-y-2.5">
                {/* 1. Quick Choice Buttons if available */}
                {gameState.currentQuestion.options && gameState.currentQuestion.options.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {gameState.currentQuestion.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswerSubmit(opt)}
                        className="py-2 px-3 bg-slate-900 hover:bg-amber-600 hover:text-slate-950 border border-slate-700 hover:border-amber-400 text-slate-100 font-mono font-bold text-sm sm:text-base rounded-xl shadow-md transition-all active:scale-95"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : null}

                {/* 2. Direct Input Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAnswerSubmit(answerInput);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    autoFocus
                    value={answerInput}
                    onChange={(e) => setAnswerInput(e.target.value)}
                    placeholder="Nhập đáp án số..."
                    className="flex-1 bg-slate-950 border-2 border-indigo-700 focus:border-amber-400 rounded-xl px-3.5 py-2 text-sm font-mono text-slate-100 text-center focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-95 uppercase tracking-wider"
                  >
                    Xác Nhận
                  </button>
                </form>
              </div>
            ) : (
              <div className="py-2.5 px-4 bg-slate-950/80 border border-indigo-700/50 rounded-xl flex items-center justify-center gap-2 text-xs font-mono text-indigo-300 animate-pulse">
                <span className="text-base">🧙‍♂️</span>
                <span>
                  {gameState.aiThinkingStatus === 'solving'
                    ? `Đại Pháp Sư AI đang tập trung tính toán giải đề... (${timeLeft}s)`
                    : `Đối thủ đang suy nghĩ nước đi... (${timeLeft}s)`}
                </span>
              </div>
            )}
          </div>
        )}

        {/* FEEDBACK EXPLANATION ACCORDION (If player answered wrong and has explanation) */}
        {gameState.lastAnswerResult && !gameState.lastAnswerResult.correct && gameState.lastAnswerResult.explanation && (
          <div className="w-full max-w-xl mt-2 p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-xs text-rose-200">
            <div className="font-bold flex items-center justify-between">
              <span>✗ Giải thích đáp án vừa sai (Đáp án đúng: {gameState.lastAnswerResult.revealedAnswer}):</span>
            </div>
            <div className="mt-1 text-slate-300 font-light">
              {gameState.lastAnswerResult.explanation}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 3. PLAYER'S CONTROLS & RUNE BAR                           */}
      {/* ========================================================= */}
      <div className="space-y-3">
        {/* RUNE BAR: 1 Equipped Rune */}
        <div className="p-2.5 bg-slate-950/85 border border-indigo-900/60 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-md">
          <div className="flex items-center gap-2">
            <div className="text-[11px] font-mono text-purple-300 flex items-center gap-1.5 pl-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span className="font-bold">RUNE BẢO MỆNH (1/1):</span>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {you?.runes.map((slot) => {
              const def = ALL_RUNES.find(r => r.id === slot.runeId);
              if (!def) return null;
              const isOncePerMatch = def.limitType === 'once_per_match';
              const isOncePerTurn = def.limitType === 'once_per_turn';

              const isExhausted = isOncePerMatch
                ? (slot.usedInMatch || you?.runeUsedInMatch || slot.usesLeft <= 0)
                : isOncePerTurn
                ? (slot.usedThisTurn || you?.runeUsedThisTurn || slot.usesLeft <= 0)
                : false;

              const isClickablePower = ['rune_swap_question', 'rune_purify', 'rune_shield', 'rune_double'].includes(def.id);
              const canUse = isMyTurn && !isGameOver && !isExhausted && isClickablePower;

              return (
                <div key={slot.runeId} className="flex items-center gap-2.5 flex-wrap">
                  <button
                    disabled={!canUse}
                    onClick={() => onUseRune(slot.runeId)}
                    title={`${def.name}: ${def.description}`}
                    style={{ borderColor: !isExhausted ? def.color : '#334155' }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                      canUse
                        ? 'bg-slate-900 hover:scale-105 active:scale-95 text-slate-100 shadow-md ring-1 ring-amber-400/40'
                        : isExhausted
                        ? 'bg-slate-950/60 text-slate-500 opacity-60 cursor-not-allowed border-dashed'
                        : 'bg-slate-950/80 text-slate-300'
                    }`}
                  >
                    <span className="text-base">{def.icon}</span>
                    <span className="font-bold">{def.name}</span>

                    {/* Status Badge */}
                    {isOncePerMatch ? (
                      isExhausted ? (
                        <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-rose-950/60 border border-rose-900 text-rose-400">
                          Đã dùng (Hết trận)
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-rose-950 border border-rose-500 text-rose-300 animate-pulse">
                          1 lần / Trận
                        </span>
                      )
                    ) : isOncePerTurn ? (
                      isExhausted ? (
                        <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-amber-950/60 border border-amber-900 text-amber-500/80">
                          Đã dùng lượt này
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-amber-950 border border-amber-500 text-amber-300">
                          1 lần / Lượt (Sẵn sàng)
                        </span>
                      )
                    ) : (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-cyan-950 border border-cyan-500 text-cyan-300">
                        Nội Tại Toàn Trận
                      </span>
                    )}

                    {canUse && (
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 uppercase tracking-tight">
                        Bấm Dùng
                      </span>
                    )}
                  </button>

                  <div className="text-[11px] text-slate-300 hidden md:block max-w-sm truncate" title={def.description}>
                    <span className="text-amber-400 font-bold">Tác dụng:</span> {def.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DRAW & BANK MAJOR ACTIONS */}
        <div className="grid grid-cols-2 gap-3">
          {/* DRAW BUTTON */}
          <button
            onClick={onDraw}
            disabled={!isMyTurn || isGameOver || !!gameState.currentQuestion}
            className={`py-4 px-4 rounded-2xl font-cinzel font-black text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-xl transition-all active:scale-[0.98] ${
              isMyTurn && !gameState.currentQuestion && !isGameOver
                ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-slate-950 shadow-amber-950/50 animate-glow'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
            }`}
          >
            <span className="text-xl">🃏</span>
            <span>RÚT BÀI (DRAW)</span>
          </button>

          {/* BANK BUTTON */}
          <button
            onClick={onBank}
            disabled={!isMyTurn || isGameOver || !!gameState.currentQuestion || (you?.currentTurnScore || 0) <= 0}
            className={`py-4 px-4 rounded-2xl font-cinzel font-black text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-xl transition-all active:scale-[0.98] ${
              isMyTurn && !gameState.currentQuestion && (you?.currentTurnScore || 0) > 0 && !isGameOver
                ? 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-emerald-950/50 animate-pulse'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
            }`}
          >
            <Coins className="w-5 h-5 text-amber-300" />
            <span>BANK (+{you?.currentTurnScore || 0}đ)</span>
          </button>
        </div>

        {/* SURRENDER HELPER LINK */}
        {!isGameOver && (
          <div className="flex justify-end pt-1">
            <button
              onClick={() => setShowSurrenderModal(true)}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-300 transition-colors py-1 px-2.5 rounded-lg hover:bg-rose-950/40 border border-transparent hover:border-rose-900/40 font-medium"
            >
              <Flag className="w-3.5 h-3.5 text-rose-400" />
              <span>Xin Đầu Hàng Ván Này</span>
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. YOU (PLAYER) STATUS BAR                                */}
        {/* ========================================================= */}
        <div className={`p-3 rounded-2xl border transition-all ${
          isMyTurn ? 'bg-amber-950/30 border-amber-500/70 shadow-xl shadow-amber-950/30' : 'bg-slate-900/80 border-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl p-1 bg-slate-950 rounded-xl border border-amber-500/40">
                {you?.avatar || '🧙‍♂️'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-amber-200">{you?.name || 'Bạn'}</span>
                  {isMyTurn && (
                    <span className="px-2 py-0.5 bg-amber-400 text-slate-950 font-black text-[10px] rounded-full uppercase">
                      Lượt Của Bạn
                    </span>
                  )}
                  {gameState.activeShield && (
                    <span className="px-2 py-0.5 bg-rose-500 text-white font-bold text-[10px] rounded-full flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Khiên ON
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-3 mt-0.5 font-mono">
                  <span>❤️ HP: {you?.hp || 100}</span>
                  <span className="text-amber-400">⭐ Kho An Toàn: <strong className="text-amber-200 text-sm">{you?.safeScore || 0}đ</strong></span>
                </div>
                {you?.chosenRuneId && (() => {
                  const rDef = ALL_RUNES.find(r => r.id === you.chosenRuneId);
                  return (
                    <div className="text-[11px] text-amber-300 flex items-center gap-1.5 mt-1" title={rDef?.persistentEffectDesc || rDef?.description}>
                      <span>{rDef?.icon}</span>
                      <span className="font-bold text-amber-400">Nội tại toàn trận: {rDef?.name}</span>
                      <span className="text-slate-300 font-light hidden sm:inline">— {rDef?.persistentEffectDesc}</span>
                    </div>
                  );
                })()}
              </div>
            </div>

            <div className="text-right font-mono">
              <div className="text-[10px] text-slate-400">Điểm Lượt Này</div>
              <div className="text-2xl font-black text-amber-400">
                +{you?.currentTurnScore || 0}
              </div>
            </div>
          </div>
        </div>

        {/* QUICK 3-STEP GAMEPLAY GUIDE BAR */}
        <div className="p-2 sm:p-2.5 bg-slate-900/70 border border-slate-800 rounded-2xl text-[11px] text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-sm">
          <div className="flex items-center gap-1.5 text-amber-300 font-bold shrink-0">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>MẸO CÁCH CHƠI:</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-slate-300 text-center sm:text-left">
            <span><strong>1. DRAW:</strong> Rút bài & giải đúng để tích lũy điểm lượt này.</span>
            <span><strong>2. BUST:</strong> Rút trùng hệ đã có trên bàn = Mất trắng điểm lượt!</span>
            <span><strong>3. BANK:</strong> Cất điểm vào Kho An Toàn trước khi bị BUST.</span>
          </div>
          <button
            onClick={() => setShowRulesModal(true)}
            className="text-amber-400 underline font-bold hover:text-amber-300 text-[11px] shrink-0"
          >
            Đọc Luật Đầy Đủ &raquo;
          </button>
        </div>
      </div>

      {/* HOW TO PLAY MODAL */}
      <HowToPlayModal isOpen={showRulesModal} onClose={() => setShowRulesModal(false)} />

      {/* ========================================================= */}
      {/* 5. GAME OVER & STUDY STATISTICS MODAL                     */}
      {/* ========================================================= */}
      {isGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
          <div className="relative w-full max-w-lg bg-slate-900 border-2 border-amber-500 rounded-3xl shadow-2xl p-6 text-slate-100 overflow-hidden space-y-4">
            <div className="text-center space-y-1">
              <div className="text-5xl animate-bounce">
                {isWinner ? '👑' : '⚔️'}
              </div>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">
                {isWinner ? 'CHIẾN THẮNG HUY HOÀNG!' : 'TRẬN ĐẤU KẾT THÚC'}
              </h2>
              <p className="text-xs text-slate-400">
                {isWinner
                  ? `Chúc mừng! Bạn đã đạt ${you?.safeScore} điểm mục tiêu trước đối thủ!`
                  : `Đối thủ đã chạm mốc điểm chiến thắng trước.`}
              </p>
            </div>

            {/* Study Statistics Breakdown */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider font-cinzel flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>BÁO CÁO THỐNG KÊ HỌC TẬP</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
                <div className="p-2 bg-slate-900 rounded-xl">
                  <div className="text-[10px] text-slate-400">Điểm Đạt Được</div>
                  <div className="text-lg font-black text-amber-400">{you?.safeScore || 0}</div>
                </div>

                <div className="p-2 bg-slate-900 rounded-xl">
                  <div className="text-[10px] text-slate-400">Độ Chính Xác</div>
                  <div className="text-lg font-black text-emerald-400">
                    {(() => {
                      const total = (you?.stats.correctCount || 0) + (you?.stats.wrongCount || 0);
                      return total > 0 ? Math.round(((you?.stats.correctCount || 0) / total) * 100) : 0;
                    })()}%
                  </div>
                </div>

                <div className="p-2 bg-slate-900 rounded-xl">
                  <div className="text-[10px] text-slate-400">Câu Đúng</div>
                  <div className="text-lg font-black text-indigo-300">
                    {you?.stats.correctCount || 0}/{(you?.stats.correctCount || 0) + (you?.stats.wrongCount || 0)}
                  </div>
                </div>

                <div className="p-2 bg-slate-900 rounded-xl">
                  <div className="text-[10px] text-slate-400">Số Lần Bust</div>
                  <div className="text-lg font-black text-rose-400">{you?.stats.bustCount || 0}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Kinh nghiệm nhận được:</span>
                <span className="font-mono font-bold text-amber-300">
                  +{isWinner ? 100 : 40} XP (+{(you?.stats.correctCount || 0) * 5} XP Toán)
                </span>
              </div>
            </div>

            <button
              onClick={onExit}
              className="w-full py-3 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all active:scale-95 uppercase tracking-wider"
            >
              Về Màn Hình Chính
            </button>
          </div>
        </div>
      )}

      {/* INSPECTED TABLE CARD MODAL */}
      {inspectedTableCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            style={{
              borderColor: inspectedTableCard.elementColor,
              boxShadow: `0 0 25px ${inspectedTableCard.accentGlow}`,
            }}
            className="relative w-full max-w-md bg-slate-900 border-2 rounded-3xl p-5 text-slate-100 space-y-4 shadow-2xl"
          >
            <button
              onClick={() => setInspectedTableCard(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border"
                style={{
                  backgroundColor: `${inspectedTableCard.elementColor}22`,
                  borderColor: inspectedTableCard.elementColor,
                }}
              >
                🎴
              </div>
              <div>
                <span
                  className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md"
                  style={{ backgroundColor: `${inspectedTableCard.elementColor}22`, color: inspectedTableCard.elementColor }}
                >
                  {inspectedTableCard.domainNameVi}
                </span>
                <h4 className="font-cinzel text-lg font-black text-amber-200 mt-0.5">
                  {inspectedTableCard.domainName}
                </h4>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Điểm giá trị lá bài:</span>
              <span className="font-mono text-base font-black text-amber-300">+{inspectedTableCard.pointValue} điểm</span>
            </div>

            <div className="p-3.5 bg-amber-950/30 border border-amber-500/40 rounded-xl space-y-1.5">
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Tác Dụng: {inspectedTableCard.skillName}</span>
              </div>
              <p className="text-xs text-slate-200 font-light leading-relaxed">
                {inspectedTableCard.skillDesc}
              </p>
            </div>

            <button
              onClick={() => setInspectedTableCard(null)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl uppercase tracking-wider"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* SURRENDER CONFIRMATION MODAL */}
      {showSurrenderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-rose-600/50 rounded-2xl max-w-md w-full p-6 text-center shadow-2xl shadow-rose-950/50 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-950/80 border border-rose-500/40 flex items-center justify-center text-rose-400 shadow-inner">
              <Flag className="w-8 h-8 animate-pulse text-rose-400" />
            </div>

            <div>
              <h3 className="font-cinzel text-xl font-bold text-rose-200">
                XÁC NHẬN ĐẦU HÀNG?
              </h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Bạn có chắc chắn muốn giương cờ trắng đầu hàng ván đấu này không? 
                Chiến thắng sẽ thuộc về <strong className="text-amber-300">{opponent?.name || 'Đối thủ'}</strong> và trận đấu sẽ kết thúc ngay lập tức.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setShowSurrenderModal(false);
                  onSurrender();
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-700 to-red-600 hover:from-rose-600 hover:to-red-500 text-white font-bold text-sm shadow-lg shadow-rose-950/50 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Flag className="w-4 h-4" />
                <span>Chấp Nhận Đầu Hàng</span>
              </button>
              <button
                onClick={() => setShowSurrenderModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all active:scale-95"
              >
                Hủy / Tiếp Tục Quyết Đấu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
