import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Award, Target, Flame, History, BookOpen, User, CheckCircle, XCircle } from 'lucide-react';
import { UserProfile } from '../../shared/types.ts';

interface ProfileViewProps {
  profile: UserProfile | null;
  onBack: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ profile, onBack }) => {
  const [matchHistory, setMatchHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    if (!profile?.id) return;
    setLoadingHistory(true);
    fetch(`/api/profile/${profile.id}/history`)
      .then(res => res.json())
      .then(data => {
        setMatchHistory(Array.isArray(data) ? data : []);
      })
      .catch(e => console.warn('Failed to load history:', e))
      .finally(() => setLoadingHistory(false));
  }, [profile?.id]);

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center text-slate-400 space-y-4">
        <p>Vui lòng đăng nhập hoặc chơi một trận để kích hoạt hồ sơ pháp sư!</p>
        <button onClick={onBack} className="px-4 py-2 bg-slate-800 text-slate-200 text-xs rounded-xl">
          Quay Lại Sảnh
        </button>
      </div>
    );
  }

  // Calculate XP to next level
  const xpCurrentLevel = profile.xp % 300;
  const xpPercent = Math.min(100, Math.round((xpCurrentLevel / 300) * 100));

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay Lại Sảnh Chính</span>
        </button>

        <span className="text-xs font-mono text-amber-400">
          ID: {profile.id.substring(0, 10)}...
        </span>
      </div>

      {/* Profile Overview Card */}
      <div className="p-6 bg-slate-900 border-2 border-indigo-700/60 rounded-3xl space-y-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl bg-indigo-950 border-2 border-amber-400 flex items-center justify-center text-4xl shadow-lg">
            {profile.avatar}
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h2 className="font-cinzel text-xl sm:text-2xl font-black text-amber-200">
                {profile.username}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold self-center sm:self-auto">
                {profile.rankTitle}
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Cấp Độ {profile.level} • Tổng Điểm Tích Lũy: {profile.xp} XP
            </p>

            {/* Level XP Bar */}
            <div className="space-y-1 pt-2">
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>Tiến Độ Cấp {profile.level + 1}</span>
                <span>{xpCurrentLevel} / 300 XP ({xpPercent}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  style={{ width: `${xpPercent}%` }}
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Stat Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800 font-mono">
          <div className="p-3 bg-slate-950 rounded-xl text-center">
            <div className="text-[10px] text-slate-400">Tổng Trận</div>
            <div className="text-lg font-black text-slate-100">{profile.totalGames}</div>
            <div className="text-[10px] text-slate-500">{profile.wins} Thắng / {profile.losses} Bại</div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl text-center">
            <div className="text-[10px] text-slate-400">Tỉ Lệ Thắng</div>
            <div className="text-lg font-black text-emerald-400">{profile.winRate}%</div>
            <div className="text-[10px] text-emerald-600">Đấu Xếp Hạng</div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl text-center">
            <div className="text-[10px] text-slate-400">Điểm Kỷ Lục</div>
            <div className="text-lg font-black text-amber-300">{profile.highestScore}đ</div>
            <div className="text-[10px] text-amber-500">Trong một trận</div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl text-center">
            <div className="text-[10px] text-slate-400">Rune Đang Đeo</div>
            <div className="text-lg font-black text-purple-300">{profile.equippedRunes?.length || 1}/1</div>
            <div className="text-[10px] text-purple-500">Ấn chú bảo mệnh</div>
          </div>
        </div>
      </div>

      {/* Match History Table */}
      <div className="space-y-3">
        <h3 className="font-cinzel text-base font-bold text-slate-200 flex items-center gap-2">
          <History className="w-4 h-4 text-amber-400" />
          <span>LỊCH SỬ THI ĐẤU GẦN ĐÂY</span>
        </h3>

        {loadingHistory ? (
          <div className="p-6 text-center text-xs text-slate-500">Đang tải lịch sử đấu...</div>
        ) : matchHistory.length === 0 ? (
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 text-center text-xs text-slate-400">
            Chưa có trận đấu nào được ghi lại. Hãy tham gia một ván đấu với AI hoặc Online!
          </div>
        ) : (
          <div className="space-y-2">
            {matchHistory.map(m => (
              <div
                key={m.id}
                className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl text-xs font-black ${
                    m.isWin ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'
                  }`}>
                    {m.isWin ? 'THẮNG' : 'THUA'}
                  </div>

                  <div>
                    <div className="text-xs font-bold text-slate-200">
                      Đấu với: <span className="text-amber-300">{m.opponentName}</span> ({m.mode.toUpperCase()})
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono flex items-center gap-3 mt-0.5">
                      <span>Điểm: {m.score}đ</span>
                      <span>Chính xác: {m.accuracy}% ({m.correctAnswers}/{m.totalQuestions})</span>
                      <span>Bust: {m.busts} lần</span>
                    </div>
                  </div>
                </div>

                <div className="text-right text-[10px] text-slate-500 font-mono">
                  {new Date(m.timestamp).toLocaleDateString('vi-VN')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
