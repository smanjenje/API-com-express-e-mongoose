const express = require('express');
const cors = require('cors');
const db = require('./db');
const Projeto = require('./model');

const app = express();
app.use(express.json());
app.use(cors());

// Rota para obter todos os projetos
app.get('/projetos', async (req, res) => {
    try {
        const projetos = await Projeto.find();
        res.json(projetos);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// Rota para criar um novo projeto
app.post('/projetos', async (req, res) => {
    const projeto = new Projeto(req.body);

    try {
        const novoProjeto = await projeto.save();
        res.status(201).json(novoProjeto);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// Rota para adicionar uma nova fase a um projeto específico
app.post('/projetos/:projetoId/fases', async (req, res) => {
    const {
        projetoId
    } = req.params;
    const novaFase = req.body;

    try {
        const projeto = await Projeto.findById(projetoId);
        if (!projeto) {
            return res.status(404).json({
                message: 'Projeto não encontrado'
            });
        }

        let proximoId = projeto.fases.length + 1;
        novaFase._id = `fase_id_${proximoId}`;
        projeto.fases.push(novaFase);

        await projeto.save();
        res.status(201).json(projeto);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// Rota para encontrar uma fase específica de um projeto
app.get('/projetos/:projetoId/fases/:faseId', async (req, res) => {
    const {
        projetoId,
        faseId
    } = req.params;

    try {
        const projeto = await Projeto.findById(projetoId);
        if (!projeto) {
            return res.status(404).json({
                message: 'Projeto não encontrado'
            });
        }

        const fase = projeto.fases.find(fase => fase._id === faseId);
        if (!fase) {
            return res.status(404).json({
                message: 'Fase não encontrada'
            });
        }

        res.status(200).json(fase);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// Rota para adicionar uma nova tarefa a uma fase específica de um projeto
app.post('/projetos/:projetoId/fases/:faseId/tarefas', async (req, res) => {
    const {
        projetoId,
        faseId
    } = req.params;
    const novaTarefa = req.body;

    try {
        const projeto = await Projeto.findById(projetoId);

        if (!projeto) {
            return res.status(404).json({
                message: 'Projeto não encontrado'
            });
        }

        const fase = projeto.fases.find(fase => fase._id === faseId);
        if (!fase) {
            return res.status(404).json({
                message: 'Fase não encontrada'
            });
        }

        let proximoId = fase.tarefas.length + 1;
        novaTarefa._id = `task_id_${proximoId}`;
        // Adicionar a nova tarefa à fase
        fase.tarefas.push(novaTarefa);

        // Salvar as alterações no banco de dados
        await projeto.save();

        res.status(201).json(projeto);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});









// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express rodando na porta ${PORT}`);
});