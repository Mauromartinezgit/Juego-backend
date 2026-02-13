import { Router } from 'express';
import { db } from '../config/firebase';
import * as admin from 'firebase-admin';

const router = Router();
// Crear sala
router.post('/create', async (_req, res) => {
  try {
    const roomRef = db.collection('rooms').doc();
    await roomRef.set({
      createdAt: Date.now(),
      players: []
    });

    res.json({
      success: true,
      roomId: roomRef.id
    });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

// Unirse a sala
router.post('/join', async (req, res) => {
  const { roomId, player } = req.body;

  if (!roomId || !player) {
    return res.status(400).json({
      success: false,
      message: 'roomId y player requeridos'
    });
  }

  try {
    const roomRef = db.collection('rooms').doc(roomId);
    const roomSnap = await roomRef.get();

    if (!roomSnap.exists) {
      return res.status(404).json({
        success: false,
        message: 'Sala no encontrada'
      });
    }

    await roomRef.update({
      players: admin.firestore.FieldValue.arrayUnion(player)
    });

    res.json({
      success: true,
      message: 'Jugador unido'
    });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

export default router;
