import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { UserProfile, LeaderboardEntry, Question } from '../../shared/types.ts';
import { DEFAULT_RUNE_SELECTION } from '../../shared/runes.ts';

export interface DBUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  avatar: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface MatchHistoryItem {
  id: string;
  userId: string;
  opponentName: string;
  isWin: boolean;
  score: number;
  accuracy: number;
  correctAnswers: number;
  totalQuestions: number;
  busts: number;
  maxCombo: number;
  mode: 'ai' | 'pvp';
  timestamp: number;
}

export interface DatabaseSchema {
  users: DBUser[];
  profiles: Record<string, UserProfile>;
  matchHistory: MatchHistoryItem[];
  customQuestions: Question[];
  rooms: Record<string, any>;
}

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'math_rune.json');

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (e) {
    console.error('Failed to create data directory:', e);
  }
}

// Initial default seed
const DEFAULT_DB: DatabaseSchema = {
  users: [
    {
      id: 'admin-001',
      username: 'ArchmageAdmin',
      email: 'admin@mathrune.com',
      passwordHash: bcrypt.hashSync('admin123', 10),
      avatar: '🧙‍♂️',
      role: 'admin',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'bot-ai',
      username: 'Archimedes AI',
      email: 'ai@mathrune.com',
      passwordHash: 'none',
      avatar: '🤖',
      role: 'user',
      createdAt: new Date().toISOString(),
    },
  ],
  profiles: {
    'admin-001': {
      id: 'admin-001',
      username: 'ArchmageAdmin',
      avatar: '🧙‍♂️',
      level: 10,
      xp: 4500,
      totalGames: 28,
      wins: 24,
      losses: 4,
      winRate: 85.7,
      highestScore: 320,
      rankTitle: 'Đại Pháp Sư Toán Học',
      equippedRunes: DEFAULT_RUNE_SELECTION,
      createdAt: new Date().toISOString(),
    },
    'bot-ai': {
      id: 'bot-ai',
      username: 'Archimedes AI',
      avatar: '🤖',
      level: 5,
      xp: 1200,
      totalGames: 50,
      wins: 25,
      losses: 25,
      winRate: 50,
      highestScore: 210,
      rankTitle: 'Kỳ Thủ Thuật Toán',
      equippedRunes: DEFAULT_RUNE_SELECTION,
      createdAt: new Date().toISOString(),
    },
  },
  matchHistory: [],
  customQuestions: [],
  rooms: {},
};

class DatabaseManager {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.load();
  }

  private load(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Failed to load DB file, using default seed:', e);
    }
    this.save(DEFAULT_DB);
    return DEFAULT_DB;
  }

  private save(dataToSave?: DatabaseSchema) {
    try {
      const payload = dataToSave || this.data;
      fs.writeFileSync(DB_FILE, JSON.stringify(payload, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error persisting database:', e);
    }
  }

  // User auth methods
  public findUserByUsername(username: string): DBUser | undefined {
    return this.data.users.find(u => u.username.toLowerCase() === username.toLowerCase());
  }

  public findUserById(id: string): DBUser | undefined {
    return this.data.users.find(u => u.id === id);
  }

  public createUser(username: string, email: string, password: string,avatar: string): DBUser {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    const newUser: DBUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      username,
      email,
      passwordHash,
      avatar: avatar || '🧙‍♂️',
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    this.data.users.push(newUser);

    // Create profile
    this.data.profiles[newUser.id] = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      avatar: newUser.avatar,
      level: 1,
      xp: 0,
      totalGames: 0,
      wins: 0,
      losses: 0,
      winRate: 0,
      highestScore: 0,
      rankTitle: 'Tập Sự Phép Thuật',
      equippedRunes: [...DEFAULT_RUNE_SELECTION],
      createdAt: newUser.createdAt,
    };

    this.save();
    return newUser;
  }

  public getProfile(userId: string): UserProfile | undefined {
    return this.data.profiles[userId];
  }

  public updateProfile(userId: string, updates: Partial<UserProfile>): UserProfile | undefined {
    if (!this.data.profiles[userId]) return undefined;
    this.data.profiles[userId] = {
      ...this.data.profiles[userId],
      ...updates,
    };
    this.save();
    return this.data.profiles[userId];
  }

  public recordMatch(item: MatchHistoryItem) {
    this.data.matchHistory.unshift(item);

    // Update player profile
    const profile = this.data.profiles[item.userId];
    if (profile) {
      profile.totalGames += 1;
      if (item.isWin) {
        profile.wins += 1;
        profile.xp += 100 + item.correctAnswers * 5;
      } else {
        profile.losses += 1;
        profile.xp += 40 + item.correctAnswers * 5;
      }
      profile.winRate = Math.round((profile.wins / profile.totalGames) * 100);
      if (item.score > profile.highestScore) {
        profile.highestScore = item.score;
      }

      // Check level up (every 300 XP = 1 level)
      const calculatedLevel = Math.max(1, Math.floor(profile.xp / 300) + 1);
      profile.level = calculatedLevel;

      if (profile.level >= 10) profile.rankTitle = 'Đại Pháp Sư Toán Học';
      else if (profile.level >= 7) profile.rankTitle = 'Bậc Thầy Ấn Chú';
      else if (profile.level >= 4) profile.rankTitle = 'Học Giả Phép Thuật';
      else profile.rankTitle = 'Tập Sự Phép Thuật';
    }

    this.save();
  }

  public getUserMatchHistory(userId: string, limit = 15): MatchHistoryItem[] {
    return this.data.matchHistory.filter(m => m.userId === userId).slice(0, limit);
  }

  public getLeaderboard(filter: 'all' | 'weekly' | 'daily' = 'all'): LeaderboardEntry[] {
    const list = Object.values(this.data.profiles)
      .filter(p => p.id !== 'bot-ai')
      .sort((a, b) => {
        if (b.highestScore !== a.highestScore) {
          return b.highestScore - a.highestScore;
        }
        return b.xp - a.xp;
      })
      .slice(0, 50)
      .map((p, idx) => ({
        rank: idx + 1,
        userId: p.id,
        username: p.username,
        avatar: p.avatar,
        level: p.level,
        score: p.highestScore,
        wins: p.wins,
        winRate: p.winRate,
      }));

    return list;
  }

  public getAllUsers(): Omit<DBUser, 'passwordHash'>[] {
    return this.data.users.map(({ passwordHash, ...safe }) => safe);
  }

  public addCustomQuestion(q: Question) {
    this.data.customQuestions.push(q);
    this.save();
  }

  public getCustomQuestions(): Question[] {
    return this.data.customQuestions;
  }

  public deleteCustomQuestion(id: string) {
    this.data.customQuestions = this.data.customQuestions.filter(q => q.id !== id);
    this.save();
  }
}

export const db = new DatabaseManager();
