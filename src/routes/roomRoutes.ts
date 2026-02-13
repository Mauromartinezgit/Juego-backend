import { Router } from 'express';
import { RoomController } from '../controllers/roomController';

const router = Router();
const roomController = new RoomController();

// POST /signup - Crear sala
router.post('/signup', (req, res) => roomController.signup(req, res));

// POST /rooms/:roomId/join - Unirse a sala
router.post('/rooms/:roomId/join', (req, res) => roomController.joinRoom(req, res));

// POST /rooms/:roomId/play - Guardar jugada
router.post('/rooms/:roomId/play', (req, res) => roomController.play(req, res));

// GET /rooms/:roomId - Obtener estado de la sala
router.get('/rooms/:roomId', (req, res) => roomController.getRoom(req, res));

// GET /rooms/:roomId/status - Estado de la sala (para polling)
router.get('/rooms/:roomId/status', (req, res) => roomController.getRoomStatus(req, res));

export default router;