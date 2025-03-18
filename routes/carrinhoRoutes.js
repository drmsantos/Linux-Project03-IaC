// routes/carrinhoRoutes.js
const express = require('express');
const { autenticarUsuario } = require('../middlewares/autenticacao');
const { adicionarAoCarrinho } = require('../controllers/carrinhoController');

const router = express.Router();

// Rota para adicionar ao carrinho (autenticado)
router.post('/api/carrinho', autenticarUsuario, adicionarAoCarrinho);

module.exports = router;
