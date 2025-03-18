Projeto referente o Desafio 3 do DIO Santander - Linux para Iniciantes.

Foi criado uma VM - no ambiente Proxmox como virtualizador e criado uma VM como as seguintes Configurações:

    - VM - Sistema Operacional (Ubuntu 24.04.2 LTS)
       Configurações:
         - vCPUs: 6
         - Memória: 4 GBs
         - Disco: 50 GBs

     Configurado Docker 2 Conteiners 
        1 - Banco de dados - Mysql 
          Criado uma banco de dados:
            loja_conveniencia;
          Tabelas:
           clientes;
           produtos;

       2 - Node.js

         loja_conveniencia/
            │── backend/                # Pasta do backend (API REST)
            │   ├── controllers/        # Lógica dos endpoints
            │   ├── models/             # Modelos do banco de dados
            │   ├── routes/             # Definição de rotas
            │   ├── utils/              # Funções auxiliares
            │   ├── gerarDados.js       # Script para popular o banco
            │   ├── server.js           # Arquivo principal da API
            │   ├── db.js               # Configuração do banco de dados
            │   ├── package.json        # Dependências do Node.js
            │   ├── Dockerfile          # Configuração do Docker
            │   ├── docker-compose.yml  # Orquestração do Docker
            │── database/               # Scripts e backups do banco de dados
            │   ├── clientes.sql          # Estrutura do banco de dados
            │   ├── prosutos.sql            # Dados iniciais do banco
            │── .env                    # Variáveis de ambiente (se necessário)
            │── .gitignore              # Ignorar arquivos no Git

    este foi minha contribuição.
