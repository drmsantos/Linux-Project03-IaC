const express = require('express');
const router = express.Router();
const { cadastrarCliente } = require('../controllers/clienteController');

// Rota para cadastrar cliente
router.post('/cadastrarCliente', cadastrarCliente);

module.exports = router;

