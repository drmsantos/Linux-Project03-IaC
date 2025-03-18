const mysql = require('mysql2');

// Conexão com o banco de dados MySQL
const db = mysql.createPool({
    host: 'mysql-server',
    user: 'root',
    password: 'openstack',
    database: 'loja_conveniencia',
});

module.exports = db.promise();

