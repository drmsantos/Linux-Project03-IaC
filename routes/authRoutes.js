const express = require('express');
const router = express.Router();
const { loginCliente } = require('../controllers/clienteController'); // Verifique se o caminho está correto

// Rota para realizar login de cliente
router.post('/login', loginCliente);

module.exports = router;

