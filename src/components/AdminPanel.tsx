import React, { useState, useEffect } from 'react';
import { ArrowLeft, Shield, Plus, Trash2, Database, Users, BookOpen, CheckCircle, RefreshCw } from 'lucide-react';
import { MathLevel, MathCategory, Question } from '../../shared/types.ts';
import { MATH_DOMAINS } from '../../shared/cards.ts';

interface AdminPanelProps {
  onBack: () => void;
  currentUserRole?: string;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBack, currentUserRole }) => {
  const [stats, setStats] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'stats' | 'questions' | 'users'>('stats');

  // New question form state
  const [qText, setQText] = useState('');
  const [qFormula, setQFormula] = useState('');
  const [qAnswer, setQAnswer] = useState('');
  const [qOptions, setQOptions] = useState('');
  const [qExplanation, setQExplanation] = useState('');
  const [qCategory, setQCategory] = useState<MathCategory>('NGUYEN_TO');
  const [qLevel, setQLevel] = useState<MathLevel>('THCS');
  const [qTimeLimit, setQTimeLimit] = useState(15);
  const [formMsg, setFormMsg] = useState<string | null>(null);

  const fetchStats = () => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(e => console.warn(e));
  };

  const fetchQuestions = () => {
    fetch('/api/questions')
      .then(res => res.json())
      .then(data => setQuestions(Array.isArray(data) ? data : []))
      .catch(e => console.warn(e));
  };

  const fetchUsers = () => {
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => setUsers(Array.isArray(data) ? data : []))
      .catch(e => console.warn(e));
  };

  useEffect(() => {
    fetchStats();
    fetchQuestions();
    fetchUsers();
  }, []);

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText.trim() || !qAnswer.trim()) {
      setFormMsg('Vui lòng nhập câu hỏi và đáp án.');
      return;
    }

    const optionsArray = qOptions.trim()
      ? qOptions.split(',').map(s => s.trim()).filter(Boolean)
      : undefined;

    try {
      const res = await fetch('/api/admin/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: qText,
          formula: qFormula || undefined,
          answer: qAnswer,
          options: optionsArray,
          explanation: qExplanation,
          category: qCategory,
          level: qLevel,
          timeLimit: Number(qTimeLimit),
        }),
      });

      if (res.ok) {
        setFormMsg('✓ Đã thêm câu hỏi vào Ngân Hàng Đề!');
        setQText('');
        setQFormula('');
        setQAnswer('');
        setQOptions('');
        setQExplanation('');
        fetchQuestions();
        fetchStats();
        setTimeout(() => setFormMsg(null), 3000);
      } else {
        const d = await res.json();
        setFormMsg(`Lỗi: ${d.error}`);
      }
    } catch (err: any) {
      setFormMsg(`Lỗi kết nối: ${err.message}`);
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) return;
    try {
      await fetch(`/api/admin/questions/${id}`, { method: 'DELETE' });
      fetchQuestions();
      fetchStats();
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay Lại Sảnh Chính</span>
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-950/40 border border-amber-800/40 rounded-full text-xs font-mono text-amber-300">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span>Trang Quản Trị Hệ Thống (Admin Panel)</span>
        </div>
      </div>

      <div className="text-center space-y-1">
        <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-amber-200">
          QUẢN TRỊ VIÊN & HỆ THỐNG
        </h2>
        <p className="text-xs text-slate-400">
          Giám sát tài nguyên máy chủ, quản lý ngân hàng câu hỏi toán học và danh sách pháp sư.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2">
        {[
          { id: 'stats', label: '📊 Tổng Quan Máy Chủ' },
          { id: 'questions', label: '🧮 Ngân Hàng Câu Hỏi' },
          { id: 'users', label: '👥 Người Dùng' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
              activeTab === t.id
                ? 'bg-amber-600 border-amber-400 text-slate-950 shadow-md'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: SYSTEM STATS */}
      {activeTab === 'stats' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-center">
              <div className="text-xs text-slate-400">Tổng Người Dùng</div>
              <div className="text-2xl font-black text-amber-300 font-mono mt-1">
                {stats?.totalUsers ?? '...'}
              </div>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-center">
              <div className="text-xs text-slate-400">Tổng Câu Hỏi Toán</div>
              <div className="text-2xl font-black text-indigo-300 font-mono mt-1">
                {stats?.totalQuestions ?? '...'}
              </div>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-center">
              <div className="text-xs text-slate-400">Bộ Bài 10 Hệ</div>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                {stats?.totalCards ?? 60} Lá
              </div>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-center">
              <div className="text-xs text-slate-400">Bộ Ấn Chú</div>
              <div className="text-2xl font-black text-purple-300 font-mono mt-1">
                {stats?.totalRunes ?? 16} Rune
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 text-xs font-mono text-slate-300">
            <div className="flex justify-between">
              <span>Trạng Thái Hệ Thống:</span>
              <span className="text-emerald-400 font-bold">● Đang Hoạt Động (Healthy)</span>
            </div>
            <div className="flex justify-between">
              <span>Bộ Nhớ RAM Đang Chiếm:</span>
              <span className="text-amber-300">{stats?.activeMemoryUsage ?? '34 MB'}</span>
            </div>
            <div className="flex justify-between">
              <span>Engine Đồng Bộ:</span>
              <span className="text-indigo-300">WebSocket Authoritative Server</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: QUESTIONS MANAGEMENT */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          {/* Add Question Form */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <h3 className="font-cinzel text-sm font-bold text-amber-300 flex items-center gap-1.5">
              <Plus className="w-4 h-4" />
              <span>THÊM CÂU HỎI MỚI VÀO NGÂN HÀNG ĐỀ</span>
            </h3>

            {formMsg && (
              <div className="p-2.5 bg-indigo-950 border border-indigo-700 text-indigo-200 text-xs rounded-xl">
                {formMsg}
              </div>
            )}

            <form onSubmit={handleAddQuestion} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Nội dung câu hỏi (*):</label>
                  <input
                    type="text"
                    required
                    value={qText}
                    onChange={e => setQText(e.target.value)}
                    placeholder="VD: Số 29 có phải là số nguyên tố không?"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Công thức LaTeX / Ký hiệu:</label>
                  <input
                    type="text"
                    value={qFormula}
                    onChange={e => setQFormula(e.target.value)}
                    placeholder="VD: 29 \in \mathbb{P}"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Hệ Toán Học:</label>
                  <select
                    value={qCategory}
                    onChange={e => setQCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                  >
                    {Object.entries(MATH_DOMAINS).map(([k, v]) => (
                      <option key={k} value={k}>{v.nameVi} ({k})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Cấp Độ:</label>
                  <select
                    value={qLevel}
                    onChange={e => setQLevel(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                  >
                    <option value="THCS">THCS (Cấp 2)</option>
                    <option value="THPT">THPT (Cấp 3)</option>
                    <option value="DAI_HOC">Đại Học</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Thời Gian Trả Lời (giây):</label>
                  <input
                    type="number"
                    min={5}
                    max={60}
                    value={qTimeLimit}
                    onChange={e => setQTimeLimit(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Đáp Án Đúng (*):</label>
                  <input
                    type="text"
                    required
                    value={qAnswer}
                    onChange={e => setQAnswer(e.target.value)}
                    placeholder="VD: Có, hoặc 15, hoặc 4"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Các Lựa Chọn (cách nhau bởi dấu phẩy):</label>
                  <input
                    type="text"
                    value={qOptions}
                    onChange={e => setQOptions(e.target.value)}
                    placeholder="VD: Có, Không hoặc 12, 14, 15, 16"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Lời Giải Thích Chi Tiết:</label>
                <textarea
                  rows={2}
                  value={qExplanation}
                  onChange={e => setQExplanation(e.target.value)}
                  placeholder="Giải thích từng bước giúp người chơi học tập khi trả lời sai..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-bold rounded-xl shadow transition-all active:scale-95 uppercase"
              >
                Thêm Vào Ngân Hàng
              </button>
            </form>
          </div>

          {/* Questions List */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300">
              DANH SÁCH CÂU HỎI HIỆN CÓ ({questions.length} CÂU)
            </h4>
            <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
              {questions.map((q, i) => (
                <div
                  key={q.id || i}
                  className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-semibold text-slate-200">{q.question}</div>
                    {q.formula && <div className="font-mono text-amber-300">{q.formula}</div>}
                    <div className="text-[10px] text-slate-400 font-mono mt-1">
                      Hệ: {q.category} • Cấp: {q.level} • Đáp án: <strong className="text-emerald-400">{q.answer}</strong>
                    </div>
                  </div>

                  {q.id?.startsWith('ADMIN_') && (
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: USERS LIST */}
      {activeTab === 'users' && (
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <h3 className="font-cinzel text-sm font-bold text-slate-200">
            DANH SÁCH NGƯỜI DÙNG ({users.length} PHÁP SƯ)
          </h3>
          <div className="space-y-2">
            {users.map(u => (
              <div
                key={u.id}
                className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{u.avatar}</span>
                  <div>
                    <div className="font-bold text-slate-200">{u.username}</div>
                    <div className="text-[10px] font-mono text-slate-500">ID: {u.id} • Vai trò: {u.role}</div>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-500">
                  {new Date(u.createdAt).toLocaleDateString('vi-VN')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
