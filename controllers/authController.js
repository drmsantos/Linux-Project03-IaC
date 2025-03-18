const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/clienteModel');  // Importa o modelo do cliente

// Função para criar novo cliente (cadastro)
const registerClient = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const [existingClient] = await db.query('SELECT * FROM clientes WHERE email = ?', [email]);

        if (existingClient.length > 0) {
            return res.status(400).json({ error: 'Cliente já cadastrado.' });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        const [result] = await db.query('INSERT INTO clientes (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hashedPassword]);

        res.status(201).json({ message: 'Cliente cadastrado com sucesso!', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno ao cadastrar cliente.' });
    }
};

const loginClient = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Log para verificar os dados recebidos
        console.log('Dados recebidos:', { email, senha });

        // Verificar se o email existe no banco
        const [client] = await db.query('SELECT * FROM clientes WHERE email = ?', [email]);

        if (client.length === 0) {
            console.log('Cliente não encontrado:', email); // Log para email não encontrado
            return res.status(400).json({ error: 'Cliente não encontrado.' });
        }

        // Verificando a senha do cliente
        const isMatch = await bcrypt.compare(senha, client[0].senha);
        console.log('Senha verificada:', isMatch); // Log para verificar a senha

        if (!isMatch) {
            console.log('Senha incorreta para:', email); // Log para senha incorreta
            return res.status(400).json({ error: 'Senha incorreta.' });
        }

        // Gerar o token JWT
        const token = jwt.sign({ id: client[0].id, nome: client[0].nome }, 'secretkey', { expiresIn: '1h' });

        res.json({ message: 'Login bem-sucedido.', token });
    } catch (err) {
        console.error('Erro no login:', err); // Log para capturar o erro completo
        res.status(500).json({ error: 'Erro interno ao tentar fazer login.' });
    }
};


module.exports = { registerClient, loginClient };

