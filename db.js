const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'mysql-server', // Nome do container MySQL
    user: 'root',          // Seu usuário do banco
    password: 'openstack', // Senha do banco
    database: 'loja_conveniencia', // Nome do seu banco de dados
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportando o pool de conexões para ser usado em outros arquivos
module.exports = db;

