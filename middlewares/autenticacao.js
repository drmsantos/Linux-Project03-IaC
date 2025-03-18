// middlewares/autenticacao.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env; // Certifique-se de ter a chave secreta do JWT configurada corretamente

// Middleware de autenticação
function autenticarUsuario(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Extrai o token Bearer

    if (!token) {
        return res.status(403).json({ error: 'Token não fornecido' });
    }

    // Verifica o token JWT
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }

        // Se o token for válido, anexa as informações do usuário à requisição
        req.user = decoded;
        next(); // Chama o próximo middleware ou a rota
    });
}

module.exports = { autenticarUsuario };

