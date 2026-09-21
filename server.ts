import express from 'express';
import http from 'http';
import path from 'path';
import bcrypt from 'bcryptjs';
import { db } from './server/database/db.ts';
import { DECK_60_CARDS } from './shared/cards.ts';
import { ALL_RUNES } from './shared/runes.ts';
import { CURATED_QUESTIONS } from './server/questions/questionBank.ts';
import { WebSocketHandler } from './server/websocket/wsHandler.ts';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Create HTTP server for both Express and WebSocket
  const server = http.createServer(app);
  new WebSocketHandler(server);

  // ==========================================
  // AUTH REST APIS
  // ==========================================
  app.post('/api/auth/register', (req, res) => {
    try {
      const { username, email, password, avatar } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: 'Vui lòng nhập đầy đủ tên tài khoản và mật khẩu.' });
      }

      const existing = db.findUserByUsername(username);
      if (existing) {
        return res.status(400).json({ error: 'Tên người dùng đã được sử dụng.' });
      }

      const newUser = db.createUser(username, email || '', password, avatar || '🧙‍♂️');
      const profile = db.getProfile(newUser.id);
      return res.json({
        user: { id: newUser.id, username: newUser.username, avatar: newUser.avatar, role: newUser.role },
        profile,
      });
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  });

  app.post('/api/auth/login', (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: 'Vui lòng nhập tên tài khoản và mật khẩu.' });
      }

      const user = db.findUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: 'Tài khoản không tồn tại.' });
      }

      const isMatch = bcrypt.compareSync(password, user.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Mật khẩu không chính xác.' });
      }

      const profile = db.getProfile(user.id);
      return res.json({
        user: { id: user.id, username: user.username, avatar: user.avatar, role: user.role },
        profile,
      });
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  });

  app.post('/api/auth/guest', (req, res) => {
    try {
      const randomGuestName = `Pháp Sư #${Math.floor(1000 + Math.random() * 9000)}`;
      const avatars = ['🧙‍♂️', '🔮', '⚡', '🐉', '✨', '🦊', '🦅', '🦉'];
      const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
      const guestUser = db.createUser(randomGuestName, '', Math.random().toString(), randomAvatar);
      const profile = db.getProfile(guestUser.id);
      return res.json({
        user: { id: guestUser.id, username: guestUser.username, avatar: guestUser.avatar, role: guestUser.role },
        profile,
      });
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  });

  // ==========================================
  // PROFILE & LEADERBOARD APIS
  // ==========================================
  app.get('/api/profile/:id', (req, res) => {
    const profile = db.getProfile(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Không tìm thấy hồ sơ.' });
    return res.json(profile);
  });

  app.put('/api/profile/:id/runes', (req, res) => {
    const { runes } = req.body;
    if (!Array.isArray(runes) || runes.length === 0) {
      return res.status(400).json({ error: 'Cần chọn ít nhất 1 Rune để trang bị!' });
    }
    const updated = db.updateProfile(req.params.id, { equippedRunes: runes });
    return res.json(updated);
  });

  app.get('/api/profile/:id/history', (req, res) => {
    const history = db.getUserMatchHistory(req.params.id);
    return res.json(history);
  });

  app.get('/api/leaderboard', (req, res) => {
    const filter = (req.query.filter as any) || 'all';
    const list = db.getLeaderboard(filter);
    return res.json(list);
  });

  // ==========================================
  // STATIC CARD & RUNE METADATA APIS
  // ==========================================
  app.get('/api/cards', (_req, res) => {
    return res.json(DECK_60_CARDS);
  });

  app.get('/api/runes', (_req, res) => {
    return res.json(ALL_RUNES);
  });

  app.get('/api/questions', (_req, res) => {
    const custom = db.getCustomQuestions();
    return res.json([...CURATED_QUESTIONS, ...custom]);
  });

  // ==========================================
  // ADMIN PANEL APIS
  // ==========================================
  app.get('/api/admin/stats', (_req, res) => {
    const allUsers = db.getAllUsers();
    return res.json({
      totalUsers: allUsers.length,
      totalQuestions: CURATED_QUESTIONS.length + db.getCustomQuestions().length,
      totalCards: DECK_60_CARDS.length,
      totalRunes: ALL_RUNES.length,
      systemStatus: 'Operational',
      activeMemoryUsage: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
    });
  });

  app.get('/api/admin/users', (_req, res) => {
    const users = db.getAllUsers();
    return res.json(users);
  });

  app.post('/api/admin/questions', (req, res) => {
    const { question, formula, options, answer, explanation, timeLimit, difficulty, category, level } = req.body;
    if (!question || !answer || !category) {
      return res.status(400).json({ error: 'Thiếu thông tin câu hỏi bắt buộc.' });
    }
    const newQ = {
      id: `ADMIN_${Date.now()}`,
      question,
      formula: formula || undefined,
      options: options || undefined,
      answer,
      explanation: explanation || 'Lời giải chi tiết từ Ban Quản Trị.',
      timeLimit: timeLimit || 15,
      difficulty: difficulty || 2,
      category,
      level: level || 'THCS',
    };
    db.addCustomQuestion(newQ);
    return res.json({ success: true, question: newQ });
  });

  app.delete('/api/admin/questions/:id', (req, res) => {
    db.deleteCustomQuestion(req.params.id);
    return res.json({ success: true });
  });

  // ==========================================
  // VITE MIDDLEWARE / PRODUCTION STATIC SERVING
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ Math Rune Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
