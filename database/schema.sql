-- ==========================================================
-- MATH RUNE: DRAW & SOLVE - RELATIONAL DATABASE SCHEMA
-- Compatible with PostgreSQL / Supabase / Neon / Turso
-- ==========================================================

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    avatar VARCHAR(20) DEFAULT '🧙‍♂️',
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. PROFILES & PROGRESSION
CREATE TABLE IF NOT EXISTS profiles (
    user_id VARCHAR(64) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    level INTEGER DEFAULT 1,
    xp INTEGER DEFAULT 0,
    total_games INTEGER DEFAULT 0,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    win_rate NUMERIC(5,2) DEFAULT 0.00,
    highest_score INTEGER DEFAULT 0,
    rank_title VARCHAR(50) DEFAULT 'Tập Sự Phép Thuật',
    equipped_runes JSONB DEFAULT '["rune_revive", "rune_shield", "rune_freeze"]'::jsonb,
    unlocked_skins JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. CARDS REPOSITORY (60 CARDS)
CREATE TABLE IF NOT EXISTS cards (
    id VARCHAR(32) PRIMARY KEY,
    domain_id VARCHAR(32) NOT NULL,
    domain_name VARCHAR(50) NOT NULL,
    domain_name_vi VARCHAR(50) NOT NULL,
    point_value INTEGER NOT NULL,
    rarity VARCHAR(20) NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    skill_desc TEXT NOT NULL,
    element_color VARCHAR(20),
    accent_glow VARCHAR(50),
    icon_name VARCHAR(50)
);

-- 4. 16 RUNES DEFINITION
CREATE TABLE IF NOT EXISTS runes (
    id VARCHAR(32) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    category VARCHAR(20) NOT NULL,
    category_name_vi VARCHAR(50) NOT NULL,
    icon VARCHAR(50) NOT NULL,
    color VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    max_uses INTEGER DEFAULT 2,
    unlocked_level INTEGER DEFAULT 1
);

-- 5. QUESTIONS BANK
CREATE TABLE IF NOT EXISTS questions (
    id VARCHAR(64) PRIMARY KEY,
    question TEXT NOT NULL,
    formula TEXT,
    options JSONB,
    answer VARCHAR(255) NOT NULL,
    explanation TEXT,
    time_limit INTEGER DEFAULT 15,
    difficulty INTEGER DEFAULT 2,
    category VARCHAR(32) NOT NULL,
    level VARCHAR(20) DEFAULT 'THCS',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. ROOMS & LOBBY
CREATE TABLE IF NOT EXISTS rooms (
    room_code VARCHAR(12) PRIMARY KEY,
    host_user_id VARCHAR(64) REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'waiting', -- 'waiting', 'playing', 'closed'
    mode VARCHAR(10) DEFAULT 'pvp',
    math_level VARCHAR(20) DEFAULT 'THCS',
    target_score INTEGER DEFAULT 150,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. MATCH HISTORY
CREATE TABLE IF NOT EXISTS match_history (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    opponent_name VARCHAR(50) NOT NULL,
    is_win BOOLEAN NOT NULL,
    score INTEGER NOT NULL,
    accuracy NUMERIC(5,2) DEFAULT 0.00,
    correct_answers INTEGER DEFAULT 0,
    total_questions INTEGER DEFAULT 0,
    busts INTEGER DEFAULT 0,
    max_combo INTEGER DEFAULT 0,
    mode VARCHAR(10) DEFAULT 'pvp',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. INDEXES FOR HIGH-PERFORMANCE LEADERBOARD & QUERIES
CREATE INDEX IF NOT EXISTS idx_profiles_highest_score ON profiles(highest_score DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_xp ON profiles(xp DESC);
CREATE INDEX IF NOT EXISTS idx_match_history_user ON match_history(user_id);
CREATE INDEX IF NOT EXISTS idx_questions_category_level ON questions(category, level);
