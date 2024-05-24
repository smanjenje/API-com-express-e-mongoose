# API com express.js e mongoose
 criação de api com express.js, mongoose, cors, node.js


1. Instalar Pacotes Necessários
Instale os pacotes necessários usando o npm:

npm install express mongoose cors

2. Criar o Arquivo de Configuração do Mongoose
Crie um arquivo chamado db.js para configurar o Mongoose:

// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nome-do-seu-banco-de-dados', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));
db.once('open', () => {
  console.log('Conexão ao MongoDB estabelecida com sucesso!');
});

module.exports = db;



