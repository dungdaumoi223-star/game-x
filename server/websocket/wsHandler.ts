import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import { gameEngine } from '../game/gameEngine.ts';
import { GameMode, MathLevel } from '../../shared/types.ts';

interface ClientConnection {
  ws: WebSocket;
  userId: string;
  userName: string;
  avatar: string;
  gameId?: string;
  roomCode?: string;
}

export class WebSocketHandler {
  private wss: WebSocketServer;
  private clients: Map<WebSocket, ClientConnection> = new Map();
  private rooms: Map<string, {
    gameId: string;
    roomCode: string;
    hostUserId: string;
    mathLevel: MathLevel;
    players: Array<{ userId: string; userName: string; avatar: string }>;
  }> = new Map();

  private quickMatchQueue: ClientConnection[] = [];

  constructor(server: Server) {
    this.wss = new WebSocketServer({ server, path: '/ws' });

    this.wss.on('connection', (ws: WebSocket) => {
      this.handleConnection(ws);
    });

    // Automatically forward all engine state updates (including AI thinking, drawing, solving, and banking)
    gameEngine.onStateChange = (gameId: string, state: any, event: string, extra?: any) => {
      this.broadcastToGame(gameId, 'game_state_update', {
        event,
        state,
        ...extra,
      });
    };

    console.log('Realtime WebSocket Server initialized on path /ws');
  }

  private handleConnection(ws: WebSocket) {
    const conn: ClientConnection = {
      ws,
      userId: `guest_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      userName: 'Khách',
      avatar: '🧙‍♂️',
    };
    this.clients.set(ws, conn);

    ws.on('message', (message: string) => {
      try {
        const data = JSON.parse(message.toString());
        this.handleMessage(conn, data);
      } catch (e) {
        console.error('Error handling WebSocket message:', e);
      }
    });

    ws.on('close', () => {
      this.handleDisconnect(conn);
    });
  }

  private handleMessage(conn: ClientConnection, data: { type: string; payload: any }) {
    const { type, payload } = data;

    switch (type) {
      case 'identify': {
        conn.userId = payload.userId || conn.userId;
        conn.userName = payload.userName || conn.userName;
        conn.avatar = payload.avatar || conn.avatar;
        this.send(conn.ws, 'identified', { userId: conn.userId });
        break;
      }

      case 'create_room': {
        const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        const gameId = `game_${roomCode}_${Date.now()}`;
        const mathLevel = payload.mathLevel || 'CO_BAN';

        const gameState = gameEngine.createGame({
          gameId,
          roomCode,
          mode: 'pvp',
          mathLevel,
          player1: {
            id: conn.userId,
            name: conn.userName,
            avatar: conn.avatar,
            runes: payload.equippedRunes,
          },
        });

        conn.gameId = gameId;
        conn.roomCode = roomCode;

        this.rooms.set(roomCode, {
          gameId,
          roomCode,
          hostUserId: conn.userId,
          mathLevel,
          players: [{ userId: conn.userId, userName: conn.userName, avatar: conn.avatar }],
        });

        this.send(conn.ws, 'room_created', {
          roomCode,
          gameId,
          state: gameState,
        });
        break;
      }

      case 'join_room': {
        const roomCode = payload.roomCode?.toUpperCase();
        const room = this.rooms.get(roomCode);

        if (!room) {
          this.send(conn.ws, 'error', { message: 'Không tìm thấy phòng với mã này.' });
          return;
        }

        const gameState = gameEngine.joinGame(room.gameId, {
          id: conn.userId,
          name: conn.userName,
          avatar: conn.avatar,
          runes: payload.equippedRunes,
        });

        if (!gameState) {
          this.send(conn.ws, 'error', { message: 'Phòng đã đầy hoặc không thể tham gia.' });
          return;
        }

        conn.gameId = room.gameId;
        conn.roomCode = roomCode;
        room.players.push({ userId: conn.userId, userName: conn.userName, avatar: conn.avatar });

        this.broadcastToRoom(roomCode, 'game_state_update', {
          event: 'player_joined',
          state: gameState,
        });
        break;
      }

      case 'quick_match': {
        // Find opponent in queue
        this.quickMatchQueue = this.quickMatchQueue.filter(c => c.ws.readyState === WebSocket.OPEN && c.userId !== conn.userId);

        if (this.quickMatchQueue.length > 0) {
          const opponent = this.quickMatchQueue.shift()!;
          const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
          const gameId = `quick_${roomCode}_${Date.now()}`;
          const mathLevel = payload.mathLevel || 'CO_BAN';

          const gameState = gameEngine.createGame({
            gameId,
            roomCode,
            mode: 'pvp',
            mathLevel,
            player1: {
              id: opponent.userId,
              name: opponent.userName,
              avatar: opponent.avatar,
            },
            player2: {
              id: conn.userId,
              name: conn.userName,
              avatar: conn.avatar,
              runes: payload.equippedRunes,
            },
          });

          conn.gameId = gameId;
          conn.roomCode = roomCode;
          opponent.gameId = gameId;
          opponent.roomCode = roomCode;

          this.rooms.set(roomCode, {
            gameId,
            roomCode,
            hostUserId: opponent.userId,
            mathLevel,
            players: [
              { userId: opponent.userId, userName: opponent.userName, avatar: opponent.avatar },
              { userId: conn.userId, userName: conn.userName, avatar: conn.avatar },
            ],
          });

          this.send(opponent.ws, 'match_found', { state: gameState, roomCode });
          this.send(conn.ws, 'match_found', { state: gameState, roomCode });
        } else {
          this.quickMatchQueue.push(conn);
          this.send(conn.ws, 'searching_match', { status: 'waiting' });
        }
        break;
      }

      case 'cancel_quick_match': {
        this.quickMatchQueue = this.quickMatchQueue.filter(c => c.userId !== conn.userId);
        this.send(conn.ws, 'quick_match_cancelled', {});
        break;
      }

      case 'start_ai_game': {
        const gameId = `ai_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
        const gameState = gameEngine.createGame({
          gameId,
          roomCode: 'SOLO_AI',
          mode: 'ai',
          aiDifficulty: payload.aiDifficulty || 'medium',
          mathLevel: payload.mathLevel || 'CO_BAN',
          player1: {
            id: conn.userId,
            name: conn.userName,
            avatar: conn.avatar,
            runes: payload.equippedRunes,
          },
        });

        conn.gameId = gameId;
        conn.roomCode = 'SOLO_AI';

        this.send(conn.ws, 'ai_game_started', { state: gameState });
        break;
      }

      case 'action:draw': {
        const gameId = conn.gameId || payload.gameId;
        if (!gameId) return;

        const res = gameEngine.drawCard(gameId, conn.userId);
        if (!res.success) {
          this.send(conn.ws, 'action_error', { message: res.error });
          return;
        }

        this.broadcastGameUpdate(conn, res.state, res.isBust ? 'bust' : 'card_drawn');
        break;
      }

      case 'action:answer': {
        const gameId = conn.gameId || payload.gameId;
        if (!gameId) return;

        const res = gameEngine.answerQuestion(gameId, conn.userId, payload.answer);
        if (!res.success) return;

        this.broadcastGameUpdate(conn, res.state, res.correct ? 'answer_correct' : 'answer_wrong', {
          explanation: res.explanation,
        });
        break;
      }

      case 'action:bank': {
        const gameId = conn.gameId || payload.gameId;
        if (!gameId) return;

        const res = gameEngine.bank(gameId, conn.userId);
        if (!res.success) return;

        this.broadcastGameUpdate(conn, res.state, 'bank');
        break;
      }

      case 'action:rune': {
        const gameId = conn.gameId || payload.gameId;
        if (!gameId) return;

        const res = gameEngine.useRune(gameId, conn.userId, payload.runeId);
        if (!res.success) {
          this.send(conn.ws, 'action_error', { message: res.message });
          return;
        }

        this.broadcastGameUpdate(conn, res.state, 'rune_used', { message: res.message });
        break;
      }

      case 'action:choose_rune_draft': {
        const gameId = conn.gameId || payload.gameId;
        if (!gameId) return;

        const res = gameEngine.chooseDraftRune(gameId, conn.userId, payload.runeId);
        if (!res.success) {
          this.send(conn.ws, 'action_error', { message: res.error });
          return;
        }

        this.broadcastGameUpdate(conn, res.state, 'rune_chosen');
        break;
      }

      case 'action:surrender': {
        const gameId = conn.gameId || payload.gameId;
        if (!gameId) return;

        const res = gameEngine.surrender(gameId, conn.userId);
        if (!res.success) return;

        this.broadcastGameUpdate(conn, res.state, 'surrender');
        break;
      }

      case 'get_state': {
        const gameId = conn.gameId || payload.gameId;
        if (gameId) {
          const st = gameEngine.getGame(gameId);
          if (st) {
            this.send(conn.ws, 'game_state_update', { state: st });
          }
        }
        break;
      }
    }
  }

  private broadcastGameUpdate(sender: ClientConnection, state: any, event: string, extra?: any) {
    if (sender.roomCode && sender.roomCode !== 'SOLO_AI') {
      this.broadcastToRoom(sender.roomCode, 'game_state_update', {
        event,
        state,
        ...extra,
      });
    } else {
      this.send(sender.ws, 'game_state_update', {
        event,
        state,
        ...extra,
      });
    }
  }

  private broadcastToGame(gameId: string, type: string, payload: any) {
    for (const [_, client] of this.clients.entries()) {
      if (client.gameId === gameId && client.ws.readyState === WebSocket.OPEN) {
        this.send(client.ws, type, payload);
      }
    }
  }

  private broadcastToRoom(roomCode: string, type: string, payload: any) {
    for (const [_, client] of this.clients.entries()) {
      if (client.roomCode === roomCode && client.ws.readyState === WebSocket.OPEN) {
        this.send(client.ws, type, payload);
      }
    }
  }

  private send(ws: WebSocket, type: string, payload: any) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type, payload }));
    }
  }

  private handleDisconnect(conn: ClientConnection) {
    this.clients.delete(conn.ws);
    this.quickMatchQueue = this.quickMatchQueue.filter(c => c.ws !== conn.ws);

    if (conn.roomCode && conn.roomCode !== 'SOLO_AI') {
      this.broadcastToRoom(conn.roomCode, 'player_disconnected', {
        userId: conn.userId,
        userName: conn.userName,
      });
    }
  }
}
