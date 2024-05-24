var novaFase = {
    "fase_id": "fase_id_nova",
    "nome": "Nova Fase",
    "descricao": "Descrição da Nova Fase.",
    "data_inicio": "2024-08-01",
    "data_fim": "2024-08-15",
    "tarefas": []
};

projetoDelta.fases.push(novaFase);

db.projects.updateOne({
    "nome": "Projeto Delta"
}, {
    $set: {
        "fases": projetoDelta.fases
    }
});


db.projects.updateOne({
    "nome": "Projeto Delta"
}, {
    $set: {
        "fases": projetoDelta.fases
    }
})