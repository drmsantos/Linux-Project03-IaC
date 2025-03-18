const express = require('express');
const router = express.Router();
const { cadastrarProduto, listarProdutos } = require('../controllers/produtoController');

// Rota para cadastrar um produto
router.post('/produtos', cadastrarProduto);

// Rota para listar produtos
router.get('/produtos', listarProdutos);

module.exports = router;
