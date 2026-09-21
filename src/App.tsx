import React, { useState, useEffect } from 'react';
import { useGameSocket } from './hooks/useGameSocket.ts';
import { Header } from './components/Header.tsx';
import { MainMenu } from './components/MainMenu.tsx';
import { GameArena } from './components/GameArena.tsx';
import { OnlineLobby } from './components/OnlineLobby.tsx';
import { DeckViewer } from './components/DeckViewer.tsx';
import { RuneGrimoire } from './components/RuneGrimoire.tsx';
import { ProfileView } from './components/ProfileView.tsx';
import { LeaderboardView } from './components/LeaderboardView.tsx';
import { AdminPanel } from './components/AdminPanel.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { HowToPlayModal } from './components/HowToPlayModal.tsx';
import { ThemeModal } from './components/ThemeModal.tsx';
import { getSavedTheme, saveTheme, ThemeDef } from './utils/themeManager.ts';
import { MathLevel, AiDifficulty } from '../shared/types.ts';

type AppView = 'main' | 'online' | 'deck' | 'runes' | 'profile' | 'leaderboard' | 'admin';

export function App() {
  const {
    user,
    profile,
    gameState,
    connected,
    searchingMatch,
    lastBustAlert,
    errorMessage,
    loginAsGuest,
    login,
    register,
    logout,
    startAiGame,
    createRoom,
    joinRoom,
    startQuickMatch,
    cancelQuickMatch,
    chooseDraftRune,
    drawCard,
    submitAnswer,
    bank,
    useRune,
    surrender,
    exitGame,
    updateEquippedRunes,
  } = useGameSocket();

  const [currentView, setCurrentView] = useState<AppView>('main');
  const [mathLevel, setMathLevel] = useState<MathLevel>('CO_BAN');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [howToPlayOpen, setHowToPlayOpen] = useState(false);
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeDef>(getSavedTheme());

  const handleSelectTheme = (theme: ThemeDef) => {
    const saved = saveTheme(theme.id);
    setCurrentTheme(saved);
  };

  // Auto initialize guest account on first load if no user
  useEffect(() => {
    if (!user) {
      loginAsGuest();
    }
  }, [user, loginAsGuest]);

  return (
    <div
      style={{ backgroundColor: currentTheme.bgHex }}
      className={`min-h-screen text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950 transition-colors duration-300`}
    >
      {/* Top Navbar */}
      <Header
        user={user}
        profile={profile}
        connected={connected}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={logout}
        onNavigateHome={() => {
          if (!gameState) setCurrentView('main');
        }}
        currentView={currentView}
        currentTheme={currentTheme}
        onOpenThemeModal={() => setThemeModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1">
        {/* If GAME IS ACTIVE: show Game Arena */}
        {gameState ? (
          <GameArena
            gameState={gameState}
            currentUserId={user?.id || 'guest'}
            onDraw={drawCard}
            onSubmitAnswer={submitAnswer}
            onBank={bank}
            onUseRune={useRune}
            onChooseDraftRune={chooseDraftRune}
            onSurrender={surrender}
            onExit={exitGame}
            lastBustAlert={lastBustAlert}
            errorMessage={errorMessage}
          />
        ) : (
          <>
            {currentView === 'main' && (
              <MainMenu
                onStartAi={(diff, level) => startAiGame(diff, level)}
                onOpenOnline={() => setCurrentView('online')}
                onOpenDeck={() => setCurrentView('deck')}
                onOpenRunes={() => setCurrentView('runes')}
                onOpenProfile={() => setCurrentView('profile')}
                onOpenLeaderboard={() => setCurrentView('leaderboard')}
                onOpenAdmin={() => setCurrentView('admin')}
                onOpenHowToPlay={() => setHowToPlayOpen(true)}
                mathLevel={mathLevel}
                onSetMathLevel={setMathLevel}
              />
            )}

            {currentView === 'online' && (
              <OnlineLobby
                onBack={() => setCurrentView('main')}
                onQuickMatch={(level) => startQuickMatch(level)}
                onCancelQuickMatch={cancelQuickMatch}
                searchingMatch={searchingMatch}
                onCreateRoom={(level) => createRoom(level)}
                onJoinRoom={(code) => joinRoom(code)}
                mathLevel={mathLevel}
                onSetMathLevel={setMathLevel}
              />
            )}

            {currentView === 'deck' && (
              <DeckViewer onBack={() => setCurrentView('main')} />
            )}

            {currentView === 'runes' && (
              <RuneGrimoire
                equippedRunes={profile?.equippedRunes || []}
                onUpdateRunes={updateEquippedRunes}
                onBack={() => setCurrentView('main')}
              />
            )}

            {currentView === 'profile' && (
              <ProfileView
                profile={profile}
                onBack={() => setCurrentView('main')}
              />
            )}

            {currentView === 'leaderboard' && (
              <LeaderboardView
                onBack={() => setCurrentView('main')}
                currentUserId={user?.id}
              />
            )}

            {currentView === 'admin' && (
              <AdminPanel
                onBack={() => setCurrentView('main')}
                currentUserRole={user?.role}
              />
            )}
          </>
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLogin={login}
        onRegister={register}
        onGuestLogin={loginAsGuest}
      />

      {/* How To Play Modal */}
      <HowToPlayModal
        isOpen={howToPlayOpen}
        onClose={() => setHowToPlayOpen(false)}
      />

      {/* Theme Background Modal */}
      <ThemeModal
        isOpen={themeModalOpen}
        onClose={() => setThemeModalOpen(false)}
        currentTheme={currentTheme}
        onSelectTheme={handleSelectTheme}
      />
    </div>
  );
}

export default App;
