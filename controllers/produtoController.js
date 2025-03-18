const db = require('../db');

// Função para cadastrar um produto
function cadastrarProduto(req, res) {
    const { nome, descricao, preco, estoque, categoria, imagem } = req.body;

    const query = 'INSERT INTO produtos (nome, descricao, preco, estoque, categoria, imagem) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [nome, descricao, preco, estoque, categoria, imagem], (err, results) => {
        if (err) {
            console.error('Erro ao cadastrar produto:', err);
            return res.status(500).json({ error: 'Erro ao cadastrar produto' });
        }
        res.status(200).json({ message: 'Produto cadastrado com sucesso!', results });
    });
}

// Função para listar produtos
function listarProdutos(req, res) {
    const query = 'SELECT * FROM produtos';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar produtos:', err);
            return res.status(500).json({ error: 'Erro ao buscar produtos' });
        }
        res.status(200).json(results);
    });
}

module.exports = { cadastrarProduto, listarProdutos };
