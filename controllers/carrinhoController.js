const db = require('../db');

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(req, res) {
    const { produto_id, quantidade } = req.body;   // Extrai o produto_id e a quantidade do corpo da requisição
    const cliente_id = req.user.id;                 // Obtém o cliente_id do token JWT

    // Validação básica dos dados
    if (!produto_id || !quantidade || quantidade <= 0) {
        return res.status(400).json({ error: 'Dados inválidos para adicionar ao carrinho' });
    }

    // Verificar se o produto existe no banco de dados
    db.query('SELECT * FROM produtos WHERE id = ?', [produto_id], (err, produto) => {
        if (err) {
            console.error('Erro ao buscar produto:', err);
            return res.status(500).json({ error: 'Erro ao verificar produto' });
        }

        if (produto.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        // Verificar se o produto já está no carrinho
        db.query('SELECT * FROM carrinho WHERE cliente_id = ? AND produto_id = ?', [cliente_id, produto_id], (err, itemCarrinho) => {
            if (err) {
                console.error('Erro ao verificar carrinho:', err);
                return res.status(500).json({ error: 'Erro ao verificar carrinho' });
            }

            if (itemCarrinho.length > 0) {
                // Produto já existe no carrinho, atualizar a quantidade
                db.query('UPDATE carrinho SET quantidade = quantidade + ? WHERE cliente_id = ? AND produto_id = ?', 
                         [quantidade, cliente_id, produto_id], (err, result) => {
                    if (err) {
                        console.error('Erro ao atualizar carrinho:', err);
                        return res.status(500).json({ error: 'Erro ao atualizar carrinho' });
                    }
                    res.status(200).json({ message: 'Produto atualizado no carrinho' });
                });
            } else {
                // Produto não existe no carrinho, adicionar novo item
                db.query('INSERT INTO carrinho (cliente_id, produto_id, quantidade) VALUES (?, ?, ?)', 
                         [cliente_id, produto_id, quantidade], (err, result) => {
                    if (err) {
                        console.error('Erro ao adicionar produto ao carrinho:', err);
                        return res.status(500).json({ error: 'Erro ao adicionar produto ao carrinho' });
                    }
                    res.status(201).json({ message: 'Produto adicionado ao carrinho', id: result.insertId });
                });
            }
        });
    });
}

module.exports = { adicionarAoCarrinho };

