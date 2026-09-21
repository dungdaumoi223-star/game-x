import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Sparkles, Layers, Zap, X, Info, ShieldCheck, Trophy } from 'lucide-react';
import { DECK_60_CARDS, MATH_DOMAINS } from '../../shared/cards.ts';
import { Card, CardRarity, MathCategory } from '../../shared/types.ts';

interface DeckViewerProps {
  onBack: () => void;
}

export const DeckViewer: React.FC<DeckViewerProps> = ({ onBack }) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectedCard, setInspectedCard] = useState<Card | null>(null);

  const filteredCards = DECK_60_CARDS.filter(card => {
    if (selectedDomain !== 'all' && card.domainId !== selectedDomain) return false;
    if (selectedRarity !== 'all' && card.rarity !== selectedRarity) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        card.skillName.toLowerCase().includes(q) ||
        card.domainNameVi.toLowerCase().includes(q) ||
        card.skillDesc.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const rarityColors: Record<CardRarity, { label: string; bg: string; text: string; border: string }> = {
    Common: { label: 'Phổ Biến', bg: 'bg-slate-800', text: 'text-slate-300', border: 'border-slate-700' },
    Rare: { label: 'Hiếm', bg: 'bg-blue-950', text: 'text-blue-300', border: 'border-blue-700' },
    Epic: { label: 'Cực Hiếm', bg: 'bg-purple-950', text: 'text-purple-300', border: 'border-purple-700' },
    Legendary: { label: 'Huyền Thoại', bg: 'bg-amber-950', text: 'text-amber-300', border: 'border-amber-500' },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay Lại Sảnh Chính</span>
        </button>

        <div className="flex items-center gap-2 px-3 py-1 bg-amber-950/40 border border-amber-800/40 rounded-full text-xs font-mono text-amber-300">
          <Layers className="w-3.5 h-3.5" />
          <span>Bộ Bài: 60 Lá (10 Hệ Toán Học)</span>
        </div>
      </div>

      <div className="text-center space-y-1">
        <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-amber-200">
          KHO BÁU BÀI & TÁC DỤNG MA PHÁP
        </h2>
        <p className="text-xs text-slate-400 max-w-xl mx-auto">
          Mỗi lá bài mang một Hệ Toán Học và <strong>Tác Dụng Kỹ Năng</strong> riêng. Bấm vào bất kỳ lá bài nào để xem phân tích tác dụng chi tiết!
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên lá bài, tác dụng, kỹ năng, hệ toán..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Rarity Selector */}
          <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedRarity('all')}
              className={`px-3 py-2 text-[11px] font-bold rounded-xl border whitespace-nowrap ${
                selectedRarity === 'all'
                  ? 'bg-amber-600 border-amber-400 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              Tất Cả Phẩm
            </button>
            {(['Common', 'Rare', 'Epic', 'Legendary'] as CardRarity[]).map(r => (
              <button
                key={r}
                onClick={() => setSelectedRarity(r)}
                className={`px-3 py-2 text-[11px] font-bold rounded-xl border whitespace-nowrap ${
                  selectedRarity === r
                    ? 'bg-amber-600 border-amber-400 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {rarityColors[r].label}
              </button>
            ))}
          </div>
        </div>

        {/* 10 Domains Carousel / Grid */}
        <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
          <button
            onClick={() => setSelectedDomain('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedDomain === 'all'
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200'
            }`}
          >
            Tất Cả (10 Hệ)
          </button>
          {Object.entries(MATH_DOMAINS).map(([key, dom]) => (
            <button
              key={key}
              onClick={() => setSelectedDomain(key)}
              style={{
                borderColor: selectedDomain === key ? dom.color : 'transparent',
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border transition-all ${
                selectedDomain === key
                  ? 'bg-slate-800 text-amber-200 shadow-md scale-105'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="mr-1">{dom.icon}</span>
              <span>{dom.nameVi}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
        {filteredCards.map(card => {
          const rInfo = rarityColors[card.rarity];
          return (
            <div
              key={card.id}
              onClick={() => setInspectedCard(card)}
              style={{ borderColor: card.elementColor, boxShadow: `0 0 10px ${card.accentGlow}` }}
              className="group relative bg-slate-900 border-2 rounded-2xl p-3.5 flex flex-col justify-between hover:scale-105 transition-all cursor-pointer shadow-md hover:border-amber-400"
            >
              {/* Header: Domain + Point */}
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span
                    className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md"
                    style={{ backgroundColor: `${card.elementColor}22`, color: card.elementColor }}
                  >
                    {card.domainNameVi}
                  </span>
                  <span className="font-mono text-base font-black text-amber-300">
                    +{card.pointValue}đ
                  </span>
                </div>

                <div className="text-sm font-bold text-slate-100 group-hover:text-amber-200 transition-colors">
                  {card.domainName}
                </div>

                {/* Tác dụng lá bài highlighted */}
                <div className="mt-2 p-2 bg-slate-950/70 border border-slate-800 rounded-xl space-y-0.5">
                  <div className="text-[10px] font-bold text-amber-300 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>Tác dụng: {card.skillName}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-3 font-light leading-relaxed">
                    {card.skillDesc}
                  </p>
                </div>
              </div>

              {/* Footer: Rarity pill */}
              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${rInfo.bg} ${rInfo.text} ${rInfo.border}`}>
                  {rInfo.label}
                </span>
                <span className="text-[10px] text-amber-400/80 font-bold group-hover:underline">
                  Chi tiết &raquo;
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* DETAILED CARD INSPECTION MODAL */}
      {inspectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            style={{ borderColor: inspectedCard.elementColor, boxShadow: `0 0 30px ${inspectedCard.accentGlow}` }}
            className="relative w-full max-w-lg bg-slate-900 border-2 rounded-3xl shadow-2xl p-6 text-slate-100 space-y-4"
          >
            <button
              onClick={() => setInspectedCard(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border-2"
                style={{
                  backgroundColor: `${inspectedCard.elementColor}22`,
                  borderColor: inspectedCard.elementColor,
                }}
              >
                🎴
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md"
                    style={{ backgroundColor: `${inspectedCard.elementColor}22`, color: inspectedCard.elementColor }}
                  >
                    {inspectedCard.domainNameVi}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    Phẩm: {rarityColors[inspectedCard.rarity].label}
                  </span>
                </div>
                <h3 className="font-cinzel text-xl font-black text-amber-200 mt-0.5">
                  {inspectedCard.domainName}
                </h3>
              </div>
            </div>

            {/* Score and Domain Core */}
            <div className="grid grid-cols-2 gap-2.5 font-mono text-center">
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400">ĐIỂM THƯỞNG KHI GIẢI ĐÚNG</div>
                <div className="text-xl font-black text-amber-300">+{inspectedCard.pointValue} điểm</div>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400">HỆ TOÁN HỌC</div>
                <div className="text-sm font-bold text-indigo-300 truncate mt-1">
                  {MATH_DOMAINS[inspectedCard.domainId]?.name || inspectedCard.domainId}
                </div>
              </div>
            </div>

            {/* TÁC DỤNG & KỸ NĂNG CHI TIẾT */}
            <div className="p-4 bg-amber-950/30 border border-amber-500/50 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>TÁC DỤNG & HIỆU ỨNG CHIẾN ĐẤU</span>
              </div>
              <div className="text-sm font-black text-amber-100">
                Kỹ năng: {inspectedCard.skillName}
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-light">
                {inspectedCard.skillDesc}
              </p>
            </div>

            {/* BẢN NGUYÊN HỆ TOÁN */}
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
              <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>Bản nguyên Hệ {inspectedCard.domainNameVi}:</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {MATH_DOMAINS[inspectedCard.domainId]?.description || 'Hệ toán học cổ điển trong Math Rune.'}
              </p>
            </div>

            <button
              onClick={() => setInspectedCard(null)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl uppercase tracking-wider transition-colors"
            >
              Đóng Chi Tiết Lá Bài
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

