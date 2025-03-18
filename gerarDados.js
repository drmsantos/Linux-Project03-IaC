const mysql = require('mysql2');

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'mysql-server',
  user: 'root',
  password: 'openstack',
  database: 'loja_conveniencia'
});

// Função para gerar dados aleatórios
function generateRandomName() {
  const names = ['João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Fernanda', 'Lucas', 'Juliana', 'Roberto', 'Patrícia'];
  return names[Math.floor(Math.random() * names.length)];
}

function generateRandomEmail(name) {
  return `${name.toLowerCase()}@gmail.com`;
}

function generateRandomCpf() {
  let cpf = '';
  for (let i = 0; i < 9; i++) {
    cpf += Math.floor(Math.random() * 10);
  }
  return cpf;
}

function generateRandomPhone() {
  return `(11) 9${Math.floor(Math.random() * 9 + 1)}${Math.floor(Math.random() * 10000000)}`;
}

// Gerar dados para 100 clientes
const clients = [];
for (let i = 0; i < 100; i++) {
  const name = generateRandomName();
  clients.push([
    generateRandomCpf(),
    name,
    generateRandomEmail(name),
    generateRandomPhone()
  ]);
}

// Inserir dados no banco de dados
const query = 'INSERT INTO clientes (cpf, nome, email, telefone) VALUES ?';
connection.query(query, [clients], (err, results) => {
  if (err) {
    console.error('Erro ao inserir dados:', err);
  } else {
    console.log(`${results.affectedRows} clientes inseridos com sucesso!`);
  }

  // Fechar a conexão
  connection.end();
});

