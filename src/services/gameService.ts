import { db } from '../config/firebase';
import { GameRoom, Game, Choice, Player } from '../types';
import { v4 as uuidv4 } from 'uuid';

export class GameService {
  
  // Crear un nuevo gameroom
  async createGameRoom(name: string): Promise<GameRoom> {
    const roomId = uuidv4();
    const gameRoom: GameRoom = {
      id: roomId,
      name,
      createdAt: Date.now(),
      players: [],
      scores: {}
    };

    await db.collection('gamerooms').doc(roomId).set(gameRoom);
    return gameRoom;
  }

  // Obtener un gameroom por ID
  async getGameRoom(roomId: string): Promise<GameRoom | null> {
    const doc = await db.collection('gamerooms').doc(roomId).get();
    if (!doc.exists) return null;
    return doc.data() as GameRoom;
  }

  // Obtener todos los gamerooms
  async getAllGameRooms(): Promise<GameRoom[]> {
    const snapshot = await db.collection('gamerooms').get();
    return snapshot.docs.map(doc => doc.data() as GameRoom);
  }

  // Agregar jugador a un room
  async addPlayerToRoom(roomId: string, player: Player): Promise<void> {
    const roomRef = db.collection('gamerooms').doc(roomId);
    const room = await roomRef.get();
    
    if (!room.exists) {
      throw new Error('Room no encontrado');
    }

    const roomData = room.data() as GameRoom;
    
    // Verificar si el jugador ya existe
    const playerExists = roomData.players.some((p: Player) => p.id === player.id);
    
    if (!playerExists) {
      roomData.players.push(player);
      roomData.scores[player.id] = 0;
      await roomRef.update({
        players: roomData.players,
        scores: roomData.scores
      });
    }
  }

  // Determinar ganador
  private determineWinner(choice1: Choice, choice2: Choice): 'player1' | 'player2' | 'empate' {
    if (choice1 === choice2) return 'empate';
    
    if (
      (choice1 === 'piedra' && choice2 === 'tijera') ||
      (choice1 === 'papel' && choice2 === 'piedra') ||
      (choice1 === 'tijera' && choice2 === 'papel')
    ) {
      return 'player1';
    }
    
    return 'player2';
  }

  // Jugar partida
  async playGame(
    roomId: string,
    player1Id: string,
    player1Name: string,
    player1Choice: Choice,
    player2Id: string,
    player2Name: string,
    player2Choice: Choice
  ): Promise<Game> {
    const gameId = uuidv4();
    
    // Asegurar que ambos jugadores estén en el room
    await this.addPlayerToRoom(roomId, { id: player1Id, name: player1Name });
    await this.addPlayerToRoom(roomId, { id: player2Id, name: player2Name });
    
    const result = this.determineWinner(player1Choice, player2Choice);
    
    let winner: string;
    if (result === 'empate') {
      winner = 'empate';
    } else if (result === 'player1') {
      winner = player1Id;
    } else {
      winner = player2Id;
    }

    const game: Game = {
      id: gameId,
      roomId,
      player1: {
        id: player1Id,
        choice: player1Choice
      },
      player2: {
        id: player2Id,
        choice: player2Choice
      },
      winner,
      playedAt: Date.now()
    };

    // Guardar partida en Firebase
    await db.collection('games').doc(gameId).set(game);

    // Actualizar scores si no fue empate
    if (winner !== 'empate') {
      const roomRef = db.collection('gamerooms').doc(roomId);
      const room = await roomRef.get();
      const roomData = room.data() as GameRoom;
      
      roomData.scores[winner] = (roomData.scores[winner] || 0) + 1;
      
      await roomRef.update({
        scores: roomData.scores
      });
    }

    return game;
  }

  // Obtener historial de partidas de un room
  async getGameHistory(roomId: string): Promise<Game[]> {
    const snapshot = await db.collection('games')
      .where('roomId', '==', roomId)
      .get();
    
    return snapshot.docs.map(doc => doc.data() as Game);
  }

  // Obtener scores de un room
  async getRoomScores(roomId: string): Promise<{ [playerId: string]: number }> {
    const room = await this.getGameRoom(roomId);
    if (!room) throw new Error('Room no encontrado');
    return room.scores;
  }

  /**
   * Crear sala y registrar jugador (signup)
   */
  async signup(playerName: string): Promise<{ roomId: string; playerId: string }> {
    const roomId = uuidv4();
    const playerId = uuidv4();
    
    const gameRoom: GameRoom = {
      id: roomId,
      name: `Sala de ${playerName}`,
      createdAt: Date.now(),
      players: [{ id: playerId, name: playerName }],
      scores: { [playerId]: 0 }
    };

    await db.collection('gamerooms').doc(roomId).set(gameRoom);
    
    return { roomId, playerId };
  }

  /**
   * Unirse a una sala existente
   */
  async joinRoom(roomId: string, playerName: string): Promise<{ playerId: string }> {
    const playerId = uuidv4();
    const player: Player = { id: playerId, name: playerName };
    
    await this.addPlayerToRoom(roomId, player);
    
    return { playerId };
  }

  /**
   * Guardar jugada de un jugador
   */
  async savePlay(roomId: string, playerName: string, play: Choice): Promise<void> {
    await db.collection('plays').doc(`${roomId}_${playerName}`).set({
      roomId,
      playerName,
      play,
      timestamp: Date.now()
    });
  }

  /**
   * Obtener jugadas de una sala
   */
  async getPlays(roomId: string): Promise<any[]> {
    const snapshot = await db.collection('plays')
      .where('roomId', '==', roomId)
      .get();
    
    return snapshot.docs.map(doc => doc.data());
  }

  /**
   * Obtener estado de la sala (para polling)
   */
  async getRoomStatus(roomId: string): Promise<{ roomCode: string; players: Player[]; isReady: boolean }> {
    const room = await this.getGameRoom(roomId);

    if (!room) {
      throw new Error('Sala no encontrada');
    }

    return {
      roomCode: room.id,
      players: room.players,
      isReady: room.players.length >= 2
    };
  }
}