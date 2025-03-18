const bcrypt = require('bcrypt'); // Importa o bcrypt
const db = require('../db'); // Importa a conexão com o banco de dados
const jwt = require('jsonwebtoken');


// Função para cadastrar cliente
function cadastrarCliente(req, res) {
    const { nome, email, telefone, senha, cpf, data_nascimento } = req.body;

    // Criptografar a senha antes de salvar
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Erro ao criptografar a senha:', err);
            return res.status(500).json({ error: 'Erro ao criptografar a senha' });
        }

        const query = 'INSERT INTO clientes (nome, email, telefone, cpf, data_nascimento, senha) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [nome, email, telefone, cpf, data_nascimento, hashedPassword], (err, results) => {
            if (err) {
                console.error('Erro ao cadastrar cliente:', err);
                return res.status(500).json({ error: 'Erro ao cadastrar cliente' });
            }
            res.status(200).json({ message: 'Cliente cadastrado com sucesso!', results });
        });
    });
}


// Função para login do clnte
function loginCliente(req, res) {
    const { email, senha } = req.body;

    // Verificar se o email foi informado
    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Buscar o cliente no banco de dados
    const query = 'SELECT * FROM clientes WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro no banco de dados' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        const user = results[0];

        // Verificar se a senha está correta
        bcrypt.compare(senha, user.senha, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao verificar senha' });
            }

            if (!isMatch) {
                return res.status(401).json({ error: 'Senha incorreta' });
            }

            // Gerar o token JWT
            const token = jwt.sign({ id: user.id, nome: user.nome, email: user.email }, 'seu-segredo', { expiresIn: '1h' });

            res.status(200).json({ message: 'Login bem-sucedido', token });
        });
    });
}

module.exports = { cadastrarCliente, loginCliente }; // Certifique-se de exportar loginCliente aqui

