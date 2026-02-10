import { Request, Response } from 'express';
import { GameService } from '../services/gameService';

const gameService = new GameService();

export class RoomController {
  
  async signup(req: Request, res: Response) {
    try {
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({ error: 'El nombre es requerido' });
      }
      
      const result = await gameService.signup(name);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la sala' });
    }
  }
  
  async joinRoom(req: Request, res: Response) {
    try {
      const { roomId } = req.params;
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({ error: 'El nombre es requerido' });
      }
      
      const result = await gameService.joinRoom(roomId, name);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Error al unirse a la sala' });
    }
  }
  
  async play(req: Request, res: Response) {
    try {
      const { roomId } = req.params;
      const { playerName, play } = req.body;
      
      if (!playerName || !play) {
        return res.status(400).json({ error: 'playerName y play son requeridos' });
      }
      
      await gameService.savePlay(roomId, playerName, play);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Error al guardar la jugada' });
    }
  }
  
  async getRoom(req: Request, res: Response) {
    try {
      const { roomId } = req.params;
      
      const room = await gameService.getGameRoom(roomId);
      const plays = await gameService.getPlays(roomId);
      
      res.json({ room, plays });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la sala' });
    }
  }
}