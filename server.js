const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const autenticar = require('./middlewares/authMiddleware'); // Middleware de autenticação
const clienteController = require('./controllers/clienteController');
const authRoutes = require('./routes/authRoutes'); // Importando as rotas de autenticação
const produtoRoutes = require('./routes/produtoRoutes'); // Importando as rotas de produto
const cors = require('cors');app.use(bodyParser.json());
const carrinhoRoutes = require('./routes/carrinhoRoutes'); 

// Middleware para lidar com o corpo da requisição
app.use(bodyParser.json());
app.use(cors());


app.use('/auth', authRoutes);  // Usando as rotas de autenticação com o prefixo "/auth"

// Rota para cadastrar cliente
app.post('/clientes', clienteController.cadastrarCliente);

// Rota para login do cliente
app.post('/login', clienteController.loginCliente);

// Rota protegida
app.get('/clientes/protegido', autenticar, (req, res) => {
    res.status(200).json({ message: 'Acesso autorizado!', user: req.user });
});

app.use('/api', produtoRoutes); // Prefixo '/api' para todas as rotas de produto
app.use(carrinhoRoutes); 

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

