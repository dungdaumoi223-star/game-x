import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Medal, Crown, Flame, Sparkles } from 'lucide-react';
import { LeaderboardEntry } from '../../shared/types.ts';

interface LeaderboardViewProps {
  onBack: () => void;
  currentUserId?: string;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ onBack, currentUserId }) => {
  const [filter, setFilter] = useState<'all' | 'weekly' | 'daily'>('all');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/leaderboard?filter=${filter}`)
      .then(res => res.json())
      .then(data => {
        setEntries(Array.isArray(data) ? data : []);
      })
      .catch(e => console.warn('Failed to fetch leaderboard:', e))
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay Lại Sảnh Chính</span>
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-950/40 border border-yellow-800/40 rounded-full text-xs font-mono text-yellow-300">
          <Trophy className="w-3.5 h-3.5" />
          <span>Bảng Vàng Danh Dự</span>
        </div>
      </div>

      <div className="text-center space-y-1">
        <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-amber-200">
          BẢNG XẾP HẠNG PHÁP SƯ
        </h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Vinh danh những kỳ thủ toán học có điểm số kỷ lục cao nhất và tỉ lệ thắng áp đảo.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-2">
        {[
          { id: 'all', label: 'Tất Cả Thời Gian' },
          { id: 'weekly', label: 'Tuần Này' },
          { id: 'daily', label: 'Hôm Nay' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-4 py-1.5 text-xs font-bold rounded-xl border transition-all ${
              filter === tab.id
                ? 'bg-amber-600 border-amber-400 text-slate-950 shadow-md'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Leaderboard Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-12 px-4 py-3 bg-slate-950/80 border-b border-slate-800 text-[11px] font-mono text-slate-400">
          <div className="col-span-2 sm:col-span-1 text-center">Hạng</div>
          <div className="col-span-6 sm:col-span-6">Pháp Sư</div>
          <div className="col-span-2 sm:col-span-2 text-center">Tỉ Lệ Thắng</div>
          <div className="col-span-2 sm:col-span-3 text-right">Điểm Kỷ Lục</div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500">Đang đồng bộ thứ hạng...</div>
        ) : entries.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">Chưa có dữ liệu xếp hạng.</div>
        ) : (
          <div className="divide-y divide-slate-800/60">
            {entries.map((entry, idx) => {
              const isCurrentUser = entry.userId === currentUserId;

              return (
                <div
                  key={entry.userId}
                  className={`grid grid-cols-12 items-center px-4 py-3 text-xs transition-colors ${
                    isCurrentUser
                      ? 'bg-amber-500/10 border-l-4 border-amber-400'
                      : idx % 2 === 0
                      ? 'bg-slate-900/40'
                      : 'bg-slate-900/80'
                  }`}
                >
                  {/* Rank */}
                  <div className="col-span-2 sm:col-span-1 text-center font-mono font-bold">
                    {idx === 0 ? (
                      <span className="text-xl">🥇</span>
                    ) : idx === 1 ? (
                      <span className="text-xl">🥈</span>
                    ) : idx === 2 ? (
                      <span className="text-xl">🥉</span>
                    ) : (
                      <span className="text-slate-400">#{idx + 1}</span>
                    )}
                  </div>

                  {/* Player Info */}
                  <div className="col-span-6 sm:col-span-6 flex items-center gap-2.5">
                    <span className="text-2xl">{entry.avatar}</span>
                    <div>
                      <div className="font-bold text-slate-100 flex items-center gap-1.5">
                        <span>{entry.username}</span>
                        {isCurrentUser && (
                          <span className="text-[9px] px-1.5 py-0.2 bg-amber-500 text-slate-950 font-black rounded-md">
                            BẠN
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-amber-400/90 font-mono">
                        Cấp {entry.level} • {entry.wins} Trận Thắng
                      </div>
                    </div>
                  </div>

                  {/* Win Rate */}
                  <div className="col-span-2 sm:col-span-2 text-center font-mono font-bold text-emerald-400">
                    {entry.winRate}%
                  </div>

                  {/* Highest Score */}
                  <div className="col-span-2 sm:col-span-3 text-right font-mono font-black text-amber-300 text-sm">
                    {entry.score}đ
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
