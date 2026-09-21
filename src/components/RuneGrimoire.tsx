import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Check, Shield, Zap, AlertCircle, Info, Flame, Clock, HeartHandshake } from 'lucide-react';
import { ALL_RUNES } from '../../shared/runes.ts';
import { RuneCategory, RuneDef } from '../../shared/types.ts';

interface RuneGrimoireProps {
  equippedRunes: string[];
  onUpdateRunes: (runes: string[]) => void;
  onBack: () => void;
}

export const RuneGrimoire: React.FC<RuneGrimoireProps> = ({
  equippedRunes,
  onUpdateRunes,
  onBack,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  // Enforce 1 single rune selection as requested by the user
  const initialRuneId = (equippedRunes && equippedRunes.length > 0) ? equippedRunes[0] : 'rune_shield';
  const [selectedRuneId, setSelectedRuneId] = useState<string>(initialRuneId);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const categories: { id: string; name: string }[] = [
    { id: 'all', name: 'Tất Cả (16 Ấn)' },
    { id: 'defense', name: '🛡️ Phòng Thủ & Hồi Sinh' },
    { id: 'time', name: '⏳ Kéo Dài Thời Gian' },
    { id: 'score', name: '💎 Nhân Điểm & Combo' },
    { id: 'magic', name: '✨ Phù Phép Đặc Biệt' },
  ];

  const handleSelectRune = (runeId: string) => {
    setSelectedRuneId(runeId);
    setSaveSuccess(false);
  };

  const handleSave = () => {
    if (!selectedRuneId) return;
    onUpdateRunes([selectedRuneId]);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const filteredRunes = ALL_RUNES.filter(
    r => activeCategory === 'all' || r.category === activeCategory
  );

  const activeRuneDef = ALL_RUNES.find(r => r.id === selectedRuneId);

  // Helper to describe activation mechanism
  const getActivationGuide = (rune: RuneDef) => {
    switch (rune.id) {
      case 'rune_shield':
        return 'Tự động kích hoạt: Bảo vệ bạn 1 lần khi rút trùng hệ với lá trên bàn.';
      case 'rune_revive':
        return 'Tự động kích hoạt khi BUST: Giữ nguyên điểm an toàn và kết thúc lượt không mất gì.';
      case 'rune_retry':
        return 'Tự động kích hoạt khi trả lời sai: Cho bạn làm lại câu hỏi với thêm 10 giây.';
      case 'rune_timestop':
        return 'Chủ động bấm: Thêm +15 giây vào đồng hồ đếm ngược câu hỏi hiện tại.';
      case 'rune_slow':
        return 'Chủ động bấm: Làm chậm thời gian, hỗ trợ suy nghĩ câu hỏi toán phức tạp.';
      case 'rune_multiplier':
        return 'Chủ động bấm: Nhân đôi điểm số đạt được của câu hỏi tiếp theo.';
      case 'rune_combo':
        return 'Chủ động bấm: Tăng chỉ số Combo lên mức tối đa ngay lập tức.';
      case 'rune_clairvoyance':
        return 'Chủ động bấm trước khi rút bài: Dự báo hệ bài sắp xuất hiện để né BUST.';
      case 'rune_purify':
        return 'Chủ động bấm: Xóa sạch các lá bài trên bàn, loại bỏ 100% nguy cơ BUST.';
      case 'rune_swap':
        return 'Chủ động bấm: Đổi câu hỏi khó sang một câu hỏi khác cùng hệ toán.';
      default:
        return 'Kích hoạt trong lượt của bạn để xoay chuyển cục diện trận đấu.';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay Lại Sảnh Chính</span>
        </button>

        <div className="flex items-center gap-2 px-3 py-1 bg-purple-950/40 border border-purple-800/40 rounded-full text-xs font-mono text-purple-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Grimoire: Chọn Duy Nhất 1 Rune Bảo Mệnh</span>
        </div>
      </div>

      <div className="text-center space-y-1">
        <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-purple-200">
          THƯ VIỆN CỔ NGỮ RUNE & TÁC DỤNG PHÁP THUẬT
        </h2>
        <p className="text-xs text-slate-400 max-w-xl mx-auto">
          Mỗi trận đấu, pháp sư chỉ được chọn <strong>duy nhất 1 lá Rune</strong> để bảo mệnh và thi triển phép thuật. Hãy cân nhắc kỹ tác dụng của từng ấn chú!
        </p>
      </div>

      {/* CURRENTLY EQUIPPED 1-RUNE SHOWCASE */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border-2 border-amber-500/80 rounded-3xl space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider font-cinzel">
              1 RUNE ĐANG TRANG BỊ VÀO TRẬN ĐẤU (1/1)
            </span>
          </div>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all active:scale-95"
          >
            {saveSuccess ? '✓ Đã Lưu Rune Vào Hồ Sơ!' : 'Lưu Trang Bị Này'}
          </button>
        </div>

        {activeRuneDef ? (
          <div className="p-3.5 bg-slate-950/80 border border-indigo-500/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border-2 shrink-0 shadow-lg"
                style={{
                  backgroundColor: `${activeRuneDef.color}22`,
                  borderColor: activeRuneDef.color,
                }}
              >
                {activeRuneDef.icon}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-slate-100 font-cinzel">
                    {activeRuneDef.name}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-800">
                    {activeRuneDef.categoryNameVi}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-950 text-amber-300 border border-amber-700">
                    Tối đa {activeRuneDef.maxUses} lần/trận
                  </span>
                </div>
                <div className="text-xs text-amber-300/95 font-medium flex items-center gap-1.5 pt-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span><strong>Tác dụng:</strong> {activeRuneDef.description}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-light flex items-center gap-1.5">
                  <Info className="w-3 h-3 text-slate-500 shrink-0" />
                  <span>{getActivationGuide(activeRuneDef)}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-400 italic p-3">Chưa chọn Rune nào. Hãy bấm vào một Rune bên dưới.</div>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl border whitespace-nowrap transition-all ${
              activeCategory === c.id
                ? 'bg-purple-600 border-purple-400 text-white shadow-lg scale-102'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Runes Grid with Explicit Effect and Usage Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRunes.map(rune => {
          const isSelected = selectedRuneId === rune.id;

          return (
            <div
              key={rune.id}
              onClick={() => handleSelectRune(rune.id)}
              style={{
                borderColor: isSelected ? rune.color : '#334155',
                boxShadow: isSelected ? `0 0 20px ${rune.color}44` : undefined,
              }}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between hover:scale-[1.02] relative ${
                isSelected
                  ? 'bg-indigo-950/70 border-amber-400 ring-2 ring-amber-400/40'
                  : 'bg-slate-900 hover:bg-slate-850 hover:border-slate-600'
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase flex items-center gap-1 shadow">
                  <Check className="w-3 h-3 stroke-[3]" /> Đang Trang Bị
                </div>
              )}

              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border shrink-0"
                    style={{
                      backgroundColor: `${rune.color}22`,
                      borderColor: rune.color,
                    }}
                  >
                    {rune.icon}
                  </div>
                  <div>
                    <h3 className="font-cinzel text-sm font-bold text-slate-100" style={{ color: rune.color }}>
                      {rune.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-0.5">
                      <span>{rune.categoryNameVi}</span>
                      <span>•</span>
                      <span className="text-amber-300">Dùng {rune.maxUses} lần/trận</span>
                    </div>
                  </div>
                </div>

                {/* TÁC DỤNG CỦA RUNE (RẤT RÕ RÀNG VÀ NỔI BẬT) */}
                <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1">
                  <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Tác dụng chính:</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-normal">
                    {rune.description}
                  </p>
                </div>

                {/* HƯỚNG DẪN KÍCH HOẠT */}
                <div className="text-[10px] text-slate-400 flex items-start gap-1 font-light italic">
                  <Info className="w-3 h-3 text-slate-500 shrink-0 mt-0.5" />
                  <span>{getActivationGuide(rune)}</span>
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-slate-500">Mã: #{rune.id}</span>
                <button
                  type="button"
                  className={`font-bold px-3 py-1 rounded-lg text-xs transition-colors ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 font-black'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {isSelected ? '✓ Đang Dùng' : 'Chọn Rune Này'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
