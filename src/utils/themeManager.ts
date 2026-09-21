export interface ThemeDef {
  id: string;
  name: string;
  icon: string;
  previewColor: string;
  bgHex: string;
  bgClass: string;
  gradientOverlay: string;
  accentBorder: string;
  description: string;
}

export const GAME_THEMES: ThemeDef[] = [
  {
    id: 'void',
    name: 'Hư Không Dạ Khúc',
    icon: '🌌',
    previewColor: '#020617',
    bgHex: '#020617',
    bgClass: 'bg-slate-950',
    gradientOverlay: 'from-slate-950 via-slate-900/50 to-slate-950',
    accentBorder: 'border-slate-800',
    description: 'Bầu trời đêm huyền bí với sắc đen thẫm chuẩn mực.',
  },
  {
    id: 'violet',
    name: 'Cung Điện Bí Ẩn',
    icon: '🔮',
    previewColor: '#0b051d',
    bgHex: '#0b051d',
    bgClass: 'bg-[#0b051d]',
    gradientOverlay: 'from-[#0b051d] via-purple-950/30 to-[#0b051d]',
    accentBorder: 'border-purple-900/60',
    description: 'Sắc tím ma thuật của các đại pháp sư cổ ngữ Rune.',
  },
  {
    id: 'emerald',
    name: 'Rừng Rậm Ma Pháp',
    icon: '🌲',
    previewColor: '#031510',
    bgHex: '#031510',
    bgClass: 'bg-[#031510]',
    gradientOverlay: 'from-[#031510] via-emerald-950/30 to-[#031510]',
    accentBorder: 'border-emerald-900/60',
    description: 'Màu lục bảo rêu phong thanh tịnh và tập trung cao độ.',
  },
  {
    id: 'crimson',
    name: 'Huyết Nguyệt Chiến Trận',
    icon: '🍷',
    previewColor: '#18040a',
    bgHex: '#18040a',
    bgClass: 'bg-[#18040a]',
    gradientOverlay: 'from-[#18040a] via-rose-950/30 to-[#18040a]',
    accentBorder: 'border-rose-900/60',
    description: 'Sắc đỏ thẫm hừng hực tinh thần chiến binh quyết tử.',
  },
  {
    id: 'ocean',
    name: 'Hải Triều Thần Thoại',
    icon: '🌊',
    previewColor: '#02131e',
    bgHex: '#02131e',
    bgClass: 'bg-[#02131e]',
    gradientOverlay: 'from-[#02131e] via-sky-950/30 to-[#02131e]',
    accentBorder: 'border-cyan-900/60',
    description: 'Đại dương vực thẳm bao la, tri thức sâu thẳm vô biên.',
  },
  {
    id: 'amber',
    name: 'Mật Thất Cổ Thư',
    icon: '📜',
    previewColor: '#150f05',
    bgHex: '#150f05',
    bgClass: 'bg-[#150f05]',
    gradientOverlay: 'from-[#150f05] via-amber-950/30 to-[#150f05]',
    accentBorder: 'border-amber-900/60',
    description: 'Sắc vàng mật ong ấm áp như trang sách toán học cổ điển.',
  },
];

export const getSavedTheme = (): ThemeDef => {
  if (typeof window === 'undefined') return GAME_THEMES[0];
  const savedId = localStorage.getItem('mathrune_theme_id');
  const found = GAME_THEMES.find(t => t.id === savedId);
  return found || GAME_THEMES[0];
};

export const saveTheme = (themeId: string): ThemeDef => {
  const theme = GAME_THEMES.find(t => t.id === themeId) || GAME_THEMES[0];
  if (typeof window !== 'undefined') {
    localStorage.setItem('mathrune_theme_id', theme.id);
    document.documentElement.style.setProperty('--bg-game', theme.bgHex);
  }
  return theme;
};
