import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Wifi, WifiOff, Sparkles, User, LogOut, Shield, Palette } from 'lucide-react';
import { sound } from '../utils/soundEffects.ts';
import { UserProfile } from '../../shared/types.ts';
import { ThemeDef } from '../utils/themeManager.ts';

interface HeaderProps {
  user: { id: string; username: string; avatar: string; role: string } | null;
  profile: UserProfile | null;
  connected: boolean;
  onOpenAuth: () => void;
  onLogout: () => void;
  onNavigateHome: () => void;
  currentView: string;
  currentTheme: ThemeDef;
  onOpenThemeModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  profile,
  connected,
  onOpenAuth,
  onLogout,
  onNavigateHome,
  currentView,
  currentTheme,
  onOpenThemeModal,
}) => {
  const [isMuted, setIsMuted] = useState(sound.getIsMuted());
  const [isBgmOn, setIsBgmOn] = useState(sound.getIsBgmPlaying());

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleBgm = () => {
    const bgm = sound.toggleBgm();
    setIsBgmOn(bgm);
  };

  // Tài khoản Khách do hệ thống tự tạo có tên dạng "Pháp Sư #1234"
  const isGuest = !!user && /^Pháp Sư #\d{4}$/.test(user.username);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-3 sm:px-6 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-indigo-600 to-purple-500 p-0.5 shadow-lg shadow-indigo-950/50 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-amber-400 font-cinzel font-bold text-lg">
              🧮
            </div>
          </div>
          <div>
            <span className="font-cinzel text-base sm:text-lg font-black tracking-wide bg-gradient-to-r from-amber-200 via-yellow-100 to-purple-200 bg-clip-text text-transparent group-hover:text-amber-300">
              MATH RUNE
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest text-indigo-400 ml-1.5 uppercase">
              Draw & Solve
            </span>
          </div>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Connection Status */}
          <div
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border ${
              connected
                ? 'bg-emerald-950/40 border-emerald-800/50 text-emerald-300'
                : 'bg-rose-950/40 border-rose-800/50 text-rose-300 animate-pulse'
            }`}
          >
            {connected ? <Wifi className="w-3.5 h-3.5 text-emerald-400" /> : <WifiOff className="w-3.5 h-3.5 text-rose-400" />}
            <span>{connected ? 'Trực Tuyến' : 'Mất Kết Nối'}</span>
          </div>

          {/* Sound Controls */}
          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            <button
              onClick={handleToggleMute}
              title={isMuted ? 'Bật âm thanh hiệu ứng' : 'Tắt âm thanh hiệu ứng'}
              className={`p-1.5 rounded-md text-xs transition-colors ${
                !isMuted ? 'text-amber-400 bg-slate-800/80' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handleToggleBgm}
              title={isBgmOn ? 'Tắt nhạc nền ma thuật' : 'Bật nhạc nền ma thuật'}
              className={`p-1.5 rounded-md text-xs transition-colors ${
                isBgmOn ? 'text-purple-400 bg-slate-800/80' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Music className="w-4 h-4" />
            </button>
          </div>

          {/* Theme Background Changer */}
          <button
            onClick={onOpenThemeModal}
            title="Đổi màu nền chiến trận"
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs text-amber-300 transition-all shadow-sm hover:scale-105 active:scale-95"
          >
            <span className="text-sm leading-none">{currentTheme.icon}</span>
            <span className="hidden sm:inline font-medium text-[11px] text-slate-200">Đổi Nền</span>
          </button>

          {/* User Account / Profile */}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-2 sm:px-3 py-1 bg-slate-900 border border-slate-800 rounded-xl">
                <span className="text-lg leading-none">{user.avatar}</span>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-slate-200 truncate max-w-[100px]">
                    {user.username}
                  </div>
                  <div className="text-[10px] font-mono text-amber-400">
                    Lv.{profile?.level || 1} • {profile?.xp || 0} XP
                  </div>
                </div>
              </div>
              {isGuest ? (
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-lg shadow-md transition-all active:scale-95"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Đăng Nhập / Đăng Ký</span>
                </button>
              ) : (
                <button
                  onClick={onLogout}
                  title="Đăng xuất"
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-lg shadow-md transition-all active:scale-95"
            >
              <User className="w-3.5 h-3.5" />
              <span>Đăng Nhập</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
