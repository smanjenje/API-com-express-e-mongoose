const mongoose = require('mongoose');

const tarefaSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    nome: String,
    descricao: String,
    data_inicio: Date,
    data_fim: Date,
    responsavel: String,
    status: String
});

const faseSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    nome: String,
    descricao: String,
    data_inicio: Date,
    data_fim: Date,
    tarefas: [tarefaSchema]
});

const projetoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    descricao: String,
    data_inicio: Date,
    data_fim: Date,
    fases: [faseSchema]
});

const Projeto = mongoose.model('Projeto', projetoSchema);

module.exports = Projeto;