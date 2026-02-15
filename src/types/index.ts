export type Choice = 'piedra' | 'papel' | 'tijera';

export interface Player {
  id: string;
  name: string;
}

export interface GameRoom {
  id: string;
  name: string;
  createdAt: number;
  players: Player[];
  scores: { [playerId: string]: number };
  readyPlayers: string[]; // ← LÍNEA AGREGADA
}

export interface Game {
  id: string;
  roomId: string;
  player1: {
    id: string;
    choice: Choice;
  };
  player2: {
    id: string;
    choice: Choice;
  };
  winner: string;
  playedAt: number;
}

export interface PlayGameRequest {
  roomId: string;
  player1Id: string;
  player1Name: string;
  player1Choice: Choice;
  player2Id: string;
  player2Name: string;
  player2Choice: Choice;
}