import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './config/firebase';
import gameRoutes from './routes/gameRoutes';
import roomRoutes from './routes/roomRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Piedra, Papel o Tijera',
    status: 'running' 
  });
});

// Ruta de prueba de Firebase
app.get('/test-firebase', async (req, res) => {
  try {
    await db.collection('test').doc('prueba').set({
      mensaje: 'Firebase funciona!',
      timestamp: Date.now()
    });
    
    res.json({ 
      success: true,
      message: 'Firebase conectado correctamente!' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error conectando Firebase',
      error: error
    });
  }
});

// Rutas de la API
app.use('/api', gameRoutes);
app.use('/', roomRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});