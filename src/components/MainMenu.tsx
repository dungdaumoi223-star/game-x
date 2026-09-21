import React, { useState } from 'react';
import {
  Swords,
  Globe,
  Layers,
  Sparkles,
  UserCheck,
  Trophy,
  Settings,
  Bot,
  Flame,
  Zap,
  GraduationCap,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { MathLevel, AiDifficulty } from '../../shared/types.ts';

interface MainMenuProps {
  onStartAi: (diff: AiDifficulty, level: MathLevel) => void;
  onOpenOnline: () => void;
  onOpenDeck: () => void;
  onOpenRunes: () => void;
  onOpenProfile: () => void;
  onOpenLeaderboard: () => void;
  onOpenAdmin: () => void;
  onOpenHowToPlay: () => void;
  mathLevel: MathLevel;
  onSetMathLevel: (level: MathLevel) => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onStartAi,
  onOpenOnline,
  onOpenDeck,
  onOpenRunes,
  onOpenProfile,
  onOpenLeaderboard,
  onOpenAdmin,
  onOpenHowToPlay,
  mathLevel,
  onSetMathLevel,
}) => {
  const [showAiConfig, setShowAiConfig] = useState(false);
  const [aiDiff, setAiDiff] = useState<AiDifficulty>('medium');

  const diffLabels: Record<AiDifficulty, { label: string; desc: string; color: string }> = {
    easy: { label: 'Dễ', desc: 'Thích hợp tân thủ, AI bank sớm, độ chính xác toán 55%', color: 'from-emerald-500 to-teal-600' },
    medium: { label: 'Trung Bình', desc: 'Đánh giá rủi ro cơ bản, độ chính xác toán 75%', color: 'from-amber-500 to-orange-600' },
    hard: { label: 'Khó', desc: 'Tính toán xác suất Bust & dùng Rune chiến thuật, chính xác 90%', color: 'from-rose-500 to-purple-600' },
    expert: { label: 'Chuyên Gia', desc: 'Đại kiện tướng AI, tối ưu hóa điểm kỳ vọng, chính xác 98%', color: 'from-purple-600 to-indigo-600' },
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      {/* Background Magic Runes Atmosphere */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
        <div className="w-[600px] h-[600px] rounded-full border-2 border-dashed border-amber-400 animate-rune-spin" />
        <div className="absolute w-[450px] h-[450px] rounded-full border border-indigo-400 animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto text-center space-y-6">
        {/* Fantasy Brand Header */}
        <div className="space-y-2 animate-float">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Card Battle • Push Your Luck • Real Math</span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600 drop-shadow-[0_2px_15px_rgba(245,158,11,0.3)]">
            MATH RUNE
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto font-light">
            Vận dụng kiến thức toán học và trực giác rủi ro để thức tỉnh ấn chú, thu thập điểm số và đánh bại mọi đối thủ.
          </p>
        </div>

        {/* Math Level Selector Badge */}
        <div className="flex items-center justify-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl max-w-sm mx-auto shadow-inner">
          {(['CO_BAN', 'THCS', 'THPT'] as MathLevel[]).map(lvl => (
            <button
              key={lvl}
              onClick={() => onSetMathLevel(lvl)}
              className={`flex-1 py-1.5 px-2 text-[11px] font-bold rounded-lg transition-all ${
                mathLevel === lvl
                  ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-slate-950 shadow-md scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lvl === 'CO_BAN' ? 'Dễ (Cơ bản)' : lvl === 'THCS' ? 'Vừa (Cấp 2)' : 'Nâng cao (Cấp 3)'}
            </button>
          ))}
        </div>

        {/* Main Menu Buttons */}
        <div className="space-y-3">
          {/* 1. CHƠI VỚI MÁY */}
          {!showAiConfig ? (
            <button
              onClick={() => setShowAiConfig(true)}
              className="group relative w-full flex items-center justify-between p-4 bg-gradient-to-r from-slate-900 to-indigo-950/80 hover:from-indigo-950 hover:to-purple-950 border border-indigo-800/50 hover:border-amber-500/80 rounded-2xl shadow-xl transition-all active:scale-[0.99]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-indigo-900/40 border border-indigo-700/50 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Swords className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-cinzel text-base sm:text-lg font-bold text-amber-200 group-hover:text-amber-100 flex items-center gap-2">
                    <span>⚔ CHƠI VỚI MÁY</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Luyện tập chiến thuật với 4 cấp độ AI thông minh
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <div className="p-4 bg-slate-900/95 border-2 border-amber-500/60 rounded-2xl shadow-2xl space-y-3 text-left animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between">
                <h3 className="font-cinzel text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-amber-400" />
                  <span>CHỌN ĐỘ KHÓ AI</span>
                </h3>
                <button
                  onClick={() => setShowAiConfig(false)}
                  className="text-xs text-slate-400 hover:text-slate-200 underline"
                >
                  Đóng
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {(['easy', 'medium', 'hard', 'expert'] as AiDifficulty[]).map(d => (
                  <button
                    key={d}
                    onClick={() => setAiDiff(d)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      aiDiff === d
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                    }`}
                  >
                    <div className="text-xs font-bold">{diffLabels[d].label}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">
                      {diffLabels[d].desc}
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => onStartAi(aiDiff, mathLevel)}
                className="w-full py-2.5 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all active:scale-95 text-center uppercase tracking-wider"
              >
                VÀO TRẬN NGAY (MỤC TIÊU 150 ĐIỂM)
              </button>
            </div>
          )}

          {/* 2. CHƠI ONLINE VỚI NGƯỜI */}
          <button
            onClick={onOpenOnline}
            className="group relative w-full flex items-center justify-between p-4 bg-gradient-to-r from-slate-900 to-purple-950/80 hover:from-purple-950 hover:to-indigo-950 border border-purple-800/50 hover:border-purple-400/80 rounded-2xl shadow-xl transition-all active:scale-[0.99]"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-purple-900/40 border border-purple-700/50 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                <Globe className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-cinzel text-base sm:text-lg font-bold text-purple-200 group-hover:text-purple-100">
                  🌐 CHƠI ONLINE
                </div>
                <div className="text-[11px] text-slate-400">
                  Tìm trận ngẫu nhiên hoặc tạo phòng riêng đấu bạn bè
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Quick 2x2 Submenu Grid */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            {/* 3. BỘ BÀI (60 Cards) */}
            <button
              onClick={onOpenDeck}
              className="flex items-center gap-3 p-3 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-xl text-left transition-all group"
            >
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-105 transition-transform">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-200 group-hover:text-amber-300">
                  🃏 BỘ BÀI (60 LÁ)
                </div>
                <div className="text-[10px] text-slate-400">10 hệ toán học</div>
              </div>
            </button>

            {/* 4. RUNE (16 Runes) */}
            <button
              onClick={onOpenRunes}
              className="flex items-center gap-3 p-3 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-xl text-left transition-all group"
            >
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-200 group-hover:text-purple-300">
                  🔮 RUNE (16 ẤN)
                </div>
                <div className="text-[10px] text-slate-400">Trang bị 3 Rune</div>
              </div>
            </button>

            {/* 5. HỒ SƠ & THỐNG KÊ */}
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-3 p-3 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-xl text-left transition-all group"
            >
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-300">
                  👤 HỒ SƠ & TIẾN ĐỘ
                </div>
                <div className="text-[10px] text-slate-400">Thống kê học tập</div>
              </div>
            </button>

            {/* 6. BẢNG XẾP HẠNG */}
            <button
              onClick={onOpenLeaderboard}
              className="flex items-center gap-3 p-3 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-xl text-left transition-all group"
            >
              <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 group-hover:scale-105 transition-transform">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-200 group-hover:text-yellow-300">
                  🏆 XẾP HẠNG
                </div>
                <div className="text-[10px] text-slate-400">Top Cao Thủ</div>
              </div>
            </button>
          </div>

          {/* Footer Action Buttons: How to Play & Admin */}
          <div className="flex items-center justify-between pt-3 text-xs text-slate-400">
            <button
              onClick={onOpenHowToPlay}
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Luật Chơi & Cơ Chế Bust</span>
            </button>

            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 hover:text-indigo-300 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Quản Trị Viên (Admin)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
