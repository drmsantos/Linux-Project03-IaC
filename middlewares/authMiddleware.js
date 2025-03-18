const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'Token não fornecido' });
    }

    jwt.verify(token.split(' ')[1], 'seu-segredo', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }
        req.user = decoded;
        next();
    });
}

module.exports = autenticar;

