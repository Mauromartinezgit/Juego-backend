import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { db } from './config/firebase';
import roomRoutes from './routes/roomRoutes';
import gameRoutes from './routes/gameRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (_req, res) => {
  res.json({
    message: 'API Piedra Papel Tijera',
    status: 'running'
  });
});

// Test Firebase
app.get('/test-firebase', async (_req, res) => {
  try {
    await db.collection('test').doc('prueba').set({
      mensaje: 'Firebase OK',
      timestamp: Date.now()
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

// Routes
app.use('/', roomRoutes);
app.use('/api', gameRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
