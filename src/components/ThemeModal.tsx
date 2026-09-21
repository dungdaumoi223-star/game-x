import React from 'react';
import { X, Check, Palette, Sparkles } from 'lucide-react';
import { GAME_THEMES, ThemeDef } from '../utils/themeManager.ts';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemeDef;
  onSelectTheme: (theme: ThemeDef) => void;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border-2 border-amber-500/70 rounded-3xl shadow-2xl p-6 text-slate-100 space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 mb-1 border border-amber-500/30">
            <Palette className="w-6 h-6" />
          </div>
          <h3 className="font-cinzel text-xl font-black text-amber-200">
            ĐỔI MÀU NỀN CHIẾN TRẬN
          </h3>
          <p className="text-xs text-slate-400">
            Chọn không gian ma thuật phù hợp với phong cách và thị giác của bạn
          </p>
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
          {GAME_THEMES.map(theme => {
            const isSelected = currentTheme.id === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => {
                  onSelectTheme(theme);
                }}
                style={{ backgroundColor: theme.bgHex }}
                className={`p-3 rounded-2xl border-2 text-left flex items-center justify-between transition-all group hover:scale-102 ${
                  isSelected
                    ? 'border-amber-400 ring-2 ring-amber-400/40 shadow-lg shadow-amber-950/50'
                    : 'border-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{theme.icon}</span>
                  <div>
                    <div className="text-xs font-bold text-slate-100 flex items-center gap-1">
                      {theme.name}
                    </div>
                    <div className="text-[10px] text-slate-400 line-clamp-1">
                      {theme.description}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black text-xs rounded-xl uppercase tracking-wider shadow"
          >
            Áp Dụng Màu Nền
          </button>
        </div>
      </div>
    </div>
  );
};
