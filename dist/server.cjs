var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_http = __toESM(require("http"), 1);
var import_path2 = __toESM(require("path"), 1);
var import_bcryptjs2 = __toESM(require("bcryptjs"), 1);

// server/database/db.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_bcryptjs = __toESM(require("bcryptjs"), 1);

// shared/runes.ts
var ALL_RUNES = [
  // 🔴 NHÓM PHÒNG THỦ (DEFENSE)
  {
    id: "rune_revive",
    name: "Rune H\u1ED3i Sinh",
    category: "DEFENSE",
    categoryNameVi: "Ph\xF2ng Th\u1EE7",
    icon: "ShieldAlert",
    color: "#ef4444",
    description: "C\u1EE9u 50% \u0111i\u1EC3m an to\xE0n khi b\u1ECB BUST (Duy nh\u1EA5t 1 l\u1EA7n/tr\u1EADn).",
    persistentEffectDesc: "H\u1ED2I SINH B\u1EA2O M\u1EC6NH (DUY NH\u1EA4T 1 L\u1EA6N/TR\u1EACN): Khi g\u1EB7p r\u1EE7i ro BUST n\u1ED5 l\u01B0\u1EE3t, t\u1EF1 \u0111\u1ED9ng c\u1EE9u l\u1EA1i 50% \u0111i\u1EC3m s\u1ED1 l\u01B0\u1EE3t \u0111\xF3 v\xE0o kho an to\xE0n. Ch\u1EC9 k\xEDch ho\u1EA1t \u0110\xDANG 1 L\u1EA6N trong c\u1EA3 tr\u1EADn \u0111\u1EA5u!",
    limitType: "once_per_match",
    maxUses: 1,
    unlockedLevel: 1
  },
  {
    id: "rune_shield",
    name: "Rune Khi\xEAn Ch\u1EAFn",
    category: "DEFENSE",
    categoryNameVi: "Ph\xF2ng Th\u1EE7",
    icon: "Shield",
    color: "#f87171",
    description: "Ch\u1EB7n r\u1EE7i ro BUST tr\xF9ng h\u1EC7 (1 l\u1EA7n/l\u01B0\u1EE3t).",
    persistentEffectDesc: "KHI\xCAN H\u1ED8 M\u1EC6NH (1 L\u1EA6N/L\u01AF\u1EE2T): T\u1EF1 \u0111\u1ED9ng ch\u1EB7n \u0111\u1EE9ng 1 l\u1EA7n BUST tr\xF9ng h\u1EC7 \u0111\u1EA7u ti\xEAn trong m\u1ED7i l\u01B0\u1EE3t thi \u0111\u1EA5u!",
    limitType: "once_per_turn",
    maxUses: 1,
    unlockedLevel: 1
  },
  {
    id: "rune_insurance",
    name: "Rune B\u1EA3o Hi\u1EC3m",
    category: "DEFENSE",
    categoryNameVi: "Ph\xF2ng Th\u1EE7",
    icon: "Lock",
    color: "#fb923c",
    description: "Kh\xF3a \u0111i\u1EC3m b\xE0i tr\xEAn b\xE0n v\xE0o kho (1 l\u1EA7n/l\u01B0\u1EE3t).",
    persistentEffectDesc: "B\u1EA2O HI\u1EC2M KHO (1 L\u1EA6N/L\u01AF\u1EE2T): Khi t\xEDch \u0111\u01B0\u1EE3c t\u1EEB 2 l\xE1 b\xE0i tr\u1EDF l\xEAn tr\xEAn b\xE0n, l\xE1 b\xE0i \u0111i\u1EC3m cao nh\u1EA5t t\u1EF1 \u0111\u1ED9ng \u0111\u01B0\u1EE3c kh\xF3a v\xE0o kho an to\xE0n (t\u1ED1i \u0111a 1 l\u1EA7n/l\u01B0\u1EE3t)!",
    limitType: "once_per_turn",
    maxUses: 1,
    unlockedLevel: 1
  },
  {
    id: "rune_retry",
    name: "Rune S\u1EEDa Sai",
    category: "DEFENSE",
    categoryNameVi: "Ph\xF2ng Th\u1EE7",
    icon: "RotateCcw",
    color: "#f43f5e",
    description: "Cho ph\xE9p l\xE0m l\u1EA1i c\xE2u h\u1ECFi To\xE1n (1 l\u1EA7n/l\u01B0\u1EE3t).",
    persistentEffectDesc: "S\u1EECA SAI (1 L\u1EA6N/L\u01AF\u1EE2T): N\u1EBFu tr\u1EA3 l\u1EDDi ch\u01B0a \u0111\xFAng, \u0111\u01B0\u1EE3c l\xE0m l\u1EA1i ngay m\u1ED9t l\u1EA7n v\u1EDBi th\xEAm 15 gi\xE2y h\u1ED3i ph\u1EE5c (t\u1ED1i \u0111a 1 l\u1EA7n/l\u01B0\u1EE3t)!",
    limitType: "once_per_turn",
    maxUses: 1,
    unlockedLevel: 1
  },
  // 🔵 NHÓM THỜI GIAN (TIME)
  {
    id: "rune_freeze",
    name: "Rune \u0110\xF3ng B\u0103ng",
    category: "TIME",
    categoryNameVi: "Th\u1EDDi Gian",
    icon: "Snowflake",
    color: "#38bdf8",
    description: "Gia h\u1EA1n th\u1EDDi gian t\xEDnh to\xE1n.",
    persistentEffectDesc: "TH\u1EDCI KH\xD4NG: M\u1ECDi c\xE2u h\u1ECFi To\xE1n trong su\u1ED1t tr\u1EADn \u0111\u1EA5u c\u1EE7a b\u1EA1n \u0111\u1EC1u \u0111\u01B0\u1EE3c t\u1EF1 \u0111\u1ED9ng c\u1ED9ng th\xEAm +20 gi\xE2y suy ngh\u0129!",
    limitType: "continuous",
    maxUses: 999,
    unlockedLevel: 1
  },
  {
    id: "rune_haste",
    name: "Rune T\u0103ng T\u1ED1c",
    category: "TIME",
    categoryNameVi: "Th\u1EDDi Gian",
    icon: "Zap",
    color: "#60a5fa",
    description: "G\xE2y \xE1p l\u1EF1c t\u1ED1c \u0111\u1ED9 l\xEAn \u0111\u1ED1i th\u1EE7.",
    persistentEffectDesc: "\xC1P CH\u1EBE: \u0110\u1ED1i th\u1EE7 c\u1EE7a b\u1EA1n b\u1ECB tr\u1EEB 8 gi\xE2y th\u1EDDi gian suy ngh\u0129 trong m\u1ECDi l\u01B0\u1EE3t thi \u0111\u1EA5u c\u1EE7a h\u1ECD su\u1ED1t c\u1EA3 tr\u1EADn!",
    limitType: "continuous",
    maxUses: 999,
    unlockedLevel: 1
  },
  {
    id: "rune_time_plus",
    name: "Rune Th\u1EDDi Gian",
    category: "TIME",
    categoryNameVi: "Th\u1EDDi Gian",
    icon: "Clock",
    color: "#0ea5e9",
    description: "Th\u1EDDi gian t\u01B0 duy d\u1ED3i d\xE0o v\xE0 th\u01B0\u1EDFng t\u1ED1c \u0111\u1ED9.",
    persistentEffectDesc: "V\u0128NH H\u1EB0NG: Lu\xF4n \u0111\u01B0\u1EE3c h\u01B0\u1EDFng 60 gi\xE2y cho m\u1ECDi c\xE2u h\u1ECFi v\xE0 nh\u1EADn th\xEAm +3 \u0111i\u1EC3m th\u01B0\u1EDFng khi tr\u1EA3 l\u1EDDi nhanh d\u01B0\u1EDBi 12 gi\xE2y!",
    limitType: "continuous",
    maxUses: 999,
    unlockedLevel: 1
  },
  {
    id: "rune_swap_question",
    name: "Rune Ho\xE1n \u0110\u1ED5i",
    category: "TIME",
    categoryNameVi: "Th\u1EDDi Gian",
    icon: "Shuffle",
    color: "#818cf8",
    description: "\u0110\u1ED5i c\xE2u h\u1ECFi To\xE1n kh\xF3 sang c\xE2u m\u1EDBi (1 l\u1EA7n/l\u01B0\u1EE3t).",
    persistentEffectDesc: "HO\xC1N \u0110\u1ED4I (1 L\u1EA6N/L\u01AF\u1EE2T): Cho ph\xE9p b\u1EA5m \u0111\u1ED5i c\xE2u h\u1ECFi to\xE1n kh\xF3 sang m\u1ED9t c\xE2u m\u1EDBi d\u1EC5 h\u01A1n (t\u1ED1i \u0111a 1 l\u1EA7n/l\u01B0\u1EE3t)!",
    limitType: "once_per_turn",
    maxUses: 1,
    unlockedLevel: 1
  },
  // 🟡 NHÓM ĐIỂM SỐ (POINTS)
  {
    id: "rune_double",
    name: "Rune Nh\xE2n \u0110\xF4i",
    category: "POINTS",
    categoryNameVi: "\u0110i\u1EC3m S\u1ED1",
    icon: "Sparkles",
    color: "#eab308",
    description: "Gia t\u0103ng \u0111i\u1EC3m s\u1ED1 l\xE1 b\xE0i (1 l\u1EA7n/l\u01B0\u1EE3t).",
    persistentEffectDesc: "NH\xC2N \u0110I\u1EC2M (1 L\u1EA6N/L\u01AF\u1EE2T): Nh\xE2n x1.5 \u0111i\u1EC3m cho 1 l\xE1 b\xE0i gi\u1EA3i \u0111\xFAng trong m\u1ED7i l\u01B0\u1EE3t thi \u0111\u1EA5u!",
    limitType: "once_per_turn",
    maxUses: 1,
    unlockedLevel: 1
  },
  {
    id: "rune_bank_bonus",
    name: "Rune T\xEDch L\u0169y",
    category: "POINTS",
    categoryNameVi: "\u0110i\u1EC3m S\u1ED1",
    icon: "Coins",
    color: "#facc15",
    description: "C\u1ED9ng \u0111i\u1EC3m th\u01B0\u1EDFng khi c\u1EA5t gi\u1EEF (1 l\u1EA7n/l\u01B0\u1EE3t).",
    persistentEffectDesc: "KHO B\xC1U (1 L\u1EA6N/L\u01AF\u1EE2T): M\u1ED7i l\u1EA7n b\u1EA1n b\u1EA5m BANK, t\u1EF1 \u0111\u1ED9ng nh\u1EADn th\xEAm +15 \u0111i\u1EC3m th\u01B0\u1EDFng tr\u1EF1c ti\u1EBFp v\xE0o kho an to\xE0n!",
    limitType: "once_per_turn",
    maxUses: 1,
    unlockedLevel: 1
  },
  {
    id: "rune_harvest",
    name: "Rune Thu Ho\u1EA1ch",
    category: "POINTS",
    categoryNameVi: "\u0110i\u1EC3m S\u1ED1",
    icon: "Award",
    color: "#fbbf24",
    description: "Th\u01B0\u1EDFng chu\u1ED7i b\xE0i l\u1EDBn (1 l\u1EA7n/l\u01B0\u1EE3t).",
    persistentEffectDesc: "B\u1ED8I THU (1 L\u1EA6N/L\u01AF\u1EE2T): M\u1ED7i khi gom \u0111\u01B0\u1EE3c t\u1EEB 3 l\xE1 b\xE0i tr\u1EDF l\xEAn tr\xEAn b\xE0n trong l\u01B0\u1EE3t, nh\u1EADn th\xEAm +15 \u0111i\u1EC3m th\u01B0\u1EDFng (t\u1ED1i \u0111a 1 l\u1EA7n/l\u01B0\u1EE3t)!",
    limitType: "once_per_turn",
    maxUses: 1,
    unlockedLevel: 1
  },
  {
    id: "rune_siphon",
    name: "Rune \u0110\u1EA1o T\u1EB7c",
    category: "POINTS",
    categoryNameVi: "\u0110i\u1EC3m S\u1ED1",
    icon: "Flame",
    color: "#d97706",
    description: "H\xFAt \u0111i\u1EC3m t\u1EEB kho c\u1EE7a \u0111\u1ED1i th\u1EE7 (1 l\u1EA7n/l\u01B0\u1EE3t).",
    persistentEffectDesc: "MA H\xDAT (1 L\u1EA6N/L\u01AF\u1EE2T): H\xFAt 3 \u0111i\u1EC3m an to\xE0n t\u1EEB \u0111\u1ED1i th\u1EE7 sang kho c\u1EE7a b\u1EA1n \u1EDF c\xE2u tr\u1EA3 l\u1EDDi \u0111\xFAng \u0111\u1EA7u ti\xEAn trong m\u1ED7i l\u01B0\u1EE3t!",
    limitType: "once_per_turn",
    maxUses: 1,
    unlockedLevel: 1
  },
  // 🟣 NHÓM MA THUẬT (MAGIC)
  {
    id: "rune_foresight",
    name: "Rune Ti\xEAn Tri",
    category: "MAGIC",
    categoryNameVi: "Ma Thu\u1EADt",
    icon: "Eye",
    color: "#a855f7",
    description: "Xem tr\u01B0\u1EDBc l\xE1 b\xE0i tr\xEAn \u0111\u1EC9nh b\u1ED9 b\xE0i.",
    persistentEffectDesc: "TH\u1EA4U TH\u1ECA: Lu\xF4n nh\xECn th\u1EA5y tr\u01B0\u1EDBc h\u1EC7 v\xE0 \u0111i\u1EC3m s\u1ED1 c\u1EE7a l\xE1 b\xE0i ti\u1EBFp theo tr\xEAn \u0111\u1EC9nh b\u1ED9 b\xE0i \u0111\u1EC3 n\xE9 BUST!",
    limitType: "continuous",
    maxUses: 999,
    unlockedLevel: 1
  },
  {
    id: "rune_purify",
    name: "Rune Thanh L\u1ECDc",
    category: "MAGIC",
    categoryNameVi: "Ma Thu\u1EADt",
    icon: "Feather",
    color: "#c084fc",
    description: "Thanh l\u1ECDc l\xE1 b\xE0i nguy hi\u1EC3m tr\xEAn b\xE0n (1 l\u1EA7n/l\u01B0\u1EE3t).",
    persistentEffectDesc: "THANH L\u1ECCC (1 L\u1EA6N/L\u01AF\u1EE2T): X\xF3a b\u1ECF 1 l\xE1 b\xE0i \u0111\xE3 c\xF3 tr\xEAn b\xE0n \u0111\u1EC3 gi\u1EA3m nguy c\u01A1 Bust tr\xF9ng h\u1EC7 (t\u1ED1i \u0111a 1 l\u1EA7n/l\u01B0\u1EE3t)!",
    limitType: "once_per_turn",
    maxUses: 1,
    unlockedLevel: 1
  },
  {
    id: "rune_frenzy",
    name: "Rune Cu\u1ED3ng N\u1ED9",
    category: "MAGIC",
    categoryNameVi: "Ma Thu\u1EADt",
    icon: "Swords",
    color: "#ec4899",
    description: "C\u01B0\u1EDDng h\xF3a to\xE0n b\u1ED9 \u0111i\u1EC3m s\u1ED1.",
    persistentEffectDesc: "CHI\u1EBEN \xDD: To\xE0n b\u1ED9 \u0111i\u1EC3m s\u1ED1 ki\u1EBFm \u0111\u01B0\u1EE3c khi gi\u1EA3i \u0111\xFAng c\xE2u h\u1ECFi \u0111\u01B0\u1EE3c t\u0103ng +25% \u0111i\u1EC3m!",
    limitType: "continuous",
    maxUses: 999,
    unlockedLevel: 1
  },
  {
    id: "rune_immortal",
    name: "Rune B\u1EA5t T\u1EED",
    category: "MAGIC",
    categoryNameVi: "Ma Thu\u1EADt",
    icon: "Crown",
    color: "#f43f5e",
    description: "Ch\u1EB7n thua cu\u1ED9c v\xE0 trao c\u01A1 h\u1ED9i l\u1EADt k\xE8o (Duy nh\u1EA5t 1 l\u1EA7n/tr\u1EADn).",
    persistentEffectDesc: "B\u1EA4T T\u1EEC C\u1EA2NH GI\u1EDAI (DUY NH\u1EA4T 1 L\u1EA6N/TR\u1EACN): Khi \u0111\u1ED1i th\u1EE7 ch\u1EA1m m\u1ED1c 150 \u0111i\u1EC3m, t\u1EF1 \u0111\u1ED9ng ch\u1EB7n \u0111\u1EE9ng chi\u1EBFn th\u1EAFng, gi\u1EA3m 30 \u0111i\u1EC3m c\u1EE7a h\u1ECD v\xE0 m\u1EDF ra v\xF2ng \u0111\u1EA5u l\u1ED9i ng\u01B0\u1EE3c d\xF2ng. Ch\u1EC9 k\xEDch ho\u1EA1t \u0110\xDANG 1 L\u1EA6N duy nh\u1EA5t trong c\u1EA3 tr\u1EADn!",
    limitType: "once_per_match",
    maxUses: 1,
    unlockedLevel: 1
  }
];
var DEFAULT_RUNE_SELECTION = ["rune_shield"];

// server/database/db.ts
var DATA_DIR = import_path.default.join(process.cwd(), "data");
var DB_FILE = import_path.default.join(DATA_DIR, "math_rune.json");
if (!import_fs.default.existsSync(DATA_DIR)) {
  try {
    import_fs.default.mkdirSync(DATA_DIR, { recursive: true });
  } catch (e) {
    console.error("Failed to create data directory:", e);
  }
}
var DEFAULT_DB = {
  users: [
    {
      id: "admin-001",
      username: "ArchmageAdmin",
      email: "admin@mathrune.com",
      passwordHash: import_bcryptjs.default.hashSync("admin123", 10),
      avatar: "\u{1F9D9}\u200D\u2642\uFE0F",
      role: "admin",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      id: "bot-ai",
      username: "Archimedes AI",
      email: "ai@mathrune.com",
      passwordHash: "none",
      avatar: "\u{1F916}",
      role: "user",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    }
  ],
  profiles: {
    "admin-001": {
      id: "admin-001",
      username: "ArchmageAdmin",
      avatar: "\u{1F9D9}\u200D\u2642\uFE0F",
      level: 10,
      xp: 4500,
      totalGames: 28,
      wins: 24,
      losses: 4,
      winRate: 85.7,
      highestScore: 320,
      rankTitle: "\u0110\u1EA1i Ph\xE1p S\u01B0 To\xE1n H\u1ECDc",
      equippedRunes: DEFAULT_RUNE_SELECTION,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    },
    "bot-ai": {
      id: "bot-ai",
      username: "Archimedes AI",
      avatar: "\u{1F916}",
      level: 5,
      xp: 1200,
      totalGames: 50,
      wins: 25,
      losses: 25,
      winRate: 50,
      highestScore: 210,
      rankTitle: "K\u1EF3 Th\u1EE7 Thu\u1EADt To\xE1n",
      equippedRunes: DEFAULT_RUNE_SELECTION,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    }
  },
  matchHistory: [],
  customQuestions: [],
  rooms: {}
};
var DatabaseManager = class {
  constructor() {
    this.data = this.load();
  }
  load() {
    try {
      if (import_fs.default.existsSync(DB_FILE)) {
        const raw = import_fs.default.readFileSync(DB_FILE, "utf-8");
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn("Failed to load DB file, using default seed:", e);
    }
    this.save(DEFAULT_DB);
    return DEFAULT_DB;
  }
  save(dataToSave) {
    try {
      const payload = dataToSave || this.data;
      import_fs.default.writeFileSync(DB_FILE, JSON.stringify(payload, null, 2), "utf-8");
    } catch (e) {
      console.error("Error persisting database:", e);
    }
  }
  // User auth methods
  findUserByUsername(username) {
    return this.data.users.find((u) => u.username.toLowerCase() === username.toLowerCase());
  }
  findUserById(id) {
    return this.data.users.find((u) => u.id === id);
  }
  createUser(username, email, password, avatar) {
    const salt = import_bcryptjs.default.genSaltSync(10);
    const passwordHash = import_bcryptjs.default.hashSync(password, salt);
    const newUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      username,
      email,
      passwordHash,
      avatar: avatar || "\u{1F9D9}\u200D\u2642\uFE0F",
      role: "user",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.data.users.push(newUser);
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
      rankTitle: "T\u1EADp S\u1EF1 Ph\xE9p Thu\u1EADt",
      equippedRunes: [...DEFAULT_RUNE_SELECTION],
      createdAt: newUser.createdAt
    };
    this.save();
    return newUser;
  }
  getProfile(userId) {
    return this.data.profiles[userId];
  }
  updateProfile(userId, updates) {
    if (!this.data.profiles[userId]) return void 0;
    this.data.profiles[userId] = {
      ...this.data.profiles[userId],
      ...updates
    };
    this.save();
    return this.data.profiles[userId];
  }
  recordMatch(item) {
    this.data.matchHistory.unshift(item);
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
      profile.winRate = Math.round(profile.wins / profile.totalGames * 100);
      if (item.score > profile.highestScore) {
        profile.highestScore = item.score;
      }
      const calculatedLevel = Math.max(1, Math.floor(profile.xp / 300) + 1);
      profile.level = calculatedLevel;
      if (profile.level >= 10) profile.rankTitle = "\u0110\u1EA1i Ph\xE1p S\u01B0 To\xE1n H\u1ECDc";
      else if (profile.level >= 7) profile.rankTitle = "B\u1EADc Th\u1EA7y \u1EA4n Ch\xFA";
      else if (profile.level >= 4) profile.rankTitle = "H\u1ECDc Gi\u1EA3 Ph\xE9p Thu\u1EADt";
      else profile.rankTitle = "T\u1EADp S\u1EF1 Ph\xE9p Thu\u1EADt";
    }
    this.save();
  }
  getUserMatchHistory(userId, limit = 15) {
    return this.data.matchHistory.filter((m) => m.userId === userId).slice(0, limit);
  }
  getLeaderboard(filter = "all") {
    const list = Object.values(this.data.profiles).filter((p) => p.id !== "bot-ai").sort((a, b) => {
      if (b.highestScore !== a.highestScore) {
        return b.highestScore - a.highestScore;
      }
      return b.xp - a.xp;
    }).slice(0, 50).map((p, idx) => ({
      rank: idx + 1,
      userId: p.id,
      username: p.username,
      avatar: p.avatar,
      level: p.level,
      score: p.highestScore,
      wins: p.wins,
      winRate: p.winRate
    }));
    return list;
  }
  getAllUsers() {
    return this.data.users.map(({ passwordHash, ...safe }) => safe);
  }
  addCustomQuestion(q) {
    this.data.customQuestions.push(q);
    this.save();
  }
  getCustomQuestions() {
    return this.data.customQuestions;
  }
  deleteCustomQuestion(id) {
    this.data.customQuestions = this.data.customQuestions.filter((q) => q.id !== id);
    this.save();
  }
};
var db = new DatabaseManager();

// shared/cards.ts
var MATH_DOMAINS = {
  NGUYEN_TO: {
    id: "NGUYEN_TO",
    name: "Prime Core",
    nameVi: "Nguy\xEAn T\u1ED1",
    color: "#ef4444",
    // Red / Crimson
    glow: "rgba(239, 68, 68, 0.5)",
    icon: "Flame",
    description: "B\u1EA3n nguy\xEAn c\u1EE7a to\xE1n h\u1ECDc: Ch\u1EC9 chia h\u1EBFt cho 1 v\xE0 ch\xEDnh n\xF3."
  },
  CHINH_PHUONG: {
    id: "CHINH_PHUONG",
    name: "Perfect Square",
    nameVi: "Ch\xEDnh Ph\u01B0\u01A1ng",
    color: "#f97316",
    // Orange
    glow: "rgba(249, 115, 22, 0.5)",
    icon: "Box",
    description: "S\u1EF1 c\xE2n b\u1EB1ng h\xECnh h\u1ECDc: B\xECnh ph\u01B0\u01A1ng c\u1EE7a m\u1ED9t s\u1ED1 t\u1EF1 nhi\xEAn."
  },
  DAI_SO: {
    id: "DAI_SO",
    name: "Algebra Rune",
    nameVi: "\u0110\u1EA1i S\u1ED1",
    color: "#eab308",
    // Gold
    glow: "rgba(234, 179, 8, 0.5)",
    icon: "Compass",
    description: "Gi\u1EA3i m\xE3 \u1EA9n s\u1ED1 x: C\xE2n b\u1EB1ng hai v\u1EBF ph\u01B0\u01A1ng tr\xECnh."
  },
  KHAI_CAN: {
    id: "KHAI_CAN",
    name: "Radical Root",
    nameVi: "Khai C\u0103n",
    color: "#84cc16",
    // Lime
    glow: "rgba(132, 204, 22, 0.5)",
    icon: "SquareDot",
    description: "Ngu\u1ED3n c\u1ED9i ti\u1EC1m \u1EA9n: T\xECm c\u0103n b\u1EADc hai v\xE0 c\u0103n s\u1ED1 h\u1ECDc."
  },
  LUY_THUA: {
    id: "LUY_THUA",
    name: "Exponent Bolt",
    nameVi: "L\u0169y Th\u1EEBa",
    color: "#10b981",
    // Emerald
    glow: "rgba(16, 185, 129, 0.5)",
    icon: "Zap",
    description: "N\u0103ng l\u01B0\u1EE3ng b\xF9ng n\u1ED5: T\u0103ng tr\u01B0\u1EDFng c\u1EA5p s\u1ED1 nh\xE2n theo b\u1EADc m\u0169."
  },
  AM_SO: {
    id: "AM_SO",
    name: "Negative Void",
    nameVi: "\xC2m S\u1ED1",
    color: "#06b6d4",
    // Cyan
    glow: "rgba(6, 182, 212, 0.5)",
    icon: "MinusCircle",
    description: "H\u01B0 v\xF4 \u0111\u1ED1i c\u1EF1c: S\u1ED1 \xE2m v\xE0 ph\xE9p nh\xE2n \u0111\u1ED5i d\u1EA5u huy\u1EC1n b\xED."
  },
  CHIA_HET: {
    id: "CHIA_HET",
    name: "Divisibility Ray",
    nameVi: "Chia H\u1EBFt",
    color: "#3b82f6",
    // Blue
    glow: "rgba(59, 130, 246, 0.5)",
    icon: "Divide",
    description: "D\u1EA5u hi\u1EC7u ph\xE2n t\xE1ch: Ki\u1EC3m tra chia h\u1EBFt cho 2, 3, 5, 9."
  },
  PHAN_SO: {
    id: "PHAN_SO",
    name: "Fraction Shard",
    nameVi: "Ph\xE2n S\u1ED1",
    color: "#8b5cf6",
    // Purple
    glow: "rgba(139, 92, 246, 0.5)",
    icon: "Layers",
    description: "M\u1EA3nh gh\xE9p t\u1EF7 l\u1EC7: T\u1EED s\u1ED1 tr\xEAn m\u1EABu s\u1ED1 b\u1EA5t bi\u1EBFn."
  },
  TUYET_DOI: {
    id: "TUYET_DOI",
    name: "Absolute Shield",
    nameVi: "Tuy\u1EC7t \u0110\u1ED1i",
    color: "#d946ef",
    // Fuchsia
    glow: "rgba(217, 70, 239, 0.5)",
    icon: "Shield",
    description: "Kho\u1EA3ng c\xE1ch thu\u1EA7n khi\u1EBFt: Bi\u1EBFn m\u1ECDi gi\xE1 tr\u1ECB \xE2m th\xE0nh d\u01B0\u01A1ng."
  },
  UOC_BOI: {
    id: "UOC_BOI",
    name: "Factor & Multi",
    nameVi: "\u01AF\u1EDBc & B\u1ED9i",
    color: "#ec4899",
    // Pink
    glow: "rgba(236, 72, 153, 0.5)",
    icon: "GitFork",
    description: "Giao \u0111i\u1EC3m li\xEAn k\u1EBFt: \u01AF\u1EDBc chung l\u1EDBn nh\u1EA5t v\xE0 b\u1ED9i chung nh\u1ECF nh\u1EA5t."
  },
  // Advanced categories
  DAO_HAM: {
    id: "DAO_HAM",
    name: "Derivative Flow",
    nameVi: "\u0110\u1EA1o H\xE0m",
    color: "#14b8a6",
    glow: "rgba(20, 184, 166, 0.5)",
    icon: "TrendingUp",
    description: "T\u1ED1c \u0111\u1ED9 bi\u1EBFn thi\xEAn t\u1EE9c th\u1EDDi."
  },
  TICH_PHAN: {
    id: "TICH_PHAN",
    name: "Integral Area",
    nameVi: "T\xEDch Ph\xE2n",
    color: "#6366f1",
    glow: "rgba(99, 102, 241, 0.5)",
    icon: "Activity",
    description: "T\u1ED5ng di\u1EC7n t\xEDch v\xF4 h\u1EA1n b\xE9."
  },
  LOGARIT: {
    id: "LOGARIT",
    name: "Logarithm Key",
    nameVi: "Logarit",
    color: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.5)",
    icon: "Key",
    description: "Ngh\u1ECBch \u0111\u1EA3o c\u1EE7a l\u0169y th\u1EEBa."
  },
  LUONG_GIAC: {
    id: "LUONG_GIAC",
    name: "Trig Orbit",
    nameVi: "L\u01B0\u1EE3ng Gi\xE1c",
    color: "#a855f7",
    glow: "rgba(168, 85, 247, 0.5)",
    icon: "CircleDot",
    description: "H\xE0m s\xF3ng Sin, Cos tr\xEAn \u0111\u01B0\u1EDDng tr\xF2n l\u01B0\u1EE3ng gi\xE1c."
  },
  SO_PHUC: {
    id: "SO_PHUC",
    name: "Complex Void",
    nameVi: "S\u1ED1 Ph\u1EE9c",
    color: "#0ea5e9",
    glow: "rgba(14, 165, 233, 0.5)",
    icon: "Binary",
    description: "M\u1EB7t ph\u1EB3ng ph\u1EB3ng \u1EA3o: \u0110\u01A1n v\u1ECB \u1EA3o i\xB2 = -1."
  },
  XAC_SUAT: {
    id: "XAC_SUAT",
    name: "Probability Matrix",
    nameVi: "X\xE1c Su\u1EA5t",
    color: "#10b981",
    glow: "rgba(16, 185, 129, 0.5)",
    icon: "Dice6",
    description: "D\u1EF1 b\xE1o kh\xF4ng gian m\u1EABu v\xE0 t\u1ED5 h\u1EE3p."
  }
};
var DECK_60_CARDS = [
  // 1. NGUYEN_TO (6 cards)
  {
    id: "card_nt_1",
    domainId: "NGUYEN_TO",
    domainName: "Prime Spark",
    domainNameVi: "Tia L\u1EEDa Nguy\xEAn T\u1ED1",
    pointValue: 6,
    rarity: "Common",
    skillName: "Kh\u1EDFi \u0110i\u1EC3m",
    skillDesc: "Nh\u1EADn 6 \u0111i\u1EC3m khi gi\u1EA3i \u0111\xFAng c\xE2u h\u1ECFi s\u1ED1 nguy\xEAn t\u1ED1.",
    elementColor: MATH_DOMAINS.NGUYEN_TO.color,
    accentGlow: MATH_DOMAINS.NGUYEN_TO.glow,
    iconName: "Flame"
  },
  {
    id: "card_nt_2",
    domainId: "NGUYEN_TO",
    domainName: "Prime Core",
    domainNameVi: "L\xF5i Nguy\xEAn T\u1ED1",
    pointValue: 10,
    rarity: "Common",
    skillName: "Th\u1EA5u K\xEDnh",
    skillDesc: "Cho th\xEAm +3 gi\xE2y suy ngh\u0129 cho c\xE2u h\u1ECFi k\u1EBF ti\u1EBFp.",
    elementColor: MATH_DOMAINS.NGUYEN_TO.color,
    accentGlow: MATH_DOMAINS.NGUYEN_TO.glow,
    iconName: "Flame"
  },
  {
    id: "card_nt_3",
    domainId: "NGUYEN_TO",
    domainName: "Prime Blaze",
    domainNameVi: "H\u1ECFa Nguy\xEAn T\u1ED1",
    pointValue: 14,
    rarity: "Rare",
    skillName: "Ti\xEAn \u0110o\xE1n",
    skillDesc: "Xem tr\u01B0\u1EDBc h\u1EC7 b\xE0i c\u1EE7a l\xE1 tr\xEAn \u0111\u1EC9nh b\u1ED9 b\xE0i.",
    elementColor: MATH_DOMAINS.NGUYEN_TO.color,
    accentGlow: MATH_DOMAINS.NGUYEN_TO.glow,
    iconName: "Flame"
  },
  {
    id: "card_nt_4",
    domainId: "NGUYEN_TO",
    domainName: "Prime Sentinel",
    domainNameVi: "H\u1ED9 Th\u1EA7n Nguy\xEAn T\u1ED1",
    pointValue: 18,
    rarity: "Rare",
    skillName: "B\u1EA3o V\u1EC7 L\u01B0\u1EE3t",
    skillDesc: "C\u1ED9ng +2 \u0111i\u1EC3m th\u01B0\u1EDFng cho m\u1ED7i l\xE1 b\xE0i kh\xE1c tr\xEAn b\xE0n.",
    elementColor: MATH_DOMAINS.NGUYEN_TO.color,
    accentGlow: MATH_DOMAINS.NGUYEN_TO.glow,
    iconName: "Flame"
  },
  {
    id: "card_nt_5",
    domainId: "NGUYEN_TO",
    domainName: "Prime Zenith",
    domainNameVi: "\u0110\u1EC9nh Quang Nguy\xEAn T\u1ED1",
    pointValue: 24,
    rarity: "Epic",
    skillName: "S\xE0ng Eratosthenes",
    skillDesc: "N\u1EBFu gi\u1EA3i \u0111\xFAng trong 5 gi\xE2y \u0111\u1EA7u, nh\u1EADn g\u1EA5p r\u01B0\u1EE1i (+50%) \u0111i\u1EC3m.",
    elementColor: MATH_DOMAINS.NGUYEN_TO.color,
    accentGlow: MATH_DOMAINS.NGUYEN_TO.glow,
    iconName: "Flame"
  },
  {
    id: "card_nt_6",
    domainId: "NGUYEN_TO",
    domainName: "God of Primes",
    domainNameVi: "Th\u1EA7n T\xEDch Nguy\xEAn T\u1ED1",
    pointValue: 30,
    rarity: "Legendary",
    skillName: "B\u1EA3n Nguy\xEAn V\xF4 H\u1EA1n",
    skillDesc: "C\u1ED9ng 30 \u0111i\u1EC3m v\xE0 l\xE1 n\xE0y t\u1EF1 \u0111\u1ED9ng kh\xF3a an to\xE0n kh\xF4ng b\u1ECB m\u1EA5t n\u1EBFu Bust.",
    elementColor: MATH_DOMAINS.NGUYEN_TO.color,
    accentGlow: MATH_DOMAINS.NGUYEN_TO.glow,
    iconName: "Flame"
  },
  // 2. CHINH_PHUONG (6 cards)
  {
    id: "card_cp_1",
    domainId: "CHINH_PHUONG",
    domainName: "Square Shard",
    domainNameVi: "M\u1EA3nh Ch\xEDnh Ph\u01B0\u01A1ng",
    pointValue: 6,
    rarity: "Common",
    skillName: "Vu\xF4ng V\u1EAFn",
    skillDesc: "T\xEDch l\u0169y 6 \u0111i\u1EC3m c\u01A1 b\u1EA3n.",
    elementColor: MATH_DOMAINS.CHINH_PHUONG.color,
    accentGlow: MATH_DOMAINS.CHINH_PHUONG.glow,
    iconName: "Box"
  },
  {
    id: "card_cp_2",
    domainId: "CHINH_PHUONG",
    domainName: "Square Block",
    domainNameVi: "Kh\u1ED1i Ch\xEDnh Ph\u01B0\u01A1ng",
    pointValue: 10,
    rarity: "Common",
    skillName: "B\xECnh Ph\u01B0\u01A1ng",
    skillDesc: "N\u1EBFu gi\u1EA3i \u0111\xFAng chu\u1ED7i combo >= 2, c\u1ED9ng th\xEAm 4 \u0111i\u1EC3m.",
    elementColor: MATH_DOMAINS.CHINH_PHUONG.color,
    accentGlow: MATH_DOMAINS.CHINH_PHUONG.glow,
    iconName: "Box"
  },
  {
    id: "card_cp_3",
    domainId: "CHINH_PHUONG",
    domainName: "Square Prism",
    domainNameVi: "L\u0103ng K\xEDnh Ch\xEDnh Ph\u01B0\u01A1ng",
    pointValue: 15,
    rarity: "Rare",
    skillName: "C\xE2n \u0110\u1ED1i",
    skillDesc: "Gi\xFAp chuy\u1EC3n 5 \u0111i\u1EC3m hi\u1EC7n t\u1EA1i v\xE0o kho an to\xE0n ngay l\u1EADp t\u1EE9c.",
    elementColor: MATH_DOMAINS.CHINH_PHUONG.color,
    accentGlow: MATH_DOMAINS.CHINH_PHUONG.glow,
    iconName: "Box"
  },
  {
    id: "card_cp_4",
    domainId: "CHINH_PHUONG",
    domainName: "Square Matrix",
    domainNameVi: "Ma Tr\u1EADn Ch\xEDnh Ph\u01B0\u01A1ng",
    pointValue: 20,
    rarity: "Rare",
    skillName: "T\xEDch L\u0169y B\u1ED9i Ph\u1EA7n",
    skillDesc: "C\u1ED9ng th\xEAm +5 \u0111i\u1EC3m n\u1EBFu t\u1ED5ng s\u1ED1 l\xE1 tr\xEAn b\xE0n l\xE0 s\u1ED1 ch\u1EB5n.",
    elementColor: MATH_DOMAINS.CHINH_PHUONG.color,
    accentGlow: MATH_DOMAINS.CHINH_PHUONG.glow,
    iconName: "Box"
  },
  {
    id: "card_cp_5",
    domainId: "CHINH_PHUONG",
    domainName: "Square Colossus",
    domainNameVi: "C\u1EF1 Th\u1EA1ch Ch\xEDnh Ph\u01B0\u01A1ng",
    pointValue: 25,
    rarity: "Epic",
    skillName: "C\u1ED9ng H\u01B0\u1EDFng B\xECnh Ph\u01B0\u01A1ng",
    skillDesc: "T\u0103ng x1.5 \u0111i\u1EC3m cho to\xE0n b\u1ED9 l\xE1 h\u1EC7 Ch\xEDnh Ph\u01B0\u01A1ng kh\xE1c tr\xEAn b\xE0n.",
    elementColor: MATH_DOMAINS.CHINH_PHUONG.color,
    accentGlow: MATH_DOMAINS.CHINH_PHUONG.glow,
    iconName: "Box"
  },
  {
    id: "card_cp_6",
    domainId: "CHINH_PHUONG",
    domainName: "Infinite Tessellation",
    domainNameVi: "B\u1EA3o \u0110\u1ED3 Ch\xEDnh Ph\u01B0\u01A1ng",
    pointValue: 32,
    rarity: "Legendary",
    skillName: "Ho\xE0n H\u1EA3o Tuy\u1EC7t \u0110\u1ED1i",
    skillDesc: "Nh\u1EADn 32 \u0111i\u1EC3m v\xE0 gi\u1EA3m 50% nguy c\u01A1 Bust l\xE1 k\u1EBF ti\u1EBFp.",
    elementColor: MATH_DOMAINS.CHINH_PHUONG.color,
    accentGlow: MATH_DOMAINS.CHINH_PHUONG.glow,
    iconName: "Box"
  },
  // 3. DAI_SO (6 cards)
  {
    id: "card_ds_1",
    domainId: "DAI_SO",
    domainName: "Linear Line",
    domainNameVi: "\u0110\u01B0\u1EDDng Tuy\u1EBFn T\xEDnh",
    pointValue: 7,
    rarity: "Common",
    skillName: "T\xECm \u1EA8n S\u1ED1",
    skillDesc: "T\xEDch 7 \u0111i\u1EC3m khi gi\u1EA3i \u0111\xFAng ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t.",
    elementColor: MATH_DOMAINS.DAI_SO.color,
    accentGlow: MATH_DOMAINS.DAI_SO.glow,
    iconName: "Compass"
  },
  {
    id: "card_ds_2",
    domainId: "DAI_SO",
    domainName: "Algebra Rune",
    domainNameVi: "\u1EA4n \u0110\u1EA1i S\u1ED1",
    pointValue: 12,
    rarity: "Common",
    skillName: "Chuy\u1EC3n V\u1EBF",
    skillDesc: "\u0110\u1ED5i d\u1EA5u kh\xF3 kh\u0103n: Th\xEAm 4 gi\xE2y suy ngh\u0129 cho c\xE2u h\u1ECFi.",
    elementColor: MATH_DOMAINS.DAI_SO.color,
    accentGlow: MATH_DOMAINS.DAI_SO.glow,
    iconName: "Compass"
  },
  {
    id: "card_ds_3",
    domainId: "DAI_SO",
    domainName: "Equation Weaver",
    domainNameVi: "Th\u1EE3 D\u1EC7t Ph\u01B0\u01A1ng Tr\xECnh",
    pointValue: 16,
    rarity: "Rare",
    skillName: "Kh\u1EED \u1EA8n S\u1ED1",
    skillDesc: "L\xE0m ch\u1EADm t\u1ED1c \u0111\u1ED9 tr\u1EA3 l\u1EDDi c\u1EE7a \u0111\u1ED1i th\u1EE7 l\u01B0\u1EE3t sau 3 gi\xE2y.",
    elementColor: MATH_DOMAINS.DAI_SO.color,
    accentGlow: MATH_DOMAINS.DAI_SO.glow,
    iconName: "Compass"
  },
  {
    id: "card_ds_4",
    domainId: "DAI_SO",
    domainName: "Algebraic Nexus",
    domainNameVi: "C\u1ED9i Ngu\u1ED3n \u0110\u1EA1i S\u1ED1",
    pointValue: 20,
    rarity: "Rare",
    skillName: "\u0110\u1EB3ng Th\u1EE9c V\xE0ng",
    skillDesc: "C\u1ED9ng th\xEAm +6 \u0111i\u1EC3m n\u1EBFu gi\u1EA3i \u0111\xFAng m\xE0 kh\xF4ng d\xF9ng Rune.",
    elementColor: MATH_DOMAINS.DAI_SO.color,
    accentGlow: MATH_DOMAINS.DAI_SO.glow,
    iconName: "Compass"
  },
  {
    id: "card_ds_5",
    domainId: "DAI_SO",
    domainName: "Master Equation",
    domainNameVi: "\u0110\u1EA1i Tr\u1ECDng Ph\u01B0\u01A1ng Tr\xECnh",
    pointValue: 26,
    rarity: "Epic",
    skillName: "Nghi\u1EC7m Duy Nh\u1EA5t",
    skillDesc: "Nh\u1EADn 26 \u0111i\u1EC3m v\xE0 cho ph\xE9p \u0111\u1ED5i 1 c\xE2u h\u1ECFi n\u1EBFu kh\xF4ng bi\u1EBFt l\xE0m.",
    elementColor: MATH_DOMAINS.DAI_SO.color,
    accentGlow: MATH_DOMAINS.DAI_SO.glow,
    iconName: "Compass"
  },
  {
    id: "card_ds_6",
    domainId: "DAI_SO",
    domainName: "Omni Equation",
    domainNameVi: "Ch\xE2n L\xFD \u0110\u1EA1i S\u1ED1",
    pointValue: 32,
    rarity: "Legendary",
    skillName: "V\u1EA1n V\u1EADt Quy H\u1ED3i",
    skillDesc: "32 \u0111i\u1EC3m v\xE0 nh\xE2n \u0111\xF4i \u0111i\u1EC3m cho l\xE1 b\xE0i k\u1EBF ti\u1EBFp n\u1EBFu r\xFAt ti\u1EBFp.",
    elementColor: MATH_DOMAINS.DAI_SO.color,
    accentGlow: MATH_DOMAINS.DAI_SO.glow,
    iconName: "Compass"
  },
  // 4. KHAI_CAN (6 cards)
  {
    id: "card_kc_1",
    domainId: "KHAI_CAN",
    domainName: "Root Sprout",
    domainNameVi: "M\u1EA7m Khai C\u0103n",
    pointValue: 6,
    rarity: "Common",
    skillName: "G\u1ED1c R\u1EC5",
    skillDesc: "T\xEDch 6 \u0111i\u1EC3m c\u0103n s\u1ED1 h\u1ECDc.",
    elementColor: MATH_DOMAINS.KHAI_CAN.color,
    accentGlow: MATH_DOMAINS.KHAI_CAN.glow,
    iconName: "SquareDot"
  },
  {
    id: "card_kc_2",
    domainId: "KHAI_CAN",
    domainName: "Radical Branch",
    domainNameVi: "Nh\xE1nh C\u0103n S\u1ED1",
    pointValue: 11,
    rarity: "Common",
    skillName: "Khai Tri\u1EC3n",
    skillDesc: "T\u0103ng 3 \u0111i\u1EC3m cho m\u1ED7i l\xE1 b\xE0i tr\xEAn b\xE0n c\xF3 gi\xE1 tr\u1ECB < 10.",
    elementColor: MATH_DOMAINS.KHAI_CAN.color,
    accentGlow: MATH_DOMAINS.KHAI_CAN.glow,
    iconName: "SquareDot"
  },
  {
    id: "card_kc_3",
    domainId: "KHAI_CAN",
    domainName: "Ancient Root",
    domainNameVi: "C\u1ED5 Th\u1EE5 Khai C\u0103n",
    pointValue: 15,
    rarity: "Rare",
    skillName: "\u0110\u1ED9 C\u1EE9ng G\u1ED1c C\xE2y",
    skillDesc: "Gi\u1EA3m 10 \u0111i\u1EC3m ph\u1EA1t n\u1EBFu b\u1ECB Bust \u1EDF l\u01B0\u1EE3t n\xE0y.",
    elementColor: MATH_DOMAINS.KHAI_CAN.color,
    accentGlow: MATH_DOMAINS.KHAI_CAN.glow,
    iconName: "SquareDot"
  },
  {
    id: "card_kc_4",
    domainId: "KHAI_CAN",
    domainName: "Radical Crystal",
    domainNameVi: "Tinh Th\u1EC3 Khai C\u0103n",
    pointValue: 19,
    rarity: "Rare",
    skillName: "C\u0103n Th\u1EE9c \u0110\u1ED3ng Nh\u1EA5t",
    skillDesc: "Cho ph\xE9p r\xFAt l\u1EA1i c\xE2u h\u1ECFi n\u1EBFu \u0111\u1ED9 kh\xF3 l\xE0 4 sao.",
    elementColor: MATH_DOMAINS.KHAI_CAN.color,
    accentGlow: MATH_DOMAINS.KHAI_CAN.glow,
    iconName: "SquareDot"
  },
  {
    id: "card_kc_5",
    domainId: "KHAI_CAN",
    domainName: "World Tree Root",
    domainNameVi: "\u0110\u1ECBa M\u1EA1ch Khai C\u0103n",
    pointValue: 25,
    rarity: "Epic",
    skillName: "\u0102n S\xE2u L\xF2ng \u0110\u1EA5t",
    skillDesc: "Khi Bank, nh\u1EADn th\xEAm 8 \u0111i\u1EC3m th\u01B0\u1EDFng an to\xE0n.",
    elementColor: MATH_DOMAINS.KHAI_CAN.color,
    accentGlow: MATH_DOMAINS.KHAI_CAN.glow,
    iconName: "SquareDot"
  },
  {
    id: "card_kc_6",
    domainId: "KHAI_CAN",
    domainName: "Yggdrasil Core",
    domainNameVi: "Th\u1EA7n M\u1ED9c Khai C\u0103n",
    pointValue: 30,
    rarity: "Legendary",
    skillName: "Ngu\u1ED3n C\u1ED9i S\u1EF1 S\u1ED1ng",
    skillDesc: "30 \u0111i\u1EC3m v\xE0 h\u1ED3i ph\u1EE5c 15 HP cho ng\u01B0\u1EDDi ch\u01A1i.",
    elementColor: MATH_DOMAINS.KHAI_CAN.color,
    accentGlow: MATH_DOMAINS.KHAI_CAN.glow,
    iconName: "SquareDot"
  },
  // 5. LUY_THUA (6 cards)
  {
    id: "card_lt_1",
    domainId: "LUY_THUA",
    domainName: "Power Spark",
    domainNameVi: "Tia L\u0169y Th\u1EEBa",
    pointValue: 7,
    rarity: "Common",
    skillName: "S\u1ED1 M\u0169 Nh\u1ECF",
    skillDesc: "T\xEDch 7 \u0111i\u1EC3m l\u0169y th\u1EEBa c\u01A1 b\u1EA3n.",
    elementColor: MATH_DOMAINS.LUY_THUA.color,
    accentGlow: MATH_DOMAINS.LUY_THUA.glow,
    iconName: "Zap"
  },
  {
    id: "card_lt_2",
    domainId: "LUY_THUA",
    domainName: "Exponent Surge",
    domainNameVi: "S\xF3ng L\u0169y Th\u1EEBa",
    pointValue: 12,
    rarity: "Common",
    skillName: "C\u01A1 S\u1ED1 Nh\xE2n \u0110\xF4i",
    skillDesc: "T\u0103ng th\xEAm 5 \u0111i\u1EC3m n\u1EBFu b\u1EA1n c\xF3 tr\xEAn 3 l\xE1 tr\xEAn b\xE0n.",
    elementColor: MATH_DOMAINS.LUY_THUA.color,
    accentGlow: MATH_DOMAINS.LUY_THUA.glow,
    iconName: "Zap"
  },
  {
    id: "card_lt_3",
    domainId: "LUY_THUA",
    domainName: "Storm Exponent",
    domainNameVi: "B\xE3o L\u0169y Th\u1EEBa",
    pointValue: 16,
    rarity: "Rare",
    skillName: "Tia S\xE9t S\u1ED1 M\u0169",
    skillDesc: "T\u0103ng x1.25 t\u1ED5ng \u0111i\u1EC3m c\u1EE7a c\u1EA3 l\u01B0\u1EE3t hi\u1EC7n t\u1EA1i.",
    elementColor: MATH_DOMAINS.LUY_THUA.color,
    accentGlow: MATH_DOMAINS.LUY_THUA.glow,
    iconName: "Zap"
  },
  {
    id: "card_lt_4",
    domainId: "LUY_THUA",
    domainName: "Supernova Exponent",
    domainNameVi: "Si\xEAu T\xE2n Tinh L\u0169y Th\u1EEBa",
    pointValue: 22,
    rarity: "Rare",
    skillName: "B\xF9ng N\u1ED5 B\u1EADc Cao",
    skillDesc: "C\u1ED9ng th\xEAm +8 \u0111i\u1EC3m n\u1EBFu \u0111\u1ED1i th\u1EE7 \u0111ang d\u1EABn \u0111i\u1EC3m tr\u01B0\u1EDBc.",
    elementColor: MATH_DOMAINS.LUY_THUA.color,
    accentGlow: MATH_DOMAINS.LUY_THUA.glow,
    iconName: "Zap"
  },
  {
    id: "card_lt_5",
    domainId: "LUY_THUA",
    domainName: "Overcharge Exponent",
    domainNameVi: "C\u01B0\u1EDDng H\xF3a L\u0169y Th\u1EEBa",
    pointValue: 28,
    rarity: "Epic",
    skillName: "Chu\u1ED7i Ph\u1EA3n \u1EE8ng",
    skillDesc: "N\u1EBFu ti\u1EBFp t\u1EE5c Draw th\xE0nh c\xF4ng, l\xE1 k\u1EBF ti\u1EBFp \u0111\u01B0\u1EE3c x2 \u0111i\u1EC3m.",
    elementColor: MATH_DOMAINS.LUY_THUA.color,
    accentGlow: MATH_DOMAINS.LUY_THUA.glow,
    iconName: "Zap"
  },
  {
    id: "card_lt_6",
    domainId: "LUY_THUA",
    domainName: "Titan of Exponents",
    domainNameVi: "Th\u1EA7n L\xF4i L\u0169y Th\u1EEBa",
    pointValue: 34,
    rarity: "Legendary",
    skillName: "V\xF4 C\u1EF1c B\xF9ng Ch\xE1y",
    skillDesc: "34 \u0111i\u1EC3m kh\u1ED5ng l\u1ED3 \u0111\u01B0a b\u1EA1n ti\u1EBFn g\u1EA7n \u0111\u1EBFn chi\u1EBFn th\u1EAFng.",
    elementColor: MATH_DOMAINS.LUY_THUA.color,
    accentGlow: MATH_DOMAINS.LUY_THUA.glow,
    iconName: "Zap"
  },
  // 6. AM_SO (6 cards)
  {
    id: "card_as_1",
    domainId: "AM_SO",
    domainName: "Negative Mote",
    domainNameVi: "B\u1EE5i \xC2m S\u1ED1",
    pointValue: 6,
    rarity: "Common",
    skillName: "D\u1EA5u Tr\u1EEB Nh\u1ECF",
    skillDesc: "T\xEDch 6 \u0111i\u1EC3m quy \u01B0\u1EDBc \xE2m.",
    elementColor: MATH_DOMAINS.AM_SO.color,
    accentGlow: MATH_DOMAINS.AM_SO.glow,
    iconName: "MinusCircle"
  },
  {
    id: "card_as_2",
    domainId: "AM_SO",
    domainName: "Negative Veil",
    domainNameVi: "M\xE0n \u0110\xEAm \xC2m S\u1ED1",
    pointValue: 11,
    rarity: "Common",
    skillName: "\u0110\u1ED5i D\u1EA5u Ngh\u1ECBch \u0110\u1EA3o",
    skillDesc: "C\u1ED9ng th\xEAm +4 \u0111i\u1EC3m khi gi\u1EA3i \u0111\xFAng ph\xE9p nh\xE2n 2 s\u1ED1 \xE2m.",
    elementColor: MATH_DOMAINS.AM_SO.color,
    accentGlow: MATH_DOMAINS.AM_SO.glow,
    iconName: "MinusCircle"
  },
  {
    id: "card_as_3",
    domainId: "AM_SO",
    domainName: "Frost Negative",
    domainNameVi: "B\u0103ng Gi\xE1 \xC2m S\u1ED1",
    pointValue: 15,
    rarity: "Rare",
    skillName: "\u0110\u1ED9 \xC2m Tuy\u1EC7t \u0110\u1ED1i",
    skillDesc: "\u0110\xF3ng b\u0103ng 1 l\xE1 tr\xEAn b\xE0n, b\u1EA3o v\u1EC7 kh\u1ECFi nguy c\u01A1 bust.",
    elementColor: MATH_DOMAINS.AM_SO.color,
    accentGlow: MATH_DOMAINS.AM_SO.glow,
    iconName: "MinusCircle"
  },
  {
    id: "card_as_4",
    domainId: "AM_SO",
    domainName: "Shadow Negative",
    domainNameVi: "B\xF3ng T\u1ED1i \xC2m S\u1ED1",
    pointValue: 20,
    rarity: "Rare",
    skillName: "Ph\u1EA3n \u0110\xF2n Tr\u1EE5c S\u1ED1",
    skillDesc: "Tr\u1EEB 5 \u0111i\u1EC3m an to\xE0n c\u1EE7a \u0111\u1ED1i th\u1EE7 v\xE0 c\u1ED9ng v\xE0o l\u01B0\u1EE3t c\u1EE7a b\u1EA1n.",
    elementColor: MATH_DOMAINS.AM_SO.color,
    accentGlow: MATH_DOMAINS.AM_SO.glow,
    iconName: "MinusCircle"
  },
  {
    id: "card_as_5",
    domainId: "AM_SO",
    domainName: "Abyssal Negative",
    domainNameVi: "V\u1EF1c Th\u1EB3m \xC2m S\u1ED1",
    pointValue: 26,
    rarity: "Epic",
    skillName: "\xC2m Nh\xE2n \xC2m H\xF3a D\u01B0\u01A1ng",
    skillDesc: "Bi\u1EBFn to\xE0n b\u1ED9 \u0111i\u1EC3m tr\u1EEB ho\u1EB7c r\u1EE7i ro th\xE0nh \u0111i\u1EC3m d\u01B0\u01A1ng (+26).",
    elementColor: MATH_DOMAINS.AM_SO.color,
    accentGlow: MATH_DOMAINS.AM_SO.glow,
    iconName: "MinusCircle"
  },
  {
    id: "card_as_6",
    domainId: "AM_SO",
    domainName: "Lord of Negative",
    domainNameVi: "B\xE1 Ch\u1EE7 \xC2m S\u1ED1",
    pointValue: 31,
    rarity: "Legendary",
    skillName: "\u0110\u1EA3o Chi\u1EC1u C\xE0n Kh\xF4n",
    skillDesc: "31 \u0111i\u1EC3m v\xE0 \xE9p \u0111\u1ED1i th\u1EE7 ph\u1EA3i ch\u1ECBu \u0111\u1ED9 kh\xF3 cao h\u01A1n l\u01B0\u1EE3t t\u1EDBi.",
    elementColor: MATH_DOMAINS.AM_SO.color,
    accentGlow: MATH_DOMAINS.AM_SO.glow,
    iconName: "MinusCircle"
  },
  // 7. CHIA_HET (6 cards)
  {
    id: "card_ch_1",
    domainId: "CHIA_HET",
    domainName: "Divisible Ray",
    domainNameVi: "Tia Chia H\u1EBFt",
    pointValue: 6,
    rarity: "Common",
    skillName: "D\u1EA5u Hi\u1EC7u C\u01A1 B\u1EA3n",
    skillDesc: "T\xEDch 6 \u0111i\u1EC3m quy t\u1EAFc chia h\u1EBFt.",
    elementColor: MATH_DOMAINS.CHIA_HET.color,
    accentGlow: MATH_DOMAINS.CHIA_HET.glow,
    iconName: "Divide"
  },
  {
    id: "card_ch_2",
    domainId: "CHIA_HET",
    domainName: "Harmonic Divisor",
    domainNameVi: "Gia T\u1ED1c Ph\xE9p Chia",
    pointValue: 11,
    rarity: "Common",
    skillName: "Quy T\u1EAFc S\u1ED1 3 & 9",
    skillDesc: "C\u1ED9ng th\xEAm 4 \u0111i\u1EC3m n\u1EBFu t\u1ED5ng \u0111i\u1EC3m c\xE1c l\xE1 tr\xEAn b\xE0n chia h\u1EBFt cho 3.",
    elementColor: MATH_DOMAINS.CHIA_HET.color,
    accentGlow: MATH_DOMAINS.CHIA_HET.glow,
    iconName: "Divide"
  },
  {
    id: "card_ch_3",
    domainId: "CHIA_HET",
    domainName: "Prism Divisor",
    domainNameVi: "L\u0103ng K\xEDnh Chia H\u1EBFt",
    pointValue: 15,
    rarity: "Rare",
    skillName: "Chia \u0110\u1EC1u R\u1EE7i Ro",
    skillDesc: "N\u1EBFu Bust, gi\u1EEF l\u1EA1i \u0111\u01B0\u1EE3c 30% \u0111i\u1EC3m l\u01B0\u1EE3t thay v\xEC m\u1EA5t tr\u1EAFng.",
    elementColor: MATH_DOMAINS.CHIA_HET.color,
    accentGlow: MATH_DOMAINS.CHIA_HET.glow,
    iconName: "Divide"
  },
  {
    id: "card_ch_4",
    domainId: "CHIA_HET",
    domainName: "Crystal Divisor",
    domainNameVi: "B\u1EA3o Th\u1EA1ch Chia H\u1EBFt",
    pointValue: 21,
    rarity: "Rare",
    skillName: "Ph\u1EA7n D\u01B0 B\u1EB1ng Kh\xF4ng",
    skillDesc: "T\u1EB7ng th\xEAm 6 \u0111i\u1EC3m th\u01B0\u1EDFng khi gi\u1EA3i \u0111\xFAng trong 7 gi\xE2y.",
    elementColor: MATH_DOMAINS.CHIA_HET.color,
    accentGlow: MATH_DOMAINS.CHIA_HET.glow,
    iconName: "Divide"
  },
  {
    id: "card_ch_5",
    domainId: "CHIA_HET",
    domainName: "Grand Divisor",
    domainNameVi: "\u0110\u1EA1i Tr\xED Ph\xE9p Chia",
    pointValue: 27,
    rarity: "Epic",
    skillName: "Ho\xE0n H\u1EA3o Chia C\u1EAFt",
    skillDesc: "Cho ph\xE9p r\xFAt th\xEAm 1 l\xE1 m\xE0 \u0111\u01B0\u1EE3c xem tr\u01B0\u1EDBc c\u1EA3 2 l\xE1 k\u1EBF ti\u1EBFp.",
    elementColor: MATH_DOMAINS.CHIA_HET.color,
    accentGlow: MATH_DOMAINS.CHIA_HET.glow,
    iconName: "Divide"
  },
  {
    id: "card_ch_6",
    domainId: "CHIA_HET",
    domainName: "Sovereign of Divisors",
    domainNameVi: "Th\u1EA7n Minh Chia H\u1EBFt",
    pointValue: 33,
    rarity: "Legendary",
    skillName: "Ch\xE2n Th\u1EE9c Ph\xE2n \u0110\u1ECBnh",
    skillDesc: "Nh\u1EADn 33 \u0111i\u1EC3m v\xE0 c\u1ED9ng 10 \u0111i\u1EC3m an to\xE0n cho m\u1ED7i 3 l\xE1 tr\xEAn b\xE0n.",
    elementColor: MATH_DOMAINS.CHIA_HET.color,
    accentGlow: MATH_DOMAINS.CHIA_HET.glow,
    iconName: "Divide"
  },
  // 8. PHAN_SO (6 cards)
  {
    id: "card_ps_1",
    domainId: "PHAN_SO",
    domainName: "Fraction Pebble",
    domainNameVi: "M\u1EA3nh Ph\xE2n S\u1ED1",
    pointValue: 7,
    rarity: "Common",
    skillName: "T\u1EED & M\u1EABu",
    skillDesc: "T\xEDch 7 \u0111i\u1EC3m ph\xE2n s\u1ED1 c\u01A1 b\u1EA3n.",
    elementColor: MATH_DOMAINS.PHAN_SO.color,
    accentGlow: MATH_DOMAINS.PHAN_SO.glow,
    iconName: "Layers"
  },
  {
    id: "card_ps_2",
    domainId: "PHAN_SO",
    domainName: "Fraction Ratio",
    domainNameVi: "T\u1EC9 L\u1EC7 Ph\xE2n S\u1ED1",
    pointValue: 12,
    rarity: "Common",
    skillName: "R\xFAt G\u1ECDn T\u1ED1i Gi\u1EA3n",
    skillDesc: "T\u1ED1i \u01B0u h\xF3a \u0111i\u1EC3m: C\u1ED9ng th\xEAm 5 \u0111i\u1EC3m th\u01B0\u1EDFng.",
    elementColor: MATH_DOMAINS.PHAN_SO.color,
    accentGlow: MATH_DOMAINS.PHAN_SO.glow,
    iconName: "Layers"
  },
  {
    id: "card_ps_3",
    domainId: "PHAN_SO",
    domainName: "Harmonic Fraction",
    domainNameVi: "\u0110i\u1EC1u H\xF2a Ph\xE2n S\u1ED1",
    pointValue: 16,
    rarity: "Rare",
    skillName: "Quy \u0110\u1ED3ng M\u1EABu S\u1ED1",
    skillDesc: "\u0110\u1ED3ng b\u1ED9 \u0111i\u1EC3m: Chuy\u1EC3n 8 \u0111i\u1EC3m v\xE0o kho an to\xE0n ngay l\u1EADp t\u1EE9c.",
    elementColor: MATH_DOMAINS.PHAN_SO.color,
    accentGlow: MATH_DOMAINS.PHAN_SO.glow,
    iconName: "Layers"
  },
  {
    id: "card_ps_4",
    domainId: "PHAN_SO",
    domainName: "Golden Ratio",
    domainNameVi: "T\u1EC9 L\u1EC7 V\xE0ng Ph\xE2n S\u1ED1",
    pointValue: 22,
    rarity: "Rare",
    skillName: "T\u1EF7 L\u1EC7 Ho\xE0n M\u1EF9",
    skillDesc: "T\u0103ng 25% \u0111i\u1EC3m cho to\xE0n b\u1ED9 l\u01B0\u1EE3t n\u1EBFu gi\u1EA3i \u0111\xFAng c\xE2u ph\xE2n s\u1ED1.",
    elementColor: MATH_DOMAINS.PHAN_SO.color,
    accentGlow: MATH_DOMAINS.PHAN_SO.glow,
    iconName: "Layers"
  },
  {
    id: "card_ps_5",
    domainId: "PHAN_SO",
    domainName: "Fractional Aegis",
    domainNameVi: "Khi\xEAn Ph\xE2n S\u1ED1",
    pointValue: 27,
    rarity: "Epic",
    skillName: "B\u1EE9c T\u01B0\u1EDDng Ph\xE2n Th\xE2n",
    skillDesc: "L\xE1 n\xE0y t\u1EA1o 1 khi\xEAn ch\u1EB7n Bust cho l\u1EA7n r\xFAt ti\u1EBFp theo.",
    elementColor: MATH_DOMAINS.PHAN_SO.color,
    accentGlow: MATH_DOMAINS.PHAN_SO.glow,
    iconName: "Layers"
  },
  {
    id: "card_ps_6",
    domainId: "PHAN_SO",
    domainName: "Archmage of Fractions",
    domainNameVi: "Ph\xE1p Ho\xE0ng Ph\xE2n S\u1ED1",
    pointValue: 33,
    rarity: "Legendary",
    skillName: "V\xF4 H\u1EA1n Ph\xE2n T\xE1ch",
    skillDesc: "33 \u0111i\u1EC3m v\xE0 h\u1ED3i sinh 10 HP cho b\u1EA1n.",
    elementColor: MATH_DOMAINS.PHAN_SO.color,
    accentGlow: MATH_DOMAINS.PHAN_SO.glow,
    iconName: "Layers"
  },
  // 9. TUYET_DOI (6 cards)
  {
    id: "card_td_1",
    domainId: "TUYET_DOI",
    domainName: "Absolute Spark",
    domainNameVi: "Tia Tr\u1ECB Tuy\u1EC7t \u0110\u1ED1i",
    pointValue: 6,
    rarity: "Common",
    skillName: "Kho\u1EA3ng C\xE1ch",
    skillDesc: "T\xEDch 6 \u0111i\u1EC3m kho\u1EA3ng c\xE1ch thu\u1EA7n t\xFAy.",
    elementColor: MATH_DOMAINS.TUYET_DOI.color,
    accentGlow: MATH_DOMAINS.TUYET_DOI.glow,
    iconName: "Shield"
  },
  {
    id: "card_td_2",
    domainId: "TUYET_DOI",
    domainName: "Absolute Barrier",
    domainNameVi: "H\xE0o Quang Tuy\u1EC7t \u0110\u1ED1i",
    pointValue: 11,
    rarity: "Common",
    skillName: "Lu\xF4n D\u01B0\u01A1ng",
    skillDesc: "M\u1ECDi \u0111i\u1EC3m s\u1ED1 trong l\u01B0\u1EE3t n\xE0y \u0111\u01B0\u1EE3c \u0111\u1EA3m b\u1EA3o kh\xF4ng th\u1EC3 \xE2m.",
    elementColor: MATH_DOMAINS.TUYET_DOI.color,
    accentGlow: MATH_DOMAINS.TUYET_DOI.glow,
    iconName: "Shield"
  },
  {
    id: "card_td_3",
    domainId: "TUYET_DOI",
    domainName: "Absolute Ward",
    domainNameVi: "H\u1ED9 Gi\u1EDBi Tuy\u1EC7t \u0110\u1ED1i",
    pointValue: 16,
    rarity: "Rare",
    skillName: "B\u1EA5t Bi\u1EBFn",
    skillDesc: "Kh\xF4ng b\u1ECB \u1EA3nh h\u01B0\u1EDFng b\u1EDFi k\u1EF9 n\u0103ng gi\u1EA3m th\u1EDDi gian t\u1EEB \u0111\u1ED1i th\u1EE7.",
    elementColor: MATH_DOMAINS.TUYET_DOI.color,
    accentGlow: MATH_DOMAINS.TUYET_DOI.glow,
    iconName: "Shield"
  },
  {
    id: "card_td_4",
    domainId: "TUYET_DOI",
    domainName: "Absolute Mirror",
    domainNameVi: "G\u01B0\u01A1ng Ph\u1EA3n Tuy\u1EC7t \u0110\u1ED1i",
    pointValue: 21,
    rarity: "Rare",
    skillName: "Ph\u1EA3n Chi\u1EBFu Kho\u1EA3ng C\xE1ch",
    skillDesc: "Nh\u1EADn 21 \u0111i\u1EC3m v\xE0 sao ch\xE9p 5 \u0111i\u1EC3m t\u1EEB kho \u0111\u1ED1i th\u1EE7.",
    elementColor: MATH_DOMAINS.TUYET_DOI.color,
    accentGlow: MATH_DOMAINS.TUYET_DOI.glow,
    iconName: "Shield"
  },
  {
    id: "card_td_5",
    domainId: "TUYET_DOI",
    domainName: "Absolute Bastion",
    domainNameVi: "Ph\xE1o \u0110\xE0i Tuy\u1EC7t \u0110\u1ED1i",
    pointValue: 27,
    rarity: "Epic",
    skillName: "Khi\xEAn B\u1EA5t Ho\u1EA1i",
    skillDesc: "N\u1EBFu b\u1ECB Bust, l\u1EADp t\u1EE9c gi\u1EEF l\u1EA1i 50% \u0111i\u1EC3m thay v\xEC 0.",
    elementColor: MATH_DOMAINS.TUYET_DOI.color,
    accentGlow: MATH_DOMAINS.TUYET_DOI.glow,
    iconName: "Shield"
  },
  {
    id: "card_td_6",
    domainId: "TUYET_DOI",
    domainName: "Avatar of Absoluteness",
    domainNameVi: "Th\u1EA7n T\u01B0\u1EE3ng Tuy\u1EC7t \u0110\u1ED1i",
    pointValue: 32,
    rarity: "Legendary",
    skillName: "Ch\xE2n Kh\xF4ng Tuy\u1EC7t \u0110\u1ED1i",
    skillDesc: "32 \u0111i\u1EC3m v\xE0 b\u1EA3o \u0111\u1EA3m 100% l\xE1 ti\u1EBFp theo kh\xF4ng Bust.",
    elementColor: MATH_DOMAINS.TUYET_DOI.color,
    accentGlow: MATH_DOMAINS.TUYET_DOI.glow,
    iconName: "Shield"
  },
  // 10. UOC_BOI (6 cards)
  {
    id: "card_ub_1",
    domainId: "UOC_BOI",
    domainName: "Factor Seed",
    domainNameVi: "M\u1EA7m \u01AF\u1EDBc B\u1ED9i",
    pointValue: 7,
    rarity: "Common",
    skillName: "\u01AF\u1EDBc S\u1ED1",
    skillDesc: "T\xEDch 7 \u0111i\u1EC3m \u01B0\u1EDBc chung.",
    elementColor: MATH_DOMAINS.UOC_BOI.color,
    accentGlow: MATH_DOMAINS.UOC_BOI.glow,
    iconName: "GitFork"
  },
  {
    id: "card_ub_2",
    domainId: "UOC_BOI",
    domainName: "Common Multiplier",
    domainNameVi: "B\u1ED9i Chung Li\xEAn K\u1EBFt",
    pointValue: 12,
    rarity: "Common",
    skillName: "BCNN",
    skillDesc: "C\u1ED9ng th\xEAm +4 \u0111i\u1EC3m cho m\u1ED7i l\xE1 kh\xE1c h\u1EC7 \u0111ang c\xF3 tr\xEAn b\xE0n.",
    elementColor: MATH_DOMAINS.UOC_BOI.color,
    accentGlow: MATH_DOMAINS.UOC_BOI.glow,
    iconName: "GitFork"
  },
  {
    id: "card_ub_3",
    domainId: "UOC_BOI",
    domainName: "Greatest Factor",
    domainNameVi: "\u01AF\u1EDBc Chung L\u1EDBn Nh\u1EA5t",
    pointValue: 17,
    rarity: "Rare",
    skillName: "UCLN T\u1ED1i \u0110a",
    skillDesc: "Cho th\xEAm +5 gi\xE2y suy ngh\u0129 v\xE0 r\xFAt g\u1ECDn \u0111\u1ED9 kh\xF3 c\xE2u h\u1ECFi.",
    elementColor: MATH_DOMAINS.UOC_BOI.color,
    accentGlow: MATH_DOMAINS.UOC_BOI.glow,
    iconName: "GitFork"
  },
  {
    id: "card_ub_4",
    domainId: "UOC_BOI",
    domainName: "Multiplicity Core",
    domainNameVi: "L\xF5i B\u1ED9i S\u1ED1",
    pointValue: 22,
    rarity: "Rare",
    skillName: "C\u1ED9ng H\u01B0\u1EDFng B\u1ED9i S\u1ED1",
    skillDesc: "T\u0103ng th\xEAm 8 \u0111i\u1EC3m n\u1EBFu tr\xEAn b\xE0n c\xF3 t\u1EEB 3 l\xE1 tr\u1EDF l\xEAn.",
    elementColor: MATH_DOMAINS.UOC_BOI.color,
    accentGlow: MATH_DOMAINS.UOC_BOI.glow,
    iconName: "GitFork"
  },
  {
    id: "card_ub_5",
    domainId: "UOC_BOI",
    domainName: "Tide of Factors",
    domainNameVi: "Tri\u1EC1u D\xE2ng \u01AF\u1EDBc B\u1ED9i",
    pointValue: 28,
    rarity: "Epic",
    skillName: "Li\xEAn K\u1EBFt V\xF4 T\u1EADn",
    skillDesc: "T\u1EF1 \u0111\u1ED9ng Bank \u0111i\u1EC3m an to\xE0n n\u1EBFu t\u1ED5ng \u0111i\u1EC3m l\u01B0\u1EE3t v\u01B0\u1EE3t qua 40.",
    elementColor: MATH_DOMAINS.UOC_BOI.color,
    accentGlow: MATH_DOMAINS.UOC_BOI.glow,
    iconName: "GitFork"
  },
  {
    id: "card_ub_6",
    domainId: "UOC_BOI",
    domainName: "Ancient Harmonizer",
    domainNameVi: "H\xF2a H\u1EE3p Gi\u1EDBi \u01AF\u1EDBc B\u1ED9i",
    pointValue: 34,
    rarity: "Legendary",
    skillName: "Giao Thoa Th\u1EA7n Gi\u1EDBi",
    skillDesc: "34 \u0111i\u1EC3m th\u1EA7n tho\u1EA1i v\xE0 t\u0103ng th\xEAm 1 l\u1EA7n d\xF9ng cho 1 Rune \u0111\xE3 ch\u1ECDn.",
    elementColor: MATH_DOMAINS.UOC_BOI.color,
    accentGlow: MATH_DOMAINS.UOC_BOI.glow,
    iconName: "GitFork"
  }
];

// server/questions/questionBank.ts
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}
var CURATED_QUESTIONS = [
  // ==========================================
  // NGUYEN_TO (Số nguyên tố)
  // ==========================================
  {
    id: "NT_CB_01",
    question: "S\u1ED1 nguy\xEAn t\u1ED1 ch\u1EB5n duy nh\u1EA5t trong to\xE1n h\u1ECDc l\xE0 s\u1ED1 n\xE0o?",
    formula: "p \\in \\mathbb{P}, \\; p \\; \\text{ch\u1EB5n}",
    options: ["2", "4", "6", "0"],
    answer: "2",
    explanation: "S\u1ED1 2 l\xE0 s\u1ED1 nguy\xEAn t\u1ED1 ch\u1EB5n duy nh\u1EA5t v\xEC c\xE1c s\u1ED1 ch\u1EB5n l\u1EDBn h\u01A1n 2 \u0111\u1EC1u chia h\u1EBFt cho 2 (h\u1EE3p s\u1ED1).",
    timeLimit: 50,
    difficulty: 1,
    category: "NGUYEN_TO",
    level: "CO_BAN"
  },
  {
    id: "NT_CB_02",
    question: "S\u1ED1 n\xE0o sau \u0111\xE2y l\xE0 s\u1ED1 nguy\xEAn t\u1ED1?",
    formula: "n \\in \\mathbb{P}",
    options: ["4", "6", "7", "9"],
    answer: "7",
    explanation: "S\u1ED1 7 ch\u1EC9 c\xF3 \u0111\xFAng 2 \u01B0\u1EDBc l\xE0 1 v\xE0 ch\xEDnh n\xF3. C\xF2n 4=2\xD72, 6=2\xD73, 9=3\xD73 l\xE0 c\xE1c h\u1EE3p s\u1ED1.",
    timeLimit: 50,
    difficulty: 1,
    category: "NGUYEN_TO",
    level: "CO_BAN"
  },
  {
    id: "NT_CB_03",
    question: "S\u1ED1 1 c\xF3 ph\u1EA3i l\xE0 s\u1ED1 nguy\xEAn t\u1ED1 kh\xF4ng?",
    formula: "1 \\in \\mathbb{P} \\; ?",
    options: ["Kh\xF4ng", "C\xF3", "T\xF9y tr\u01B0\u1EDDng h\u1EE3p", "Kh\xF4ng x\xE1c \u0111\u1ECBnh"],
    answer: "Kh\xF4ng",
    explanation: "S\u1ED1 nguy\xEAn t\u1ED1 l\xE0 s\u1ED1 t\u1EF1 nhi\xEAn l\u1EDBn h\u01A1n 1 v\xE0 ch\u1EC9 c\xF3 hai \u01B0\u1EDBc d\u01B0\u01A1ng ph\xE2n bi\u1EC7t (1 v\xE0 ch\xEDnh n\xF3). Do \u0111\xF3 s\u1ED1 1 kh\xF4ng ph\u1EA3i l\xE0 s\u1ED1 nguy\xEAn t\u1ED1.",
    timeLimit: 50,
    difficulty: 1,
    category: "NGUYEN_TO",
    level: "CO_BAN"
  },
  {
    id: "NT_CB_04",
    question: "T\u1ED5ng c\u1EE7a hai s\u1ED1 nguy\xEAn t\u1ED1 \u0111\u1EA7u ti\xEAn (2 + 3) b\u1EB1ng bao nhi\xEAu?",
    formula: "2 + 3 = ?",
    options: ["4", "5", "6", "7"],
    answer: "5",
    explanation: "Hai s\u1ED1 nguy\xEAn t\u1ED1 \u0111\u1EA7u ti\xEAn l\xE0 2 v\xE0 3. T\u1ED5ng 2 + 3 = 5 (c\u0169ng l\xE0 m\u1ED9t s\u1ED1 nguy\xEAn t\u1ED1!).",
    timeLimit: 50,
    difficulty: 1,
    category: "NGUYEN_TO",
    level: "CO_BAN"
  },
  {
    id: "NT_CB_05",
    question: "Trong c\xE1c s\u1ED1 sau, s\u1ED1 n\xE0o l\xE0 s\u1ED1 nguy\xEAn t\u1ED1?",
    formula: "n \\in \\mathbb{P} \\; (10 < n < 20)",
    options: ["11", "12", "14", "15"],
    answer: "11",
    explanation: "11 ch\u1EC9 chia h\u1EBFt cho 1 v\xE0 11. C\xE1c s\u1ED1 12, 14, 15 \u0111\u1EC1u chia h\u1EBFt cho c\xE1c \u01B0\u1EDBc kh\xE1c.",
    timeLimit: 50,
    difficulty: 1,
    category: "NGUYEN_TO",
    level: "CO_BAN"
  },
  // ==========================================
  // CHINH_PHUONG (Số chính phương)
  // ==========================================
  {
    id: "CP_CB_01",
    question: "Gi\xE1 tr\u1ECB c\u1EE7a 5\xB2 (5 nh\xE2n 5) b\u1EB1ng bao nhi\xEAu?",
    formula: "5^2 = 5 \\times 5 = ?",
    options: ["10", "20", "25", "30"],
    answer: "25",
    explanation: "5 b\xECnh ph\u01B0\u01A1ng l\xE0 5 \xD7 5 = 25.",
    timeLimit: 50,
    difficulty: 1,
    category: "CHINH_PHUONG",
    level: "CO_BAN"
  },
  {
    id: "CP_CB_02",
    question: "C\u0103n b\u1EADc hai c\u1EE7a 36 (\u221A36) b\u1EB1ng bao nhi\xEAu?",
    formula: "\\sqrt{36} = ?",
    options: ["4", "5", "6", "8"],
    answer: "6",
    explanation: "V\xEC 6\xB2 = 36 n\xEAn c\u0103n b\u1EADc hai s\u1ED1 h\u1ECDc c\u1EE7a 36 l\xE0 6.",
    timeLimit: 50,
    difficulty: 1,
    category: "CHINH_PHUONG",
    level: "CO_BAN"
  },
  {
    id: "CP_CB_03",
    question: "S\u1ED1 n\xE0o sau \u0111\xE2y l\xE0 m\u1ED9t s\u1ED1 ch\xEDnh ph\u01B0\u01A1ng?",
    formula: "k^2 \\in \\{12, 14, 16, 18\\}",
    options: ["12", "14", "16", "18"],
    answer: "16",
    explanation: "16 = 4\xB2 = 4 \xD7 4. C\xE1c s\u1ED1 c\xF2n l\u1EA1i kh\xF4ng ph\u1EA3i l\xE0 b\xECnh ph\u01B0\u01A1ng c\u1EE7a s\u1ED1 nguy\xEAn n\xE0o.",
    timeLimit: 50,
    difficulty: 1,
    category: "CHINH_PHUONG",
    level: "CO_BAN"
  },
  {
    id: "CP_CB_04",
    question: "Gi\xE1 tr\u1ECB c\u1EE7a 10\xB2 b\u1EB1ng bao nhi\xEAu?",
    formula: "10^2 = ?",
    options: ["20", "50", "100", "1000"],
    answer: "100",
    explanation: "10\xB2 = 10 \xD7 10 = 100.",
    timeLimit: 50,
    difficulty: 1,
    category: "CHINH_PHUONG",
    level: "CO_BAN"
  },
  {
    id: "CP_CB_05",
    question: "S\u1ED1 ch\xEDnh ph\u01B0\u01A1ng li\u1EC1n sau c\u1EE7a 9 (3\xB2) l\xE0 s\u1ED1 n\xE0o?",
    formula: "3^2 = 9 \\implies 4^2 = ?",
    options: ["12", "15", "16", "25"],
    answer: "16",
    explanation: "S\u1ED1 ch\xEDnh ph\u01B0\u01A1ng li\u1EC1n sau 3\xB2 l\xE0 4\xB2 = 16.",
    timeLimit: 50,
    difficulty: 1,
    category: "CHINH_PHUONG",
    level: "CO_BAN"
  },
  // ==========================================
  // DAI_SO (Đại số & Tìm x đơn giản)
  // ==========================================
  {
    id: "DS_CB_01",
    question: "T\xECm x bi\u1EBFt: x + 12 = 30",
    formula: "x + 12 = 30 \\implies x = ?",
    options: ["16", "18", "20", "22"],
    answer: "18",
    explanation: "x = 30 - 12 = 18.",
    timeLimit: 50,
    difficulty: 1,
    category: "DAI_SO",
    level: "CO_BAN"
  },
  {
    id: "DS_CB_02",
    question: "T\xECm x bi\u1EBFt: 3 \xD7 x = 21",
    formula: "3x = 21 \\implies x = ?",
    options: ["6", "7", "8", "9"],
    answer: "7",
    explanation: "x = 21 / 3 = 7.",
    timeLimit: 50,
    difficulty: 1,
    category: "DAI_SO",
    level: "CO_BAN"
  },
  {
    id: "DS_CB_03",
    question: "T\xECm x bi\u1EBFt: x - 9 = 15",
    formula: "x - 9 = 15 \\implies x = ?",
    options: ["22", "24", "26", "28"],
    answer: "24",
    explanation: "x = 15 + 9 = 24.",
    timeLimit: 50,
    difficulty: 1,
    category: "DAI_SO",
    level: "CO_BAN"
  },
  {
    id: "DS_CB_04",
    question: "M\u1ED9t chi\u1EBFc b\xFAt gi\xE1 5 ng\xE0n \u0111\u1ED3ng. Mua 4 chi\u1EBFc b\xFAt h\u1EBFt bao nhi\xEAu ti\u1EC1n?",
    formula: "5 \\times 4 = ?",
    options: ["15", "20", "25", "30"],
    answer: "20",
    explanation: "Gi\xE1 ti\u1EC1n = 5 \xD7 4 = 20 ng\xE0n \u0111\u1ED3ng.",
    timeLimit: 50,
    difficulty: 1,
    category: "DAI_SO",
    level: "CO_BAN"
  },
  {
    id: "DS_CB_05",
    question: "T\xECm x bi\u1EBFt: 2x + 4 = 14",
    formula: "2x + 4 = 14 \\implies 2x = 10 \\implies x = ?",
    options: ["4", "5", "6", "7"],
    answer: "5",
    explanation: "2x = 14 - 4 = 10 => x = 10 / 2 = 5.",
    timeLimit: 50,
    difficulty: 1,
    category: "DAI_SO",
    level: "CO_BAN"
  },
  // ==========================================
  // KHAI_CAN (Khai căn & Căn bậc hai)
  // ==========================================
  {
    id: "KC_CB_01",
    question: "T\xEDnh gi\xE1 tr\u1ECB c\u1EE7a \u221A49",
    formula: "\\sqrt{49} = ?",
    options: ["6", "7", "8", "9"],
    answer: "7",
    explanation: "V\xEC 7\xB2 = 49 n\xEAn \u221A49 = 7.",
    timeLimit: 50,
    difficulty: 1,
    category: "KHAI_CAN",
    level: "CO_BAN"
  },
  {
    id: "KC_CB_02",
    question: "T\xEDnh gi\xE1 tr\u1ECB c\u1EE7a \u221A81",
    formula: "\\sqrt{81} = ?",
    options: ["7", "8", "9", "10"],
    answer: "9",
    explanation: "V\xEC 9\xB2 = 81 n\xEAn \u221A81 = 9.",
    timeLimit: 50,
    difficulty: 1,
    category: "KHAI_CAN",
    level: "CO_BAN"
  },
  {
    id: "KC_CB_03",
    question: "T\xEDnh nhanh: \u221A100 - \u221A16",
    formula: "\\sqrt{100} - \\sqrt{16} = 10 - 4 = ?",
    options: ["4", "6", "8", "10"],
    answer: "6",
    explanation: "\u221A100 = 10 v\xE0 \u221A16 = 4. Ta c\xF3: 10 - 4 = 6.",
    timeLimit: 50,
    difficulty: 1,
    category: "KHAI_CAN",
    level: "CO_BAN"
  },
  {
    id: "KC_CB_04",
    question: "C\u0103n b\u1EADc hai c\u1EE7a 25 (\u221A25) l\xE0:",
    formula: "\\sqrt{25} = ?",
    options: ["3", "4", "5", "6"],
    answer: "5",
    explanation: "V\xEC 5 \xD7 5 = 25 n\xEAn \u221A25 = 5.",
    timeLimit: 50,
    difficulty: 1,
    category: "KHAI_CAN",
    level: "CO_BAN"
  },
  // ==========================================
  // LUY_THUA (Lũy thừa & Mũ)
  // ==========================================
  {
    id: "LT_CB_01",
    question: "Gi\xE1 tr\u1ECB c\u1EE7a 2\xB3 (2 l\u0169y th\u1EEBa 3) b\u1EB1ng bao nhi\xEAu?",
    formula: "2^3 = 2 \\times 2 \\times 2 = ?",
    options: ["6", "8", "9", "12"],
    answer: "8",
    explanation: "2\xB3 = 2 \xD7 2 \xD7 2 = 8.",
    timeLimit: 50,
    difficulty: 1,
    category: "LUY_THUA",
    level: "CO_BAN"
  },
  {
    id: "LT_CB_02",
    question: "Gi\xE1 tr\u1ECB c\u1EE7a 3\xB2 b\u1EB1ng bao nhi\xEAu?",
    formula: "3^2 = 3 \\times 3 = ?",
    options: ["6", "8", "9", "12"],
    answer: "9",
    explanation: "3\xB2 = 3 \xD7 3 = 9.",
    timeLimit: 50,
    difficulty: 1,
    category: "LUY_THUA",
    level: "CO_BAN"
  },
  {
    id: "LT_CB_03",
    question: "B\u1EA5t k\u1EF3 s\u1ED1 d\u01B0\u01A1ng n\xE0o n\xE2ng l\xEAn l\u0169y th\u1EEBa 0 (v\xED d\u1EE5 7\u2070) \u0111\u1EC1u b\u1EB1ng:",
    formula: "a^0 = ? \\; (a \\neq 0)",
    options: ["0", "1", "7", "Kh\xF4ng x\xE1c \u0111\u1ECBnh"],
    answer: "1",
    explanation: "Quy \u01B0\u1EDBc to\xE1n h\u1ECDc: a\u2070 = 1 v\u1EDBi m\u1ECDi s\u1ED1 a kh\xE1c 0.",
    timeLimit: 50,
    difficulty: 1,
    category: "LUY_THUA",
    level: "CO_BAN"
  },
  {
    id: "LT_CB_04",
    question: "T\xEDnh: 2\u2074 = ?",
    formula: "2^4 = 2 \\times 2 \\times 2 \\times 2 = ?",
    options: ["8", "12", "16", "32"],
    answer: "16",
    explanation: "2\u2074 = 16.",
    timeLimit: 50,
    difficulty: 1,
    category: "LUY_THUA",
    level: "CO_BAN"
  },
  // ==========================================
  // AM_SO (Số nguyên âm & Phép tính)
  // ==========================================
  {
    id: "AS_CB_01",
    question: "T\xEDnh: (-5) + 9 = ?",
    formula: "-5 + 9 = ?",
    options: ["-4", "4", "14", "-14"],
    answer: "4",
    explanation: "(-5) + 9 = 9 - 5 = 4.",
    timeLimit: 50,
    difficulty: 1,
    category: "AM_SO",
    level: "CO_BAN"
  },
  {
    id: "AS_CB_02",
    question: "T\xEDnh: 10 - 15 = ?",
    formula: "10 - 15 = ?",
    options: ["5", "-5", "-25", "25"],
    answer: "-5",
    explanation: "10 - 15 = -(15 - 10) = -5.",
    timeLimit: 50,
    difficulty: 1,
    category: "AM_SO",
    level: "CO_BAN"
  },
  {
    id: "AS_CB_03",
    question: "T\xEDnh: (-3) \xD7 (-4) = ?",
    formula: "(-3) \\times (-4) = ?",
    options: ["-12", "12", "-7", "7"],
    answer: "12",
    explanation: "\xC2m nh\xE2n \xE2m ra d\u01B0\u01A1ng: (-3) \xD7 (-4) = 12.",
    timeLimit: 50,
    difficulty: 1,
    category: "AM_SO",
    level: "CO_BAN"
  },
  {
    id: "AS_CB_04",
    question: "T\xEDnh: (-8) + (-2) = ?",
    formula: "(-8) + (-2) = ?",
    options: ["-6", "6", "-10", "10"],
    answer: "-10",
    explanation: "(-8) + (-2) = -(8 + 2) = -10.",
    timeLimit: 50,
    difficulty: 1,
    category: "AM_SO",
    level: "CO_BAN"
  },
  // ==========================================
  // CHIA_HET (Dấu hiệu chia hết)
  // ==========================================
  {
    id: "CH_CB_01",
    question: "S\u1ED1 n\xE0o sau \u0111\xE2y chia h\u1EBFt cho c\u1EA3 2 v\xE0 5?",
    formula: "n \\; \\vdots \\; 2 \\; \\text{v\xE0} \\; n \\; \\vdots \\; 5",
    options: ["25", "32", "45", "50"],
    answer: "50",
    explanation: "S\u1ED1 chia h\u1EBFt cho c\u1EA3 2 v\xE0 5 ph\u1EA3i c\xF3 ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng l\xE0 0. Do \u0111\xF3 50 l\xE0 \u0111\xE1p \xE1n \u0111\xFAng.",
    timeLimit: 50,
    difficulty: 1,
    category: "CHIA_HET",
    level: "CO_BAN"
  },
  {
    id: "CH_CB_02",
    question: "S\u1ED1 135 c\xF3 chia h\u1EBFt cho 9 kh\xF4ng?",
    formula: "1 + 3 + 5 = 9 \\implies 135 \\; \\vdots \\; 9 \\; ?",
    options: ["C\xF3", "Kh\xF4ng", "Ch\u1EC9 chia h\u1EBFt cho 3", "Kh\xF4ng chia h\u1EBFt"],
    answer: "C\xF3",
    explanation: "T\u1ED5ng c\xE1c ch\u1EEF s\u1ED1: 1 + 3 + 5 = 9. V\xEC 9 chia h\u1EBFt cho 9 n\xEAn 135 chia h\u1EBFt cho 9.",
    timeLimit: 50,
    difficulty: 1,
    category: "CHIA_HET",
    level: "CO_BAN"
  },
  {
    id: "CH_CB_03",
    question: "S\u1ED1 n\xE0o sau \u0111\xE2y chia h\u1EBFt cho 3?",
    formula: "n \\; \\vdots \\; 3",
    options: ["14", "16", "21", "25"],
    answer: "21",
    explanation: "2 + 1 = 3 chia h\u1EBFt cho 3 n\xEAn 21 chia h\u1EBFt cho 3.",
    timeLimit: 50,
    difficulty: 1,
    category: "CHIA_HET",
    level: "CO_BAN"
  },
  {
    id: "CH_CB_04",
    question: "S\u1ED1 ch\u1EB5n chia h\u1EBFt cho 2 c\xF3 ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng l\xE0 ch\u1EEF s\u1ED1 n\xE0o sau \u0111\xE2y?",
    formula: "n \\; \\vdots \\; 2",
    options: ["1, 3, 5", "0, 2, 4, 6, 8", "Ch\u1EC9 s\u1ED1 0", "3, 6, 9"],
    answer: "0, 2, 4, 6, 8",
    explanation: "C\xE1c s\u1ED1 c\xF3 ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng l\xE0 0, 2, 4, 6, 8 l\xE0 c\xE1c s\u1ED1 ch\u1EB5n chia h\u1EBFt cho 2.",
    timeLimit: 50,
    difficulty: 1,
    category: "CHIA_HET",
    level: "CO_BAN"
  },
  // ==========================================
  // PHAN_SO (Phân số & Tỉ số)
  // ==========================================
  {
    id: "PS_CB_01",
    question: "R\xFAt g\u1ECDn ph\xE2n s\u1ED1 4/8 v\u1EC1 t\u1ED1i gi\u1EA3n ta \u0111\u01B0\u1EE3c:",
    formula: "\\frac{4}{8} = ?",
    options: ["1/2", "2/3", "1/4", "2/4"],
    answer: "1/2",
    explanation: "Chia c\u1EA3 t\u1EED v\xE0 m\u1EABu cho 4: 4/8 = 1/2.",
    timeLimit: 50,
    difficulty: 1,
    category: "PHAN_SO",
    level: "CO_BAN"
  },
  {
    id: "PS_CB_02",
    question: "T\xEDnh t\u1ED5ng: 1/4 + 2/4 = ?",
    formula: "\\frac{1}{4} + \\frac{2}{4} = ?",
    options: ["3/8", "3/4", "2/4", "1"],
    answer: "3/4",
    explanation: "C\xF9ng m\u1EABu s\u1ED1 4: (1 + 2)/4 = 3/4.",
    timeLimit: 50,
    difficulty: 1,
    category: "PHAN_SO",
    level: "CO_BAN"
  },
  {
    id: "PS_CB_03",
    question: "Ph\xE2n s\u1ED1 1/2 t\u01B0\u01A1ng \u1EE9ng v\u1EDBi bao nhi\xEAu ph\u1EA7n tr\u0103m (%)?",
    formula: "\\frac{1}{2} = ? \\%",
    options: ["25%", "50%", "75%", "100%"],
    answer: "50%",
    explanation: "1/2 = 50/100 = 50%.",
    timeLimit: 50,
    difficulty: 1,
    category: "PHAN_SO",
    level: "CO_BAN"
  },
  {
    id: "PS_CB_04",
    question: "T\xECm 1/3 c\u1EE7a s\u1ED1 27:",
    formula: "\\frac{1}{3} \\times 27 = ?",
    options: ["7", "8", "9", "10"],
    answer: "9",
    explanation: "27 / 3 = 9.",
    timeLimit: 50,
    difficulty: 1,
    category: "PHAN_SO",
    level: "CO_BAN"
  },
  // ==========================================
  // TUYET_DOI (Trị tuyệt đối)
  // ==========================================
  {
    id: "TD_CB_01",
    question: "Gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i c\u1EE7a s\u1ED1 \xE2m 8: |-8| = ?",
    formula: "|-8| = ?",
    options: ["-8", "8", "0", "16"],
    answer: "8",
    explanation: "Gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i c\u1EE7a m\u1ED9t s\u1ED1 lu\xF4n l\xE0 kho\u1EA3ng c\xE1ch t\u1EEB s\u1ED1 \u0111\xF3 \u0111\u1EBFn 0 tr\xEAn tr\u1EE5c s\u1ED1 (lu\xF4n kh\xF4ng \xE2m): |-8| = 8.",
    timeLimit: 50,
    difficulty: 1,
    category: "TUYET_DOI",
    level: "CO_BAN"
  },
  {
    id: "TD_CB_02",
    question: "T\xEDnh: |-15| + 5 = ?",
    formula: "|-15| + 5 = 15 + 5 = ?",
    options: ["10", "20", "-10", "-20"],
    answer: "20",
    explanation: "|-15| = 15, do \u0111\xF3 15 + 5 = 20.",
    timeLimit: 50,
    difficulty: 1,
    category: "TUYET_DOI",
    level: "CO_BAN"
  },
  {
    id: "TD_CB_03",
    question: "Gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i c\u1EE7a s\u1ED1 0 (|0|) b\u1EB1ng bao nhi\xEAu?",
    formula: "|0| = ?",
    options: ["0", "1", "-1", "Kh\xF4ng x\xE1c \u0111\u1ECBnh"],
    answer: "0",
    explanation: "|0| = 0.",
    timeLimit: 50,
    difficulty: 1,
    category: "TUYET_DOI",
    level: "CO_BAN"
  },
  {
    id: "TD_CB_04",
    question: "T\xEDnh: |12| - |-7| = ?",
    formula: "|12| - |-7| = 12 - 7 = ?",
    options: ["5", "19", "-5", "-19"],
    answer: "5",
    explanation: "12 - 7 = 5.",
    timeLimit: 50,
    difficulty: 1,
    category: "TUYET_DOI",
    level: "CO_BAN"
  },
  // ==========================================
  // UOC_BOI (Ước & Bội)
  // ==========================================
  {
    id: "UB_CB_01",
    question: "\u01AF\u1EDBc chung l\u1EDBn nh\u1EA5t c\u1EE7a 6 v\xE0 9 (\u01AFCLN(6, 9)) l\xE0:",
    formula: "\\text{\u01AFCLN}(6, 9) = ?",
    options: ["1", "2", "3", "6"],
    answer: "3",
    explanation: "C\xE1c \u01B0\u1EDBc c\u1EE7a 6: {1, 2, 3, 6}. C\xE1c \u01B0\u1EDBc c\u1EE7a 9: {1, 3, 9}. \u01AF\u1EDBc chung l\u1EDBn nh\u1EA5t l\xE0 3.",
    timeLimit: 50,
    difficulty: 1,
    category: "UOC_BOI",
    level: "CO_BAN"
  },
  {
    id: "UB_CB_02",
    question: "B\u1ED9i chung nh\u1ECF nh\u1EA5t c\u1EE7a 4 v\xE0 6 (BCNN(4, 6)) l\xE0:",
    formula: "\\text{BCNN}(4, 6) = ?",
    options: ["6", "12", "18", "24"],
    answer: "12",
    explanation: "B\u1ED9i c\u1EE7a 4: 4, 8, 12, 16... B\u1ED9i c\u1EE7a 6: 6, 12, 18... B\u1ED9i chung nh\u1ECF nh\u1EA5t kh\xE1c 0 l\xE0 12.",
    timeLimit: 50,
    difficulty: 1,
    category: "UOC_BOI",
    level: "CO_BAN"
  },
  {
    id: "UB_CB_03",
    question: "S\u1ED1 n\xE0o sau \u0111\xE2y l\xE0 \u01B0\u1EDBc c\u1EE7a s\u1ED1 15?",
    formula: "15 \\; \\vdots \\; d",
    options: ["2", "4", "5", "7"],
    answer: "5",
    explanation: "V\xEC 15 chia h\u1EBFt cho 5 (15 / 5 = 3) n\xEAn 5 l\xE0 \u01B0\u1EDBc c\u1EE7a 15.",
    timeLimit: 50,
    difficulty: 1,
    category: "UOC_BOI",
    level: "CO_BAN"
  },
  {
    id: "UB_CB_04",
    question: "B\u1ED9i c\u1EE7a 7 nh\u1ECF h\u01A1n 20 l\xE0 s\u1ED1 n\xE0o sau \u0111\xE2y?",
    formula: "7k < 20",
    options: ["12", "14", "16", "18"],
    answer: "14",
    explanation: "7 \xD7 2 = 14 l\xE0 b\u1ED9i c\u1EE7a 7 v\xE0 nh\u1ECF h\u01A1n 20.",
    timeLimit: 50,
    difficulty: 1,
    category: "UOC_BOI",
    level: "CO_BAN"
  }
];
function generateProceduralQuestion(category, level = "CO_BAN") {
  const qId = `PROC_${category}_${Date.now()}_${randInt(10, 99)}`;
  switch (category) {
    case "NGUYEN_TO": {
      const primes = [2, 3, 5, 7, 11, 13, 17, 19];
      const targetPrime = primes[randInt(0, primes.length - 1)];
      const composites = [4, 6, 8, 9, 10, 12, 14, 15, 16];
      const wrong = composites.sort(() => Math.random() - 0.5).slice(0, 3);
      const opts = [targetPrime.toString(), ...wrong.map((w) => w.toString())].sort(() => Math.random() - 0.5);
      return {
        id: qId,
        question: `Trong c\xE1c s\u1ED1 sau, s\u1ED1 n\xE0o l\xE0 s\u1ED1 nguy\xEAn t\u1ED1?`,
        formula: `n \\in \\mathbb{P}`,
        options: opts,
        answer: targetPrime.toString(),
        explanation: `${targetPrime} l\xE0 s\u1ED1 nguy\xEAn t\u1ED1 v\xEC ch\u1EC9 c\xF3 hai \u01B0\u1EDBc l\xE0 1 v\xE0 ch\xEDnh n\xF3.`,
        timeLimit: 50,
        difficulty: 1,
        category,
        level
      };
    }
    case "CHINH_PHUONG": {
      const n = randInt(2, 10);
      const sq = n * n;
      const opts = [sq.toString(), (sq + randInt(2, 5)).toString(), (sq - randInt(2, 4)).toString(), (n * 2).toString()].sort(() => Math.random() - 0.5);
      return {
        id: qId,
        question: `T\xEDnh gi\xE1 tr\u1ECB c\u1EE7a ${n}\xB2 (${n} nh\xE2n ${n}) = ?`,
        formula: `${n}^2 = ?`,
        options: opts,
        answer: sq.toString(),
        explanation: `${n}\xB2 = ${n} \xD7 ${n} = ${sq}.`,
        timeLimit: 50,
        difficulty: 1,
        category,
        level
      };
    }
    case "DAI_SO": {
      const a = randInt(3, 15);
      const b = randInt(16, 35);
      const ans = b - a;
      const opts = [ans.toString(), (ans + 2).toString(), (ans - 2).toString(), (ans + 5).toString()].sort(() => Math.random() - 0.5);
      return {
        id: qId,
        question: `T\xECm x bi\u1EBFt: x + ${a} = ${b}`,
        formula: `x + ${a} = ${b} \\implies x = ?`,
        options: opts,
        answer: ans.toString(),
        explanation: `x = ${b} - ${a} = ${ans}.`,
        timeLimit: 50,
        difficulty: 1,
        category,
        level
      };
    }
    case "KHAI_CAN": {
      const n = randInt(2, 10);
      const sq = n * n;
      const opts = [n.toString(), (n + 1).toString(), (n - 1).toString(), (n + 2).toString()].sort(() => Math.random() - 0.5);
      return {
        id: qId,
        question: `T\xEDnh gi\xE1 tr\u1ECB c\u0103n b\u1EADc hai: \u221A${sq} = ?`,
        formula: `\\sqrt{${sq}} = ?`,
        options: opts,
        answer: n.toString(),
        explanation: `V\xEC ${n}\xB2 = ${sq} n\xEAn \u221A${sq} = ${n}.`,
        timeLimit: 50,
        difficulty: 1,
        category,
        level
      };
    }
    case "LUY_THUA": {
      const base = randInt(2, 5);
      const exp = randInt(2, 3);
      const val = Math.pow(base, exp);
      const opts = [val.toString(), (val + 2).toString(), (base * exp).toString(), (val - 2).toString()].sort(() => Math.random() - 0.5);
      return {
        id: qId,
        question: `T\xEDnh gi\xE1 tr\u1ECB c\u1EE7a ${base}^${exp} = ?`,
        formula: `${base}^{${exp}} = ?`,
        options: opts,
        answer: val.toString(),
        explanation: `${base}^${exp} = ${val}.`,
        timeLimit: 50,
        difficulty: 1,
        category,
        level
      };
    }
    case "AM_SO": {
      const a = randInt(2, 9);
      const b = randInt(10, 20);
      const ans = a - b;
      const opts = [ans.toString(), (-ans).toString(), (ans - 2).toString(), (ans + 2).toString()].sort(() => Math.random() - 0.5);
      return {
        id: qId,
        question: `T\xEDnh gi\xE1 tr\u1ECB: ${a} - ${b} = ?`,
        formula: `${a} - ${b} = ?`,
        options: opts,
        answer: ans.toString(),
        explanation: `${a} - ${b} = -(${b} - ${a}) = ${ans}.`,
        timeLimit: 50,
        difficulty: 1,
        category,
        level
      };
    }
    case "CHIA_HET": {
      const mult = randInt(2, 9);
      const ans = mult * 5;
      const opts = [ans.toString(), (ans + 3).toString(), (ans - 2).toString(), (ans + 1).toString()].sort(() => Math.random() - 0.5);
      return {
        id: qId,
        question: `S\u1ED1 n\xE0o sau \u0111\xE2y chia h\u1EBFt cho 5?`,
        formula: `n \\; \\vdots \\; 5`,
        options: opts,
        answer: ans.toString(),
        explanation: `${ans} c\xF3 t\u1EADn c\xF9ng l\xE0 0 ho\u1EB7c 5 n\xEAn chia h\u1EBFt cho 5.`,
        timeLimit: 50,
        difficulty: 1,
        category,
        level
      };
    }
    case "PHAN_SO": {
      const num = randInt(1, 3);
      const den = 4;
      const opts = [`${num}/${den}`, `${num + 1}/${den}`, `1/2`, `1`].sort(() => Math.random() - 0.5);
      return {
        id: qId,
        question: `T\xEDnh: ${num}/4 + 0 = ?`,
        formula: `\\frac{${num}}{4} = ?`,
        options: opts,
        answer: `${num}/${den}`,
        explanation: `B\u1EA5t k\u1EF3 s\u1ED1 n\xE0o c\u1ED9ng 0 c\u0169ng b\u1EB1ng ch\xEDnh n\xF3: ${num}/${den}.`,
        timeLimit: 50,
        difficulty: 1,
        category,
        level
      };
    }
    case "TUYET_DOI": {
      const val = randInt(4, 25);
      const opts = [val.toString(), (-val).toString(), "0", (val * 2).toString()].sort(() => Math.random() - 0.5);
      return {
        id: qId,
        question: `T\xEDnh gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i: |-${val}| = ?`,
        formula: `|-${val}| = ?`,
        options: opts,
        answer: val.toString(),
        explanation: `Gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i lu\xF4n kh\xF4ng \xE2m: |-${val}| = ${val}.`,
        timeLimit: 50,
        difficulty: 1,
        category,
        level
      };
    }
    case "UOC_BOI": {
      const a = randInt(2, 4);
      const x = a * 2;
      const y = a * 3;
      const g = gcd(x, y);
      const opts = [g.toString(), (g + 1).toString(), (g + 2).toString(), "1"].sort(() => Math.random() - 0.5);
      return {
        id: qId,
        question: `\u01AFCLN c\u1EE7a ${x} v\xE0 ${y} l\xE0 s\u1ED1 n\xE0o?`,
        formula: `\\text{\u01AFCLN}(${x}, ${y}) = ?`,
        options: opts,
        answer: g.toString(),
        explanation: `\u01AFCLN(${x}, ${y}) = ${g}.`,
        timeLimit: 50,
        difficulty: 1,
        category,
        level
      };
    }
    default: {
      return CURATED_QUESTIONS[randInt(0, CURATED_QUESTIONS.length - 1)];
    }
  }
}
function getQuestionForCategory(category, level = "CO_BAN") {
  const matched = CURATED_QUESTIONS.filter((q) => q.category === category);
  if (matched.length > 0 && Math.random() > 0.3) {
    return matched[randInt(0, matched.length - 1)];
  }
  return generateProceduralQuestion(category, level);
}

// server/websocket/wsHandler.ts
var import_ws = require("ws");

// server/game/gameEngine.ts
function shuffleDeck(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function pick2RandomRunes() {
  const shuffled = [...ALL_RUNES].sort(() => Math.random() - 0.5);
  return [shuffled[0].id, shuffled[1].id];
}
function canTriggerRune(player, runeId) {
  if (!player) return false;
  const hasRune = player.chosenRuneId === runeId || player.runes.some((r) => r.runeId === runeId);
  if (!hasRune) return false;
  const def = ALL_RUNES.find((r) => r.id === runeId);
  if (!def) return false;
  if (def.limitType === "once_per_match") {
    if (player.runeUsedInMatch) return false;
    const slot = player.runes.find((r) => r.runeId === runeId);
    if (slot && (slot.usedInMatch || slot.usesLeft <= 0)) return false;
    return true;
  }
  if (def.limitType === "once_per_turn") {
    if (player.runeUsedThisTurn) return false;
    const slot = player.runes.find((r) => r.runeId === runeId);
    if (slot && (slot.usedThisTurn || slot.usesLeft <= 0)) return false;
    return true;
  }
  return true;
}
function triggerRune(player, runeId) {
  const def = ALL_RUNES.find((r) => r.id === runeId);
  if (!def) return;
  if (def.limitType === "once_per_match") {
    player.runeUsedInMatch = true;
    player.runes.forEach((slot) => {
      if (slot.runeId === runeId) {
        slot.usedInMatch = true;
        slot.usesLeft = 0;
        slot.active = false;
      }
    });
  } else if (def.limitType === "once_per_turn") {
    player.runeUsedThisTurn = true;
    player.runes.forEach((slot) => {
      if (slot.runeId === runeId) {
        slot.usedThisTurn = true;
        slot.usesLeft = 0;
        slot.active = false;
      }
    });
  }
}
function hasActiveRune(player, runeId) {
  return canTriggerRune(player, runeId);
}
var GameEngine = class {
  constructor() {
    this.games = /* @__PURE__ */ new Map();
  }
  notifyState(gameId, event, extra) {
    const session = this.games.get(gameId);
    if (session && this.onStateChange) {
      this.onStateChange(gameId, session.state, event, extra);
    }
  }
  getGame(gameId) {
    return this.games.get(gameId)?.state;
  }
  updateNextCardPreview(state, session) {
    const hasForesight = Object.values(state.players).some((p) => hasActiveRune(p, "rune_foresight"));
    if (hasForesight && session.fullDeck.length > 0) {
      const nextCard = session.fullDeck[session.fullDeck.length - 1];
      state.nextCardPreview = {
        domainId: nextCard.domainId,
        domainNameVi: nextCard.domainNameVi,
        pointValue: nextCard.pointValue,
        elementColor: nextCard.elementColor
      };
    } else {
      state.nextCardPreview = void 0;
    }
  }
  createGame(options) {
    const mathLevel = options.mathLevel || "CO_BAN";
    const deck = shuffleDeck(DECK_60_CARDS);
    const p1Draft = pick2RandomRunes();
    const p1State = {
      id: options.player1.id,
      name: options.player1.name,
      avatar: options.player1.avatar,
      hp: 100,
      safeScore: 0,
      currentTurnScore: 0,
      runes: [],
      draftRunes: p1Draft,
      chosenRuneId: void 0,
      runeUsedThisTurn: false,
      runeUsedInMatch: false,
      connected: true,
      stats: {
        correctCount: 0,
        wrongCount: 0,
        bustCount: 0,
        comboMax: 0,
        currentCombo: 0,
        categoryAccuracy: {}
      }
    };
    let p2State;
    if (options.mode === "ai") {
      const aiDiff = options.aiDifficulty || "medium";
      const aiDraft = pick2RandomRunes();
      const aiChosenRune = aiDraft[Math.floor(Math.random() * aiDraft.length)];
      const aiRuneDef = ALL_RUNES.find((r) => r.id === aiChosenRune);
      const isAiOncePerMatch = aiRuneDef?.limitType === "once_per_match";
      p2State = {
        id: "bot-ai",
        name: `AI Archimedes (${aiDiff === "easy" ? "D\u1EC4" : aiDiff === "medium" ? "V\u1EEAA" : "CAO C\u1EA4P"})`,
        avatar: "\u{1F916}",
        hp: 100,
        safeScore: 0,
        currentTurnScore: 0,
        runes: [{
          runeId: aiChosenRune,
          usesLeft: isAiOncePerMatch ? 1 : 1,
          active: true,
          usedThisTurn: false,
          usedInMatch: false
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
          categoryAccuracy: {}
        }
      };
    } else {
      const p2Draft = pick2RandomRunes();
      p2State = {
        id: options.player2?.id || "waiting_player",
        name: options.player2?.name || "\u0110ang ch\u1EDD \u0111\u1ED1i th\u1EE7...",
        avatar: options.player2?.avatar || "\u{1F464}",
        hp: 100,
        safeScore: 0,
        currentTurnScore: 0,
        runes: [],
        draftRunes: p2Draft,
        chosenRuneId: void 0,
        runeUsedThisTurn: false,
        runeUsedInMatch: false,
        connected: !!options.player2,
        stats: {
          correctCount: 0,
          wrongCount: 0,
          bustCount: 0,
          comboMax: 0,
          currentCombo: 0,
          categoryAccuracy: {}
        }
      };
    }
    const gameState = {
      gameId: options.gameId,
      roomCode: options.roomCode,
      mode: options.mode,
      aiDifficulty: options.aiDifficulty,
      status: options.mode === "ai" ? "drafting" : options.player2 ? "drafting" : "waiting",
      targetScore: 150,
      round: 1,
      turn: 1,
      currentPlayerId: options.player1.id,
      players: {
        [p1State.id]: p1State,
        [p2State.id]: p2State
      },
      tableCards: [],
      deckRemaining: deck.length,
      historyLog: [
        {
          id: `log_${Date.now()}`,
          timestamp: Date.now(),
          type: "turn_switch",
          playerId: p1State.id,
          playerName: p1State.name,
          message: `Tr\u1EADn \u0111\u1EA5u chu\u1EA9n b\u1ECB b\u1EAFt \u0111\u1EA7u! M\u1ED7i ng\u01B0\u1EDDi ch\u01A1i \u0111\u01B0\u1EE3c chia 2 l\xE1 Rune ng\u1EABu nhi\xEAn \u2014 h\xE3y ch\u1ECDn 1 l\xE1 \u0111\u1EC3 k\xEDch ho\u1EA1t n\u1ED9i t\u1EA1i xuy\xEAn su\u1ED1t tr\u1EADn!`
        }
      ],
      mathLevel
    };
    const session = {
      state: gameState,
      fullDeck: deck
    };
    this.games.set(options.gameId, session);
    this.updateNextCardPreview(gameState, session);
    return gameState;
  }
  joinGame(gameId, player) {
    const session = this.games.get(gameId);
    if (!session) return null;
    const { state } = session;
    if (Object.keys(state.players).length >= 2 && !state.players["waiting_player"]) {
      return null;
    }
    const p2Draft = pick2RandomRunes();
    const pState = {
      id: player.id,
      name: player.name,
      avatar: player.avatar,
      hp: 100,
      safeScore: 0,
      currentTurnScore: 0,
      runes: [],
      draftRunes: p2Draft,
      chosenRuneId: void 0,
      runeUsedThisTurn: false,
      runeUsedInMatch: false,
      connected: true,
      stats: {
        correctCount: 0,
        wrongCount: 0,
        bustCount: 0,
        comboMax: 0,
        currentCombo: 0,
        categoryAccuracy: {}
      }
    };
    if (state.players["waiting_player"] && player.id !== "waiting_player") {
      delete state.players["waiting_player"];
    }
    state.players[player.id] = pState;
    state.status = "drafting";
    state.historyLog.push({
      id: `log_${Date.now()}`,
      timestamp: Date.now(),
      type: "turn_switch",
      playerId: player.id,
      playerName: player.name,
      message: `${player.name} \u0111\xE3 tham gia ph\xF2ng! Hai b\xEAn ti\u1EBFn h\xE0nh ch\u1ECDn 1 trong 2 l\xE1 Rune n\u1ED9i t\u1EA1i.`
    });
    return state;
  }
  // CHOOSE DRAFT RUNE (1 of 2 random dealt runes)
  chooseDraftRune(gameId, playerId, runeId) {
    const session = this.games.get(gameId);
    if (!session) return { success: false, error: "Tr\u1EADn \u0111\u1EA5u kh\xF4ng t\u1ED3n t\u1EA1i.", state: {} };
    const { state } = session;
    const player = state.players[playerId];
    if (!player) return { success: false, error: "Ng\u01B0\u1EDDi ch\u01A1i kh\xF4ng t\xECm th\u1EA5y.", state };
    if (player.chosenRuneId) {
      return { success: false, error: "B\u1EA1n \u0111\xE3 ch\u1ECDn l\xE1 b\xE0i Rune n\u1ED9i t\u1EA1i r\u1ED3i.", state };
    }
    if (!player.draftRunes || !player.draftRunes.includes(runeId)) {
      return { success: false, error: "L\xE1 b\xE0i Rune n\xE0y kh\xF4ng n\u1EB1m trong 2 l\xE1 \u0111\u01B0\u1EE3c chia.", state };
    }
    const runeDef = ALL_RUNES.find((r) => r.id === runeId);
    const isOncePerMatch = runeDef?.limitType === "once_per_match";
    player.chosenRuneId = runeId;
    player.runes = [{
      runeId,
      usesLeft: isOncePerMatch ? 1 : 1,
      active: true,
      usedThisTurn: false,
      usedInMatch: false
    }];
    player.runeUsedThisTurn = false;
    player.runeUsedInMatch = false;
    state.historyLog.push({
      id: `log_${Date.now()}`,
      timestamp: Date.now(),
      type: "rune_used",
      playerId,
      playerName: player.name,
      message: `\u26A1 ${player.name} \u0111\xE3 ch\u1ECDn \u1EA5n ch\xFA n\u1ED9i t\u1EA1i: [${runeDef?.name || runeId}]! T\xE1c d\u1EE5ng k\xEDch ho\u1EA1t xuy\xEAn su\u1ED1t c\u1EA3 tr\u1EADn \u0111\u1EA5u.`
    });
    const activePlayers = Object.values(state.players).filter((p) => p.connected);
    const allChosen = activePlayers.length >= 2 && activePlayers.every((p) => !!p.chosenRuneId);
    if (allChosen) {
      state.status = "playing";
      state.historyLog.push({
        id: `log_${Date.now()}`,
        timestamp: Date.now(),
        type: "turn_switch",
        playerId: state.currentPlayerId,
        playerName: state.players[state.currentPlayerId]?.name || "Ph\xE1p s\u01B0",
        message: `\u2728 T\u1EA5t c\u1EA3 ph\xE1p s\u01B0 \u0111\xE3 ch\u1ECDn xong \u1EA5n ch\xFA n\u1ED9i t\u1EA1i! Tr\u1EADn \u0111\u1EA5u ch\xEDnh th\u1EE9c b\u1EAFt \u0111\u1EA7u!`
      });
      this.updateNextCardPreview(state, session);
      if (state.currentPlayerId === "bot-ai") {
        this.checkAiTurn(gameId);
      }
    }
    if (this.onStateChange) {
      this.onStateChange(gameId, state, "rune_chosen");
    }
    return { success: true, state };
  }
  // DRAW ACTION
  drawCard(gameId, playerId) {
    const session = this.games.get(gameId);
    if (!session) return { success: false, error: "Tr\u1EADn \u0111\u1EA5u kh\xF4ng t\u1ED3n t\u1EA1i.", state: {} };
    const { state } = session;
    if (state.status !== "playing") {
      return { success: false, error: "Tr\u1EADn \u0111\u1EA5u ch\u01B0a s\u1EB5n s\xE0ng ho\u1EB7c \u0111\xE3 k\u1EBFt th\xFAc.", state };
    }
    if (state.currentPlayerId !== playerId) {
      return { success: false, error: "Ch\u01B0a t\u1EDBi l\u01B0\u1EE3t c\u1EE7a b\u1EA1n.", state };
    }
    if (state.currentQuestion) {
      return { success: false, error: "B\u1EA1n \u0111ang c\xF3 c\xE2u h\u1ECFi to\xE1n ch\u01B0a gi\u1EA3i xong!", state };
    }
    const player = state.players[playerId];
    if (session.fullDeck.length === 0) {
      session.fullDeck = shuffleDeck(DECK_60_CARDS);
    }
    const drawnCard = session.fullDeck.pop();
    state.deckRemaining = session.fullDeck.length;
    this.updateNextCardPreview(state, session);
    const hasDomain = state.tableCards.some((c) => c.domainId === drawnCard.domainId);
    if (hasDomain) {
      if (state.activeShield || canTriggerRune(player, "rune_shield")) {
        state.activeShield = false;
        triggerRune(player, "rune_shield");
        state.historyLog.push({
          id: `log_${Date.now()}`,
          timestamp: Date.now(),
          type: "rune_used",
          playerId,
          playerName: player.name,
          message: `\u{1F6E1}\uFE0F [KHI\xCAN CH\u1EAEN (1 L\u1EA6N/L\u01AF\u1EE2T)] \u0111\xE3 k\xEDch ho\u1EA1t b\u1EA3o m\u1EC7nh cho ${player.name}, h\xF3a gi\u1EA3i BUST tr\xF9ng h\u1EC7 ${drawnCard.domainNameVi}! (L\u01B0\u1EE3t n\xE0y kh\xF4ng th\u1EC3 d\xF9ng khi\xEAn th\xEAm)`
        });
        return { success: true, state, isBust: false };
      }
      if (canTriggerRune(player, "rune_revive")) {
        triggerRune(player, "rune_revive");
        const preserved = Math.ceil(player.currentTurnScore * 0.5);
        player.safeScore += preserved;
        player.currentTurnScore = 0;
        state.tableCards = [];
        state.historyLog.push({
          id: `log_${Date.now()}`,
          timestamp: Date.now(),
          type: "bust",
          playerId,
          playerName: player.name,
          message: `\u{1F525} BUST tr\xF9ng h\u1EC7 [${drawnCard.domainNameVi}]! Nh\u01B0ng [H\u1ED2I SINH B\u1EA2O M\u1EC6NH - DUY NH\u1EA4T 1 L\u1EA6N/TR\u1EACN] \u0111\xE3 c\u1EE9u m\u1EA1ng: T\u1EF1 \u0111\u1ED9ng b\u1EA3o to\xE0n 50% \u0111i\u1EC3m (+${preserved}\u0111) v\xE0o kho an to\xE0n! (\u0110\xE3 ti\xEAu hao h\u1EBFt tr\u1EADn)`
        });
        this.switchTurn(state);
        this.checkAiTurn(gameId);
        return { success: true, isBust: true, state };
      }
      player.stats.bustCount += 1;
      const lostScore = player.currentTurnScore;
      player.currentTurnScore = 0;
      state.tableCards = [];
      state.historyLog.push({
        id: `log_${Date.now()}`,
        timestamp: Date.now(),
        type: "bust",
        playerId,
        playerName: player.name,
        message: `\u{1F4A5} BUST (N\u1ED4 L\u01AF\u1EE2T)! R\xFAt tr\xF9ng h\u1EC7 [${drawnCard.domainNameVi}] v\u1EDBi l\xE1 \u0111\xE3 c\xF3 tr\xEAn b\xE0n! M\u1EA5t ${lostScore}\u0111 t\u1EA1m th\u1EDDi. Chuy\u1EC3n l\u01B0\u1EE3t!`
      });
      this.switchTurn(state);
      this.checkAiTurn(gameId);
      return { success: true, isBust: true, state };
    }
    const fullQuestion = getQuestionForCategory(drawnCard.domainId, state.mathLevel);
    session.currentFullQuestion = fullQuestion;
    session.pendingCard = drawnCard;
    let qTimeLimit = Math.max(fullQuestion.timeLimit || 50, 50);
    if (hasActiveRune(player, "rune_freeze") || hasActiveRune(player, "rune_time_plus")) {
      qTimeLimit = 65;
    }
    const opponent = Object.values(state.players).find((p) => p.id !== playerId);
    if (opponent && hasActiveRune(opponent, "rune_haste")) {
      qTimeLimit = Math.max(35, qTimeLimit - 8);
    }
    const clientQuestion = {
      id: fullQuestion.id,
      question: fullQuestion.question,
      formula: fullQuestion.formula,
      options: fullQuestion.options,
      timeLimit: qTimeLimit,
      difficulty: fullQuestion.difficulty,
      category: fullQuestion.category,
      level: fullQuestion.level
    };
    state.currentCard = drawnCard;
    state.currentQuestion = clientQuestion;
    state.questionStartTime = Date.now();
    state.questionTimeLimit = qTimeLimit;
    state.historyLog.push({
      id: `log_${Date.now()}`,
      timestamp: Date.now(),
      type: "draw",
      playerId,
      playerName: player.name,
      message: `${player.name} r\xFAt \u0111\u01B0\u1EE3c l\xE1 [${drawnCard.domainNameVi}] (+${drawnCard.pointValue}\u0111) - K\u1EF9 n\u0103ng: ${drawnCard.skillName}!`
    });
    return { success: true, state };
  }
  // ANSWER ACTION
  answerQuestion(gameId, playerId, answer) {
    const session = this.games.get(gameId);
    if (!session || !session.currentFullQuestion || !session.pendingCard) {
      return { success: false, correct: false, earnedPoints: 0, state: {} };
    }
    const { state, currentFullQuestion, pendingCard } = session;
    const player = state.players[playerId];
    if (state.currentPlayerId !== playerId) {
      return { success: false, correct: false, earnedPoints: 0, state };
    }
    const cleanUser = answer.trim().toLowerCase();
    const cleanTarget = currentFullQuestion.answer.trim().toLowerCase();
    const isCorrect = cleanUser === cleanTarget || parseFloat(cleanUser) === parseFloat(cleanTarget);
    if (isCorrect) {
      let points = pendingCard.pointValue;
      if (state.doublePointsActive || canTriggerRune(player, "rune_double")) {
        points = Math.round(points * 1.5);
        state.doublePointsActive = false;
        triggerRune(player, "rune_double");
      }
      if (canTriggerRune(player, "rune_frenzy")) {
        points = Math.round(points * 1.25);
      }
      const elapsedSec = (Date.now() - (state.questionStartTime || Date.now())) / 1e3;
      if (canTriggerRune(player, "rune_time_plus") && elapsedSec <= 12) {
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
      state.tableCards.push(pendingCard);
      player.currentTurnScore += points;
      if (canTriggerRune(player, "rune_harvest") && state.tableCards.length >= 3) {
        triggerRune(player, "rune_harvest");
        player.currentTurnScore += 15;
        state.historyLog.push({
          id: `log_${Date.now()}`,
          timestamp: Date.now(),
          type: "rune_used",
          playerId,
          playerName: player.name,
          message: `\u{1F33E} [B\u1ED8I THU (1 L\u1EA6N/L\u01AF\u1EE2T)] gom \u0111\u01B0\u1EE3c chu\u1ED7i 3 l\xE1 b\xE0i tr\xEAn b\xE0n, nh\u1EADn th\xEAm +15 \u0111i\u1EC3m th\u01B0\u1EDFng!`
        });
      }
      if (canTriggerRune(player, "rune_insurance") && state.tableCards.length >= 2) {
        triggerRune(player, "rune_insurance");
        const sorted = [...state.tableCards].sort((a, b) => b.pointValue - a.pointValue);
        const topCard = sorted[0];
        player.safeScore += topCard.pointValue;
        player.currentTurnScore = Math.max(0, player.currentTurnScore - topCard.pointValue);
        state.tableCards = state.tableCards.filter((c) => c.id !== topCard.id);
        state.historyLog.push({
          id: `log_${Date.now()}`,
          timestamp: Date.now(),
          type: "rune_used",
          playerId,
          playerName: player.name,
          message: `\u{1F512} [B\u1EA2O HI\u1EC2M KHO (1 L\u1EA6N/L\u01AF\u1EE2T)] \u0111\xE3 t\u1EF1 \u0111\u1ED9ng b\u1EA3o hi\u1EC3m l\xE1 b\xE0i cao nh\u1EA5t [${topCard.domainNameVi}] (+${topCard.pointValue}\u0111) th\u1EB3ng v\xE0o kho an to\xE0n!`
        });
      }
      if (canTriggerRune(player, "rune_siphon")) {
        const opp = Object.values(state.players).find((p) => p.id !== playerId);
        if (opp && opp.safeScore > 0) {
          triggerRune(player, "rune_siphon");
          const stolen = Math.min(opp.safeScore, 3);
          opp.safeScore -= stolen;
          player.safeScore += stolen;
          state.historyLog.push({
            id: `log_${Date.now()}`,
            timestamp: Date.now(),
            type: "rune_used",
            playerId,
            playerName: player.name,
            message: `\u{1F9B9} [MA H\xDAT (1 L\u1EA6N/L\u01AF\u1EE2T)] h\xFAt +${stolen} \u0111i\u1EC3m t\u1EEB \u0111\u1ED1i th\u1EE7 sang kho an to\xE0n c\u1EE7a b\u1EA1n!`
          });
        }
      }
      state.lastAnswerResult = {
        correct: true,
        earnedPoints: points
      };
      state.historyLog.push({
        id: `log_${Date.now()}`,
        timestamp: Date.now(),
        type: "answer_correct",
        playerId,
        playerName: player.name,
        message: `\u2713 CH\xCDNH X\xC1C! ${player.name} gi\u1EA3i \u0111\xFAng c\xE2u h\u1ECFi, nh\u1EADn +${points} \u0111i\u1EC3m!`
      });
      state.currentQuestion = void 0;
      state.currentCard = void 0;
      session.currentFullQuestion = void 0;
      session.pendingCard = void 0;
      if (player.safeScore + player.currentTurnScore >= state.targetScore) {
        state.historyLog.push({
          id: `log_${Date.now()}`,
          timestamp: Date.now(),
          type: "turn_switch",
          playerId,
          playerName: player.name,
          message: `\u2B50 ${player.name} \u0111\xE3 \u0111\u1EE7 \u0111i\u1EC3m chi\u1EBFn th\u1EAFng! B\u1EA5m BANK \u0111\u1EC3 ho\xE0n t\u1EA5t!`
        });
      }
      return { success: true, correct: true, earnedPoints: points, state };
    } else {
      if (canTriggerRune(player, "rune_retry")) {
        triggerRune(player, "rune_retry");
        state.questionTimeLimit = (state.questionTimeLimit || 45) + 15;
        state.historyLog.push({
          id: `log_${Date.now()}`,
          timestamp: Date.now(),
          type: "rune_used",
          playerId,
          playerName: player.name,
          message: `\u2728 [S\u1EECA SAI (1 L\u1EA6N/L\u01AF\u1EE2T)] th\u1EA5u tri\u1EC7t! ${player.name} \u0111\u01B0\u1EE3c l\xE0m l\u1EA1i ngay l\u1EADp t\u1EE9c v\u1EDBi th\xEAm 15 gi\xE2y h\u1ED3i ph\u1EE5c! (L\u01B0\u1EE3t n\xE0y kh\xF4ng th\u1EC3 d\xF9ng th\xEAm)`
        });
        return { success: true, correct: false, earnedPoints: 0, state };
      }
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
        explanation: currentFullQuestion.explanation
      };
      state.historyLog.push({
        id: `log_${Date.now()}`,
        timestamp: Date.now(),
        type: "answer_wrong",
        playerId,
        playerName: player.name,
        message: `\u2717 Ch\u01B0a ch\xEDnh x\xE1c! \u0110\xE1p \xE1n l\xE0: ${currentFullQuestion.answer}. L\xE1 b\xE0i b\u1ECB h\u1EE7y, chuy\u1EC3n l\u01B0\u1EE3t!`
      });
      state.currentQuestion = void 0;
      state.currentCard = void 0;
      session.currentFullQuestion = void 0;
      session.pendingCard = void 0;
      this.switchTurn(state);
      this.checkAiTurn(gameId);
      return {
        success: true,
        correct: false,
        earnedPoints: 0,
        state,
        explanation: currentFullQuestion.explanation
      };
    }
  }
  // BANK ACTION
  bank(gameId, playerId) {
    const session = this.games.get(gameId);
    if (!session) return { success: false, state: {} };
    const { state } = session;
    const player = state.players[playerId];
    if (state.currentPlayerId !== playerId) return { success: false, state };
    if (state.currentQuestion) return { success: false, state };
    let bankScore = player.currentTurnScore;
    if (canTriggerRune(player, "rune_bank_bonus")) {
      triggerRune(player, "rune_bank_bonus");
      bankScore += 15;
      state.historyLog.push({
        id: `log_${Date.now()}`,
        timestamp: Date.now(),
        type: "rune_used",
        playerId,
        playerName: player.name,
        message: `\u{1F4B0} [KHO B\xC1U (1 L\u1EA6N/L\u01AF\u1EE2T)] k\xEDch ho\u1EA1t khi Bank: Th\u01B0\u1EDFng th\xEAm +15 \u0111i\u1EC3m tr\u1EF1c ti\u1EBFp v\xE0o kho an to\xE0n!`
      });
    }
    player.safeScore += bankScore;
    player.currentTurnScore = 0;
    state.tableCards = [];
    state.historyLog.push({
      id: `log_${Date.now()}`,
      timestamp: Date.now(),
      type: "bank",
      playerId,
      playerName: player.name,
      message: `\u{1F3E6} BANK TH\xC0NH C\xD4NG! ${player.name} c\u1EA5t gi\u1EEF +${bankScore} \u0111i\u1EC3m (T\u1ED5ng an to\xE0n: ${player.safeScore}\u0111).`
    });
    if (player.safeScore >= state.targetScore) {
      const opp = Object.values(state.players).find((p) => p.id !== playerId);
      if (opp && canTriggerRune(opp, "rune_immortal")) {
        triggerRune(opp, "rune_immortal");
        player.safeScore = Math.max(120, state.targetScore - 30);
        state.historyLog.push({
          id: `log_${Date.now()}`,
          timestamp: Date.now(),
          type: "rune_used",
          playerId: opp.id,
          playerName: opp.name,
          message: `\u{1F451} [B\u1EA4T T\u1EEC C\u1EA2NH GI\u1EDAI - DUY NH\u1EA4T 1 L\u1EA6N/TR\u1EACN] c\u1EE7a ${opp.name} ph\xE1t huy uy l\u1EF1c! Ch\u1EB7n \u0111\u1EE9ng chi\u1EBFn th\u1EAFng c\u1EE7a \u0111\u1ED1i th\u1EE7, gi\u1EA3m 30 \u0111i\u1EC3m v\xE0 m\u1EDF ra v\xF2ng \u0111\u1EA5u l\u1ED9i ng\u01B0\u1EE3c d\xF2ng! (\u0110\xE3 ti\xEAu hao h\u1EBFt tr\u1EADn)`
        });
        this.switchTurn(state);
        this.checkAiTurn(gameId);
        return { success: true, state };
      }
      state.status = "game_over";
      state.winnerId = playerId;
      state.historyLog.push({
        id: `log_${Date.now()}`,
        timestamp: Date.now(),
        type: "game_over",
        playerId,
        playerName: player.name,
        message: `\u{1F451} CHI\u1EBEN TH\u1EAENG! ${player.name} \u0111\xE3 ch\u1EA1m m\u1ED1c ${state.targetScore} \u0111i\u1EC3m v\xE0 tr\u1EDF th\xE0nh Nh\xE0 V\xF4 \u0110\u1ECBch!`
      });
      this.recordGameOver(state);
      return { success: true, state };
    }
    this.switchTurn(state);
    this.checkAiTurn(gameId);
    return { success: true, state };
  }
  // SURRENDER / FORFEIT ACTION
  surrender(gameId, playerId) {
    const session = this.games.get(gameId);
    if (!session) return { success: false, state: {} };
    const { state } = session;
    const player = state.players[playerId];
    if (!player || state.status === "game_over") {
      return { success: false, state };
    }
    if (session.aiTimer) {
      clearTimeout(session.aiTimer);
      session.aiTimer = void 0;
    }
    const opponent = Object.values(state.players).find((p) => p.id !== playerId);
    state.status = "game_over";
    state.winnerId = opponent ? opponent.id : void 0;
    state.aiThinkingStatus = null;
    state.historyLog.push({
      id: `log_${Date.now()}`,
      timestamp: Date.now(),
      type: "surrender",
      playerId,
      playerName: player.name,
      message: `\u{1F3F3}\uFE0F ${player.name} \u0111\xE3 gi\u01B0\u01A1ng c\u1EDD tr\u1EAFng \u0110\u1EA6U H\xC0NG! ${opponent ? `${opponent.name} gi\xE0nh chi\u1EBFn th\u1EAFng vinh quang!` : "Tr\u1EADn \u0111\u1EA5u k\u1EBFt th\xFAc."}`
    });
    this.recordGameOver(state);
    return { success: true, state };
  }
  // USE RUNE ACTION (for active powers like Swap Question or Purify)
  useRune(gameId, playerId, runeId) {
    const session = this.games.get(gameId);
    if (!session) return { success: false, message: "Game kh\xF4ng t\u1ED3n t\u1EA1i", state: {} };
    const { state } = session;
    const player = state.players[playerId];
    if (state.currentPlayerId !== playerId) {
      return { success: false, message: "Ch\u01B0a t\u1EDBi l\u01B0\u1EE3t c\u1EE7a b\u1EA1n!", state };
    }
    const runeDef = ALL_RUNES.find((r) => r.id === runeId);
    const rName = runeDef?.name || runeId;
    if (!canTriggerRune(player, runeId)) {
      if (runeDef?.limitType === "once_per_match") {
        return { success: false, message: `${rName} l\xE0 \u1EA5n ch\xFA t\u1ED1i th\u01B0\u1EE3ng ch\u1EC9 \u0111\u01B0\u1EE3c d\xF9ng DUY NH\u1EA4T 1 L\u1EA6N trong c\u1EA3 tr\u1EADn \u0111\u1EA5u (\u0111\xE3 ti\xEAu hao)!`, state };
      }
      return { success: false, message: `${rName} ch\u1EC9 \u0111\u01B0\u1EE3c k\xEDch ho\u1EA1t 1 L\u1EA6N M\u1ED6I L\u01AF\u1EE2T (\u0111\xE3 s\u1EED d\u1EE5ng trong l\u01B0\u1EE3t n\xE0y)!`, state };
    }
    switch (runeId) {
      case "rune_swap_question":
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
            level: newQ.level
          };
          state.questionStartTime = Date.now();
          state.questionTimeLimit = 55;
          state.historyLog.push({
            id: `log_${Date.now()}`,
            timestamp: Date.now(),
            type: "rune_used",
            playerId,
            playerName: player.name,
            message: `\u{1F504} [HO\xC1N \u0110\u1ED4I (1 L\u1EA6N/L\u01AF\u1EE2T)] \u0111\xE3 \u0111\u1ED5i c\xE2u h\u1ECFi sang c\xE2u m\u1EDBi v\xE0 l\xE0m m\u1EDBi th\u1EDDi gian!`
          });
          return { success: true, message: "\u0110\xE3 \u0111\u1ED5i c\xE2u h\u1ECFi th\xE0nh c\xF4ng!", state };
        }
        return { success: false, message: "Ch\u1EC9 c\xF3 th\u1EC3 \u0111\u1ED5i c\xE2u h\u1ECFi khi \u0111ang gi\u1EA3i to\xE1n!", state };
      case "rune_purify":
        if (state.tableCards.length > 0) {
          triggerRune(player, runeId);
          const removed = state.tableCards.pop();
          state.historyLog.push({
            id: `log_${Date.now()}`,
            timestamp: Date.now(),
            type: "rune_used",
            playerId,
            playerName: player.name,
            message: `\u{1FAB6} [THANH L\u1ECCC (1 L\u1EA6N/L\u01AF\u1EE2T)] \u0111\xE3 lo\u1EA1i b\u1ECF l\xE1 [${removed.domainNameVi}] kh\u1ECFi b\xE0n \u0111\u1EA5u \u0111\u1EC3 tr\xE1nh tr\xF9ng h\u1EC7!`
          });
          return { success: true, message: `\u0110\xE3 thanh l\u1ECDc l\xE1 ${removed.domainNameVi}!`, state };
        }
        return { success: false, message: "Kh\xF4ng c\xF3 l\xE1 b\xE0i n\xE0o tr\xEAn b\xE0n \u0111\u1EC3 thanh l\u1ECDc!", state };
      case "rune_shield":
        triggerRune(player, runeId);
        state.activeShield = true;
        state.historyLog.push({
          id: `log_${Date.now()}`,
          timestamp: Date.now(),
          type: "rune_used",
          playerId,
          playerName: player.name,
          message: `\u{1F6E1}\uFE0F ${player.name} k\xEDch ho\u1EA1t Khi\xEAn Ch\u1EAFn (1 l\u1EA7n/l\u01B0\u1EE3t) b\u1EA3o m\u1EC7nh cho l\u1EA7n r\xFAt ti\u1EBFp theo!`
        });
        return { success: true, message: "Khi\xEAn ch\u1EAFn s\u1EB5n s\xE0ng!", state };
      case "rune_double":
        triggerRune(player, runeId);
        state.doublePointsActive = true;
        state.historyLog.push({
          id: `log_${Date.now()}`,
          timestamp: Date.now(),
          type: "rune_used",
          playerId,
          playerName: player.name,
          message: `\u2728 ${player.name} k\xEDch ho\u1EA1t hi\u1EC7u \u1EE9ng nh\xE2n \u0111\xF4i \u0111i\u1EC3m s\u1ED1 (1 l\u1EA7n/l\u01B0\u1EE3t)!`
        });
        return { success: true, message: "Hi\u1EC7u \u1EE9ng nh\xE2n \u0111i\u1EC3m k\xEDch ho\u1EA1t!", state };
      default:
        return { success: true, message: `${rName} l\xE0 \u1EA5n ch\xFA n\u1ED9i t\u1EA1i k\xEDch ho\u1EA1t t\u1EF1 \u0111\u1ED9ng theo \u0111i\u1EC1u ki\u1EC7n thi \u0111\u1EA5u!`, state };
    }
  }
  switchTurn(state) {
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
    Object.values(state.players).forEach((p) => {
      p.runeUsedThisTurn = false;
      p.runes.forEach((slot) => {
        slot.usedThisTurn = false;
        const def = ALL_RUNES.find((r) => r.id === slot.runeId);
        if (def?.limitType === "once_per_match") {
          if (!slot.usedInMatch) {
            slot.usesLeft = 1;
            slot.active = true;
          } else {
            slot.usesLeft = 0;
            slot.active = false;
          }
        } else if (def?.limitType === "once_per_turn") {
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
      type: "turn_switch",
      playerId: nextPlayer.id,
      playerName: nextPlayer.name,
      message: `T\u1EDBi l\u01B0\u1EE3t c\u1EE7a ${nextPlayer.name}! (Hi\u1EC7u \u1EE9ng Rune c\u1EE7a l\u01B0\u1EE3t m\u1EDBi \u0111\xE3 s\u1EB5n s\xE0ng)`
    });
  }
  // Realistic AI player decision-making with extended thinking time
  checkAiTurn(gameId) {
    const session = this.games.get(gameId);
    if (!session) return;
    const { state } = session;
    if (state.status !== "playing") return;
    const curPlayer = state.players[state.currentPlayerId];
    if (!curPlayer?.isAi) {
      state.aiThinkingStatus = null;
      return;
    }
    if (session.aiTimer) clearTimeout(session.aiTimer);
    const diff = state.aiDifficulty || "medium";
    const isSolvingQuestion = !!state.currentQuestion;
    state.aiThinkingStatus = isSolvingQuestion ? "solving" : "thinking";
    this.notifyState(gameId, isSolvingQuestion ? "ai_solving" : "ai_thinking");
    let thinkDelay = 5500;
    if (isSolvingQuestion) {
      if (diff === "easy") thinkDelay = 5e3 + Math.random() * 2e3;
      else if (diff === "medium") thinkDelay = 6500 + Math.random() * 2500;
      else thinkDelay = 7500 + Math.random() * 2500;
    } else {
      if (diff === "easy") thinkDelay = 3800 + Math.random() * 1500;
      else if (diff === "medium") thinkDelay = 4500 + Math.random() * 2e3;
      else thinkDelay = 5500 + Math.random() * 2e3;
    }
    session.aiTimer = setTimeout(() => {
      this.executeAiTurn(gameId);
    }, thinkDelay);
  }
  executeAiTurn(gameId) {
    const session = this.games.get(gameId);
    if (!session) return;
    const { state } = session;
    const ai = state.players[state.currentPlayerId];
    if (!ai || !ai.isAi || state.status !== "playing") return;
    if (state.currentQuestion && session.currentFullQuestion) {
      const diff2 = state.aiDifficulty || "medium";
      let accuracyRate = 0.65;
      if (diff2 === "easy") accuracyRate = 0.5;
      if (diff2 === "hard") accuracyRate = 0.8;
      const answersCorrectly = Math.random() < accuracyRate;
      let finalAnswer = session.currentFullQuestion.answer;
      if (!answersCorrectly) {
        if (session.currentFullQuestion.options) {
          const wrongOpts = session.currentFullQuestion.options.filter((o) => o !== finalAnswer);
          finalAnswer = wrongOpts[Math.floor(Math.random() * wrongOpts.length)] || "0";
        } else {
          finalAnswer = (parseInt(finalAnswer, 10) + 1).toString();
        }
      }
      state.aiThinkingStatus = null;
      const res = this.answerQuestion(gameId, ai.id, finalAnswer);
      this.notifyState(gameId, res.correct ? "answer_correct" : "answer_wrong", {
        explanation: res.explanation
      });
      setTimeout(() => this.checkAiTurn(gameId), 4e3);
      return;
    }
    if (ai.safeScore + ai.currentTurnScore >= state.targetScore) {
      state.aiThinkingStatus = null;
      this.bank(gameId, ai.id);
      this.notifyState(gameId, "bank");
      return;
    }
    const tableCount = state.tableCards.length;
    const currentScore = ai.currentTurnScore;
    const diff = state.aiDifficulty || "medium";
    let shouldBank = false;
    if (diff === "easy") {
      shouldBank = tableCount >= 2 || currentScore >= 16;
    } else if (diff === "medium") {
      shouldBank = tableCount >= 3 || currentScore >= 26;
    } else {
      shouldBank = tableCount >= 4 || currentScore >= 38;
    }
    if (shouldBank && currentScore > 0) {
      state.aiThinkingStatus = null;
      this.bank(gameId, ai.id);
      this.notifyState(gameId, "bank");
    } else {
      state.aiThinkingStatus = null;
      const res = this.drawCard(gameId, ai.id);
      this.notifyState(gameId, res.isBust ? "bust" : "card_drawn");
      if (!res.isBust) {
        setTimeout(() => this.checkAiTurn(gameId), 3500);
      }
    }
  }
  recordGameOver(state) {
    Object.values(state.players).forEach((p) => {
      if (p.isAi) return;
      const isWin = p.id === state.winnerId;
      const totalQ = p.stats.correctCount + p.stats.wrongCount;
      const acc = totalQ > 0 ? Math.round(p.stats.correctCount / totalQ * 100) : 0;
      const opp = Object.values(state.players).find((o) => o.id !== p.id);
      db.recordMatch({
        id: `match_${Date.now()}_${p.id.substr(0, 5)}`,
        userId: p.id,
        opponentName: opp?.name || "\u0110\u1ED1i th\u1EE7",
        isWin,
        score: p.safeScore,
        accuracy: acc,
        correctAnswers: p.stats.correctCount,
        totalQuestions: totalQ,
        busts: p.stats.bustCount,
        maxCombo: p.stats.comboMax,
        mode: state.mode,
        timestamp: Date.now()
      });
    });
  }
};
var gameEngine = new GameEngine();

// server/websocket/wsHandler.ts
var WebSocketHandler = class {
  constructor(server) {
    this.clients = /* @__PURE__ */ new Map();
    this.rooms = /* @__PURE__ */ new Map();
    this.quickMatchQueue = [];
    this.wss = new import_ws.WebSocketServer({ server, path: "/ws" });
    this.wss.on("connection", (ws) => {
      this.handleConnection(ws);
    });
    gameEngine.onStateChange = (gameId, state, event, extra) => {
      this.broadcastToGame(gameId, "game_state_update", {
        event,
        state,
        ...extra
      });
    };
    console.log("Realtime WebSocket Server initialized on path /ws");
  }
  handleConnection(ws) {
    const conn = {
      ws,
      userId: `guest_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      userName: "Kh\xE1ch",
      avatar: "\u{1F9D9}\u200D\u2642\uFE0F"
    };
    this.clients.set(ws, conn);
    ws.on("message", (message) => {
      try {
        const data = JSON.parse(message.toString());
        this.handleMessage(conn, data);
      } catch (e) {
        console.error("Error handling WebSocket message:", e);
      }
    });
    ws.on("close", () => {
      this.handleDisconnect(conn);
    });
  }
  handleMessage(conn, data) {
    const { type, payload } = data;
    switch (type) {
      case "identify": {
        conn.userId = payload.userId || conn.userId;
        conn.userName = payload.userName || conn.userName;
        conn.avatar = payload.avatar || conn.avatar;
        this.send(conn.ws, "identified", { userId: conn.userId });
        break;
      }
      case "create_room": {
        const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        const gameId = `game_${roomCode}_${Date.now()}`;
        const mathLevel = payload.mathLevel || "CO_BAN";
        const gameState = gameEngine.createGame({
          gameId,
          roomCode,
          mode: "pvp",
          mathLevel,
          player1: {
            id: conn.userId,
            name: conn.userName,
            avatar: conn.avatar,
            runes: payload.equippedRunes
          }
        });
        conn.gameId = gameId;
        conn.roomCode = roomCode;
        this.rooms.set(roomCode, {
          gameId,
          roomCode,
          hostUserId: conn.userId,
          mathLevel,
          players: [{ userId: conn.userId, userName: conn.userName, avatar: conn.avatar }]
        });
        this.send(conn.ws, "room_created", {
          roomCode,
          gameId,
          state: gameState
        });
        break;
      }
      case "join_room": {
        const roomCode = payload.roomCode?.toUpperCase();
        const room = this.rooms.get(roomCode);
        if (!room) {
          this.send(conn.ws, "error", { message: "Kh\xF4ng t\xECm th\u1EA5y ph\xF2ng v\u1EDBi m\xE3 n\xE0y." });
          return;
        }
        const gameState = gameEngine.joinGame(room.gameId, {
          id: conn.userId,
          name: conn.userName,
          avatar: conn.avatar,
          runes: payload.equippedRunes
        });
        if (!gameState) {
          this.send(conn.ws, "error", { message: "Ph\xF2ng \u0111\xE3 \u0111\u1EA7y ho\u1EB7c kh\xF4ng th\u1EC3 tham gia." });
          return;
        }
        conn.gameId = room.gameId;
        conn.roomCode = roomCode;
        room.players.push({ userId: conn.userId, userName: conn.userName, avatar: conn.avatar });
        this.broadcastToRoom(roomCode, "game_state_update", {
          event: "player_joined",
          state: gameState
        });
        break;
      }
      case "quick_match": {
        this.quickMatchQueue = this.quickMatchQueue.filter((c) => c.ws.readyState === import_ws.WebSocket.OPEN && c.userId !== conn.userId);
        if (this.quickMatchQueue.length > 0) {
          const opponent = this.quickMatchQueue.shift();
          const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
          const gameId = `quick_${roomCode}_${Date.now()}`;
          const mathLevel = payload.mathLevel || "CO_BAN";
          const gameState = gameEngine.createGame({
            gameId,
            roomCode,
            mode: "pvp",
            mathLevel,
            player1: {
              id: opponent.userId,
              name: opponent.userName,
              avatar: opponent.avatar
            },
            player2: {
              id: conn.userId,
              name: conn.userName,
              avatar: conn.avatar,
              runes: payload.equippedRunes
            }
          });
          conn.gameId = gameId;
          conn.roomCode = roomCode;
          opponent.gameId = gameId;
          opponent.roomCode = roomCode;
          this.rooms.set(roomCode, {
            gameId,
            roomCode,
            hostUserId: opponent.userId,
            mathLevel,
            players: [
              { userId: opponent.userId, userName: opponent.userName, avatar: opponent.avatar },
              { userId: conn.userId, userName: conn.userName, avatar: conn.avatar }
            ]
          });
          this.send(opponent.ws, "match_found", { state: gameState, roomCode });
          this.send(conn.ws, "match_found", { state: gameState, roomCode });
        } else {
          this.quickMatchQueue.push(conn);
          this.send(conn.ws, "searching_match", { status: "waiting" });
        }
        break;
      }
      case "cancel_quick_match": {
        this.quickMatchQueue = this.quickMatchQueue.filter((c) => c.userId !== conn.userId);
        this.send(conn.ws, "quick_match_cancelled", {});
        break;
      }
      case "start_ai_game": {
        const gameId = `ai_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
        const gameState = gameEngine.createGame({
          gameId,
          roomCode: "SOLO_AI",
          mode: "ai",
          aiDifficulty: payload.aiDifficulty || "medium",
          mathLevel: payload.mathLevel || "CO_BAN",
          player1: {
            id: conn.userId,
            name: conn.userName,
            avatar: conn.avatar,
            runes: payload.equippedRunes
          }
        });
        conn.gameId = gameId;
        conn.roomCode = "SOLO_AI";
        this.send(conn.ws, "ai_game_started", { state: gameState });
        break;
      }
      case "action:draw": {
        const gameId = conn.gameId || payload.gameId;
        if (!gameId) return;
        const res = gameEngine.drawCard(gameId, conn.userId);
        if (!res.success) {
          this.send(conn.ws, "action_error", { message: res.error });
          return;
        }
        this.broadcastGameUpdate(conn, res.state, res.isBust ? "bust" : "card_drawn");
        break;
      }
      case "action:answer": {
        const gameId = conn.gameId || payload.gameId;
        if (!gameId) return;
        const res = gameEngine.answerQuestion(gameId, conn.userId, payload.answer);
        if (!res.success) return;
        this.broadcastGameUpdate(conn, res.state, res.correct ? "answer_correct" : "answer_wrong", {
          explanation: res.explanation
        });
        break;
      }
      case "action:bank": {
        const gameId = conn.gameId || payload.gameId;
        if (!gameId) return;
        const res = gameEngine.bank(gameId, conn.userId);
        if (!res.success) return;
        this.broadcastGameUpdate(conn, res.state, "bank");
        break;
      }
      case "action:rune": {
        const gameId = conn.gameId || payload.gameId;
        if (!gameId) return;
        const res = gameEngine.useRune(gameId, conn.userId, payload.runeId);
        if (!res.success) {
          this.send(conn.ws, "action_error", { message: res.message });
          return;
        }
        this.broadcastGameUpdate(conn, res.state, "rune_used", { message: res.message });
        break;
      }
      case "action:choose_rune_draft": {
        const gameId = conn.gameId || payload.gameId;
        if (!gameId) return;
        const res = gameEngine.chooseDraftRune(gameId, conn.userId, payload.runeId);
        if (!res.success) {
          this.send(conn.ws, "action_error", { message: res.error });
          return;
        }
        this.broadcastGameUpdate(conn, res.state, "rune_chosen");
        break;
      }
      case "action:surrender": {
        const gameId = conn.gameId || payload.gameId;
        if (!gameId) return;
        const res = gameEngine.surrender(gameId, conn.userId);
        if (!res.success) return;
        this.broadcastGameUpdate(conn, res.state, "surrender");
        break;
      }
      case "get_state": {
        const gameId = conn.gameId || payload.gameId;
        if (gameId) {
          const st = gameEngine.getGame(gameId);
          if (st) {
            this.send(conn.ws, "game_state_update", { state: st });
          }
        }
        break;
      }
    }
  }
  broadcastGameUpdate(sender, state, event, extra) {
    if (sender.roomCode && sender.roomCode !== "SOLO_AI") {
      this.broadcastToRoom(sender.roomCode, "game_state_update", {
        event,
        state,
        ...extra
      });
    } else {
      this.send(sender.ws, "game_state_update", {
        event,
        state,
        ...extra
      });
    }
  }
  broadcastToGame(gameId, type, payload) {
    for (const [_, client] of this.clients.entries()) {
      if (client.gameId === gameId && client.ws.readyState === import_ws.WebSocket.OPEN) {
        this.send(client.ws, type, payload);
      }
    }
  }
  broadcastToRoom(roomCode, type, payload) {
    for (const [_, client] of this.clients.entries()) {
      if (client.roomCode === roomCode && client.ws.readyState === import_ws.WebSocket.OPEN) {
        this.send(client.ws, type, payload);
      }
    }
  }
  send(ws, type, payload) {
    if (ws.readyState === import_ws.WebSocket.OPEN) {
      ws.send(JSON.stringify({ type, payload }));
    }
  }
  handleDisconnect(conn) {
    this.clients.delete(conn.ws);
    this.quickMatchQueue = this.quickMatchQueue.filter((c) => c.ws !== conn.ws);
    if (conn.roomCode && conn.roomCode !== "SOLO_AI") {
      this.broadcastToRoom(conn.roomCode, "player_disconnected", {
        userId: conn.userId,
        userName: conn.userName
      });
    }
  }
};

// server.ts
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  const server = import_http.default.createServer(app);
  new WebSocketHandler(server);
  app.post("/api/auth/register", (req, res) => {
    try {
      const { username, email, password, avatar } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: "Vui l\xF2ng nh\u1EADp \u0111\u1EA7y \u0111\u1EE7 t\xEAn t\xE0i kho\u1EA3n v\xE0 m\u1EADt kh\u1EA9u." });
      }
      const existing = db.findUserByUsername(username);
      if (existing) {
        return res.status(400).json({ error: "T\xEAn ng\u01B0\u1EDDi d\xF9ng \u0111\xE3 \u0111\u01B0\u1EE3c s\u1EED d\u1EE5ng." });
      }
      const newUser = db.createUser(username, email || "", password, avatar || "\u{1F9D9}\u200D\u2642\uFE0F");
      const profile = db.getProfile(newUser.id);
      return res.json({
        user: { id: newUser.id, username: newUser.username, avatar: newUser.avatar, role: newUser.role },
        profile
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  });
  app.post("/api/auth/login", (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: "Vui l\xF2ng nh\u1EADp t\xEAn t\xE0i kho\u1EA3n v\xE0 m\u1EADt kh\u1EA9u." });
      }
      const user = db.findUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "T\xE0i kho\u1EA3n kh\xF4ng t\u1ED3n t\u1EA1i." });
      }
      const isMatch = import_bcryptjs2.default.compareSync(password, user.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ error: "M\u1EADt kh\u1EA9u kh\xF4ng ch\xEDnh x\xE1c." });
      }
      const profile = db.getProfile(user.id);
      return res.json({
        user: { id: user.id, username: user.username, avatar: user.avatar, role: user.role },
        profile
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  });
  app.post("/api/auth/guest", (req, res) => {
    try {
      const randomGuestName = `Ph\xE1p S\u01B0 #${Math.floor(1e3 + Math.random() * 9e3)}`;
      const avatars = ["\u{1F9D9}\u200D\u2642\uFE0F", "\u{1F52E}", "\u26A1", "\u{1F409}", "\u2728", "\u{1F98A}", "\u{1F985}", "\u{1F989}"];
      const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
      const guestUser = db.createUser(randomGuestName, "", Math.random().toString(), randomAvatar);
      const profile = db.getProfile(guestUser.id);
      return res.json({
        user: { id: guestUser.id, username: guestUser.username, avatar: guestUser.avatar, role: guestUser.role },
        profile
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  });
  app.get("/api/profile/:id", (req, res) => {
    const profile = db.getProfile(req.params.id);
    if (!profile) return res.status(404).json({ error: "Kh\xF4ng t\xECm th\u1EA5y h\u1ED3 s\u01A1." });
    return res.json(profile);
  });
  app.put("/api/profile/:id/runes", (req, res) => {
    const { runes } = req.body;
    if (!Array.isArray(runes) || runes.length === 0) {
      return res.status(400).json({ error: "C\u1EA7n ch\u1ECDn \xEDt nh\u1EA5t 1 Rune \u0111\u1EC3 trang b\u1ECB!" });
    }
    const updated = db.updateProfile(req.params.id, { equippedRunes: runes });
    return res.json(updated);
  });
  app.get("/api/profile/:id/history", (req, res) => {
    const history = db.getUserMatchHistory(req.params.id);
    return res.json(history);
  });
  app.get("/api/leaderboard", (req, res) => {
    const filter = req.query.filter || "all";
    const list = db.getLeaderboard(filter);
    return res.json(list);
  });
  app.get("/api/cards", (_req, res) => {
    return res.json(DECK_60_CARDS);
  });
  app.get("/api/runes", (_req, res) => {
    return res.json(ALL_RUNES);
  });
  app.get("/api/questions", (_req, res) => {
    const custom = db.getCustomQuestions();
    return res.json([...CURATED_QUESTIONS, ...custom]);
  });
  app.get("/api/admin/stats", (_req, res) => {
    const allUsers = db.getAllUsers();
    return res.json({
      totalUsers: allUsers.length,
      totalQuestions: CURATED_QUESTIONS.length + db.getCustomQuestions().length,
      totalCards: DECK_60_CARDS.length,
      totalRunes: ALL_RUNES.length,
      systemStatus: "Operational",
      activeMemoryUsage: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`
    });
  });
  app.get("/api/admin/users", (_req, res) => {
    const users = db.getAllUsers();
    return res.json(users);
  });
  app.post("/api/admin/questions", (req, res) => {
    const { question, formula, options, answer, explanation, timeLimit, difficulty, category, level } = req.body;
    if (!question || !answer || !category) {
      return res.status(400).json({ error: "Thi\u1EBFu th\xF4ng tin c\xE2u h\u1ECFi b\u1EAFt bu\u1ED9c." });
    }
    const newQ = {
      id: `ADMIN_${Date.now()}`,
      question,
      formula: formula || void 0,
      options: options || void 0,
      answer,
      explanation: explanation || "L\u1EDDi gi\u1EA3i chi ti\u1EBFt t\u1EEB Ban Qu\u1EA3n Tr\u1ECB.",
      timeLimit: timeLimit || 15,
      difficulty: difficulty || 2,
      category,
      level: level || "THCS"
    };
    db.addCustomQuestion(newQ);
    return res.json({ success: true, question: newQ });
  });
  app.delete("/api/admin/questions/:id", (req, res) => {
    db.deleteCustomQuestion(req.params.id);
    return res.json({ success: true });
  });
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false
      },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path2.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(import_path2.default.join(distPath, "index.html"));
    });
  }
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`\u2728 Math Rune Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
//# sourceMappingURL=server.cjs.map
