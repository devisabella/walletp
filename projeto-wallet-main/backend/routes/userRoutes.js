const express = require('express');
const { getProfile } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

if (!getProfile || !authenticate) {
  console.error('Erro: uma ou mais funções do userController ou authMiddleware não foram importadas corretamente.');
  process.exit(1);
}

router.get('/profile', authenticate, getProfile);

module.exports = router;

