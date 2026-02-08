import { Router } from 'express';
import { GameController } from '../controllers/gameController';

const router = Router();
const gameController = new GameController();

// Rutas de gamerooms
router.post('/gamerooms', (req, res) => gameController.createGameRoom(req, res));
router.get('/gamerooms', (req, res) => gameController.getAllGameRooms(req, res));
router.get('/gamerooms/:id', (req, res) => gameController.getGameRoom(req, res));
router.get('/gamerooms/:id/scores', (req, res) => gameController.getRoomScores(req, res));
router.get('/gamerooms/:id/history', (req, res) => gameController.getGameHistory(req, res));

// Ruta para jugar
router.post('/games/play', (req, res) => gameController.playGame(req, res));

export default router;