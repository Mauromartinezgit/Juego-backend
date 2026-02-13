import { Router } from 'express';

const router = Router();

router.post('/play', (req, res) => {
  const { move1, move2 } = req.body;

  if (!move1 || !move2) {
    return res.status(400).json({ message: 'Movimientos requeridos' });
  }

  if (move1 === move2) {
    return res.json({ result: 'draw' });
  }

  const wins: Record<string, string> = {
    piedra: 'tijera',
    tijera: 'papel',
    papel: 'piedra'
  };

  const result = wins[move1] === move2 ? 'win' : 'lose';

  res.json({ result });
});

export default router;
