// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/gestorProjeto');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));
db.once('open', () => {
    console.log('Conexão ao MongoDB estabelecida com sucesso!');
});

module.exports = db;