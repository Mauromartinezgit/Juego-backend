import { Request, Response } from 'express';
import { GameService } from '../services/gameService';

const gameService = new GameService();

export class GameController {
  
  async createGameRoom(req: Request, res: Response) {
    try {
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({ error: 'El nombre de la sala es requerido' });
      }
      
      const gameRoom = await gameService.createGameRoom(name);
      res.status(201).json(gameRoom);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la sala' });
    }
  }
  
  async getGameRoom(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const gameRoom = await gameService.getGameRoom(id);
      
      if (!gameRoom) {
        return res.status(404).json({ error: 'Sala no encontrada' });
      }
      
      res.json(gameRoom);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la sala' });
    }
  }
  
  async getAllGameRooms(req: Request, res: Response) {
    try {
      const gameRooms = await gameService.getAllGameRooms();
      res.json(gameRooms);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las salas' });
    }
  }
  
  async playGame(req: Request, res: Response) {
    try {
      const {
        roomId,
        player1Id,
        player1Name,
        player1Choice,
        player2Id,
        player2Name,
        player2Choice
      } = req.body;
      
      if (!roomId || !player1Id || !player1Name || !player1Choice || 
          !player2Id || !player2Name || !player2Choice) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }
      
      const validChoices = ['piedra', 'papel', 'tijera'];
      if (!validChoices.includes(player1Choice) || !validChoices.includes(player2Choice)) {
        return res.status(400).json({ error: 'Opción inválida. Usa: piedra, papel o tijera' });
      }
      
      const game = await gameService.playGame(
        roomId,
        player1Id,
        player1Name,
        player1Choice,
        player2Id,
        player2Name,
        player2Choice
      );
      
      res.status(201).json(game);
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Error al jugar la partida' });
    }
  }
  
  async getGameHistory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const history = await gameService.getGameHistory(id);
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el historial' });
    }
  }
  
  async getRoomScores(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const scores = await gameService.getRoomScores(id);
      res.json(scores);
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Error al obtener los puntajes' });
    }
  }
}
