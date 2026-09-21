export type MathLevel = 'CO_BAN' | 'THCS' | 'THPT' | 'DAI_HOC';

export type MathCategory =
  | 'NGUYEN_TO'      // Số nguyên tố
  | 'CHINH_PHUONG'   // Số chính phương
  | 'DAI_SO'         // Phương trình bậc nhất & Đại số
  | 'KHAI_CAN'       // Khai căn & Căn bậc hai
  | 'LUY_THUA'       // Lũy thừa & Mũ
  | 'AM_SO'          // Số nguyên âm & Dấu
  | 'CHIA_HET'       // Dấu hiệu chia hết 3, 9, 2, 5
  | 'PHAN_SO'        // Phân số & Tỉ số
  | 'TUYET_DOI'      // Trị tuyệt đối
  | 'UOC_BOI'        // Ước chung, Bội chung
  // Cấp 3 / Đại học:
  | 'DAO_HAM'        // Đạo hàm
  | 'TICH_PHAN'      // Tích phân
  | 'LOGARIT'        // Logarit & Hàm số mũ
  | 'LUONG_GIAC'     // Lượng giác
  | 'SO_PHUC'        // Số phức
  | 'XAC_SUAT';      // Xác suất & Tổ hợp

export type CardRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';
export type CardSpecialType = 'standard' | 'gold_card' | 'cursed_trap';

export interface Card {
  id: string;
  domainId: MathCategory;
  domainName: string;
  domainNameVi: string;
  pointValue: number;
  rarity: CardRarity;
  skillName: string;
  skillDesc: string;
  elementColor: string;
  accentGlow: string;
  iconName: string;
  specialType?: CardSpecialType;
  specialBadge?: string;
}

export type RuneCategory = 'DEFENSE' | 'TIME' | 'POINTS' | 'MAGIC';
export type RuneLimitType = 'once_per_turn' | 'once_per_match' | 'continuous';

export interface RuneDef {
  id: string;
  name: string;
  category: RuneCategory;
  categoryNameVi: string;
  icon: string;
  color: string;
  description: string;
  persistentEffectDesc: string; // Tác dụng nội tại kích hoạt xuyên suốt cả trận đấu
  limitType: RuneLimitType; // 'once_per_turn' (1 lần/lượt), 'once_per_match' (1 lần/trận như Rune Bất Tử), 'continuous' (liên tục)
  maxUses: number;
  unlockedLevel: number;
}

export interface PlayerRuneSlot {
  runeId: string;
  usesLeft: number;
  active?: boolean;
  usedThisTurn?: boolean;
  usedInMatch?: boolean;
}

export type QuestionTier = 'standard' | 'gold' | 'cursed_trap';

export interface Question {
  id: string;
  question: string;
  formula?: string;
  options?: string[]; // Quick choices if provided
  answer: string;
  explanation: string;
  timeLimit: number; // in seconds, default 50
  difficulty: 1 | 2 | 3 | 4; // 1: Dễ, 2: TB, 3: Khó, 4: Cực khó (Vàng/Bẫy)
  category: MathCategory;
  level: MathLevel;
  tier?: QuestionTier;
  tierTitle?: string;
  tierBadge?: string;
  bonusPoints?: number;
}

// Sanitized question sent to client during play (without revealing answer or explanation)
export interface ClientQuestion {
  id: string;
  question: string;
  formula?: string;
  options?: string[];
  timeLimit: number;
  difficulty: 1 | 2 | 3 | 4;
  category: MathCategory;
  level: MathLevel;
  tier?: QuestionTier;
  tierTitle?: string;
  tierBadge?: string;
  bonusPoints?: number;
}

export type GameMode = 'ai' | 'pvp';
export type AiDifficulty = 'easy' | 'medium' | 'hard' | 'expert';
export type GameStatus = 'waiting' | 'ready' | 'drafting' | 'playing' | 'round_end' | 'game_over';

export interface PlayerState {
  id: string;
  name: string;
  avatar: string;
  hp: number; // default 100
  safeScore: number;
  currentTurnScore: number;
  runes: PlayerRuneSlot[];
  draftRunes?: string[]; // 2 distinct random rune IDs dealt at the start of the match (choose 1 of 2)
  chosenRuneId?: string; // The 1 chosen rune active throughout the match
  isAi?: boolean;
  connected?: boolean;
  stats: {
    correctCount: number;
    wrongCount: number;
    bustCount: number;
    comboMax: number;
    currentCombo: number;
    categoryAccuracy: Record<string, { correct: number; total: number }>;
  };
  runeUsedThisTurn?: boolean; // Đã kích hoạt rune trong lượt hiện tại (1 lần / lượt)
  runeUsedInMatch?: boolean; // Đã kích hoạt rune tối thượng trong trận (1 lần / trận, như Rune Bất Tử)
}

export interface GameEventLog {
  id: string;
  timestamp: number;
  type: 'draw' | 'answer_correct' | 'answer_wrong' | 'bust' | 'bank' | 'rune_used' | 'turn_switch' | 'game_over' | 'surrender';
  playerId: string;
  playerName: string;
  message: string;
  details?: Record<string, any>;
}

export interface GameState {
  gameId: string;
  roomCode: string;
  mode: GameMode;
  aiDifficulty?: AiDifficulty;
  status: GameStatus;
  targetScore: number; // default 150 points to win
  round: number;
  turn: number;
  currentPlayerId: string;
  players: Record<string, PlayerState>;
  tableCards: Card[];
  deckRemaining: number;
  currentCard?: Card;
  currentQuestion?: ClientQuestion;
  questionStartTime?: number;
  questionTimeLimit?: number;
  lastAnswerResult?: {
    correct: boolean;
    earnedPoints: number;
    revealedAnswer?: string;
    explanation?: string;
  };
  activeShield?: boolean;
  doublePointsActive?: boolean;
  aiThinkingStatus?: 'thinking' | 'solving' | null;
  historyLog: GameEventLog[];
  winnerId?: string;
  mathLevel: MathLevel;
  nextCardPreview?: { domainId: MathCategory; domainNameVi: string; pointValue: number; elementColor: string };
}

export interface UserProfile {
  id: string;
  username: string;
  email?: string;
  avatar: string;
  level: number;
  xp: number;
  totalGames: number;
  wins: number;
  losses: number;
  winRate: number;
  highestScore: number;
  rankTitle: string;
  equippedRunes: string[]; // 3 rune IDs
  unlockedSkins?: string[];
  createdAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  level: number;
  score: number;
  wins: number;
  winRate: number;
}
