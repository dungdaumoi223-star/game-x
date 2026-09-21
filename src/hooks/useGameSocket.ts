import { useState, useEffect, useRef, useCallback } from 'react';
import { GameState, MathLevel, UserProfile, LeaderboardEntry } from '../../shared/types.ts';
import { sound } from '../utils/soundEffects.ts';

export function useGameSocket() {
  const [user, setUser] = useState<{ id: string; username: string; avatar: string; role: string } | null>(() => {
    try {
      const saved = localStorage.getItem('mathrune_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [connected, setConnected] = useState(false);
  const [searchingMatch, setSearchingMatch] = useState(false);
  const [lastBustAlert, setLastBustAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Connect WebSocket
  const connect = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
      return;
    }

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;

    try {
      const socket = new WebSocket(wsUrl);
      wsRef.current = socket;

      socket.onopen = () => {
        setConnected(true);
        setErrorMessage(null);

        // Send identity if user exists
        if (user) {
          socket.send(JSON.stringify({
            type: 'identify',
            payload: {
              userId: user.id,
              userName: user.username,
              avatar: user.avatar,
            },
          }));
        }
      };

      socket.onmessage = (event) => {
        try {
          const { type, payload } = JSON.parse(event.data);

          switch (type) {
            case 'game_state_update': {
              setGameState(payload.state);
              if (payload.event === 'bust') {
                sound.playBust();
                setLastBustAlert(true);
                setTimeout(() => setLastBustAlert(false), 2000);
              } else if (payload.event === 'card_drawn') {
                sound.playDraw();
              } else if (payload.event === 'answer_correct') {
                sound.playCorrect();
              } else if (payload.event === 'answer_wrong') {
                sound.playWrong();
              } else if (payload.event === 'bank') {
                sound.playBank();
              } else if (payload.event === 'rune_used') {
                sound.playRuneActivate();
              }
              break;
            }

            case 'room_created': {
              setGameState(payload.state);
              break;
            }

            case 'match_found': {
              setSearchingMatch(false);
              setGameState(payload.state);
              sound.playCorrect();
              break;
            }

            case 'searching_match': {
              setSearchingMatch(true);
              break;
            }

            case 'quick_match_cancelled': {
              setSearchingMatch(false);
              break;
            }

            case 'ai_game_started': {
              setGameState(payload.state);
              sound.playCardFlip();
              break;
            }

            case 'action_error':
            case 'error': {
              setErrorMessage(payload.message);
              sound.playWrong();
              setTimeout(() => setErrorMessage(null), 4000);
              break;
            }
          }
        } catch (e) {
          console.error('Error parsing WS message:', e);
        }
      };

      socket.onclose = () => {
        setConnected(false);
        wsRef.current = null;
        // Auto-reconnect after 3s
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, 3000);
      };

      socket.onerror = () => {
        setConnected(false);
      };
    } catch (e) {
      console.warn('WebSocket connection error:', e);
    }
  }, [user]);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (wsRef.current) {
        wsRef.current.onclose = null;
        wsRef.current.onerror = null;
        wsRef.current.close();
      }
    };
  }, [connect]);

  // Sync profile when user changes
  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const res = await fetch(`/api/profile/${userId}`);
      if (res.ok) {
        const p = await res.json();
        setProfile(p);
      }
    } catch (e) {
      console.warn('Failed to fetch profile:', e);
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchProfile(user.id);
    }
  }, [user?.id, fetchProfile]);

  // Auth actions
  const loginAsGuest = async () => {
    try {
      const res = await fetch('/api/auth/guest', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setProfile(data.profile);
        localStorage.setItem('mathrune_user', JSON.stringify(data.user));
        // Identify on socket
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            type: 'identify',
            payload: {
              userId: data.user.id,
              userName: data.user.username,
              avatar: data.user.avatar,
            },
          }));
        }
        return true;
      }
    } catch (e) {
      console.error('Guest login failed:', e);
    }
    return false;
  };

  const login = async (username: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Đăng nhập thất bại');

    setUser(data.user);
    setProfile(data.profile);
    localStorage.setItem('mathrune_user', JSON.stringify(data.user));

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'identify',
        payload: {
          userId: data.user.id,
          userName: data.user.username,
          avatar: data.user.avatar,
        },
      }));
    }
    return data;
  };

  const register = async (username: string, email: string, password: string, avatar: string) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, avatar }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Đăng ký thất bại');

    setUser(data.user);
    setProfile(data.profile);
    localStorage.setItem('mathrune_user', JSON.stringify(data.user));

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'identify',
        payload: {
          userId: data.user.id,
          userName: data.user.username,
          avatar: data.user.avatar,
        },
      }));
    }
    return data;
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('mathrune_user');
  };

  // Game Socket Actions
  const startAiGame = (aiDifficulty: 'easy' | 'medium' | 'hard' | 'expert' = 'medium', mathLevel: MathLevel = 'CO_BAN') => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(JSON.stringify({
      type: 'start_ai_game',
      payload: {
        aiDifficulty,
        mathLevel,
        equippedRunes: profile?.equippedRunes,
      },
    }));
  };

  const createRoom = (mathLevel: MathLevel = 'CO_BAN') => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(JSON.stringify({
      type: 'create_room',
      payload: {
        mathLevel,
        equippedRunes: profile?.equippedRunes,
      },
    }));
  };

  const joinRoom = (roomCode: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(JSON.stringify({
      type: 'join_room',
      payload: {
        roomCode,
        equippedRunes: profile?.equippedRunes,
      },
    }));
  };

  const startQuickMatch = (mathLevel: MathLevel = 'CO_BAN') => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(JSON.stringify({
      type: 'quick_match',
      payload: {
        mathLevel,
        equippedRunes: profile?.equippedRunes,
      },
    }));
  };

  const cancelQuickMatch = () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(JSON.stringify({ type: 'cancel_quick_match', payload: {} }));
  };

  const chooseDraftRune = (runeId: string) => {
    if (!wsRef.current || !gameState) return;
    wsRef.current.send(JSON.stringify({
      type: 'action:choose_rune_draft',
      payload: { gameId: gameState.gameId, runeId },
    }));
  };

  const drawCard = () => {
    if (!wsRef.current || !gameState) return;
    wsRef.current.send(JSON.stringify({
      type: 'action:draw',
      payload: { gameId: gameState.gameId },
    }));
  };

  const submitAnswer = (answer: string) => {
    if (!wsRef.current || !gameState) return;
    wsRef.current.send(JSON.stringify({
      type: 'action:answer',
      payload: { gameId: gameState.gameId, answer },
    }));
  };

  const bank = () => {
    if (!wsRef.current || !gameState) return;
    wsRef.current.send(JSON.stringify({
      type: 'action:bank',
      payload: { gameId: gameState.gameId },
    }));
  };

  const useRune = (runeId: string) => {
    if (!wsRef.current || !gameState) return;
    wsRef.current.send(JSON.stringify({
      type: 'action:rune',
      payload: { gameId: gameState.gameId, runeId },
    }));
  };

  const surrender = () => {
    if (!wsRef.current || !gameState) return;
    wsRef.current.send(JSON.stringify({
      type: 'action:surrender',
      payload: { gameId: gameState.gameId },
    }));
  };

  const exitGame = () => {
    setGameState(null);
    if (user?.id) fetchProfile(user.id);
  };

  const updateEquippedRunes = async (runes: string[]) => {
    if (!user?.id) return;
    const res = await fetch(`/api/profile/${user.id}/runes`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ runes }),
    });
    if (res.ok) {
      const updated = await res.json();
      setProfile(updated);
    }
  };

  return {
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
    refreshProfile: () => user?.id && fetchProfile(user.id),
  };
}
