# Usando a imagem oficial do Node.js (Node 16)
FROM node:16

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o package.json e package-lock.json (se existir)
COPY package*.json ./

# Instalar as dependências do Node.js (express, mysql2, jsonwebtoken, dotenv, cors, body-parser)
RUN npm install express mysql2 jsonwebtoken dotenv cors body-parser

# Copiar o restante dos arquivos do projeto para o contêiner
COPY . .

# Expor a porta em que o app estará rodando
EXPOSE 3000

# Definir o comando para iniciar o servidor
CMD ["node", "server.js"]

