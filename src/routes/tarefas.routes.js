const express = require('express');
const router = express.Router ();

//----------------------------------------------------------------------------------------------------------------------------
// Tarefas
//----------------------------------------------------------------------------------------------------------------------------

let tarefas = [
    { id: 1, texto: 'Estudar Node', prioridade: 'alta', coluna: 'afazer' },
    { id: 2, texto: 'Criar API', prioridade: 'alta', coluna: 'andamento' },
    { id: 3, texto: 'Testar Postman',prioridade: 'media', coluna: 'concluido' },
];
let proximoId = 0

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 1 — Listar todas
//----------------------------------------------------------------------------------------------------------------------------

router.get('/', (req, res) => {
    if (!tarefas) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }
    res.json(tarefas);
});

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 2 — Buscar tarefa por ID
//----------------------------------------------------------------------------------------------------------------------------

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }
    res.json(tarefa);
});

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 3 — Filtrar por coluna
//----------------------------------------------------------------------------------------------------------------------------

router.get('/', (req, res) => {
    const { coluna, prioridade } = req.query;
    let resultado = tarefas;
    if (coluna) {
        resultado = resultado.filter(t => t.coluna === coluna);
    }
    if (prioridade) {
        resultado = resultado.filter(t => t.prioridade === prioridade);
    }
    res.json(resultado);
});

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 4 — Criar tarefa
//----------------------------------------------------------------------------------------------------------------------------

router.post('/', (req, res) => {
    const { texto, prioridade, coluna, cidade } = req.body;
    const novaTarefa = {
        id: proximoId++, 
        texto: texto,
        prioridade:prioridade || 'media',
        coluna: coluna || 'afazer',
        cidade: cidade || '',
    };
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 5 — Atualizar tarefa
//----------------------------------------------------------------------------------------------------------------------------

router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const { texto, prioridade, coluna, cidade } = req.body;
    const indice = tarefas.findIndex(t => t.id === id);
    if (indice === -1) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }
    const tarefaAtualizada = { id, texto, prioridade, coluna, cidade };
    tarefas[indice] = tarefaAtualizada;
    res.json(tarefaAtualizada);
});

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 6 — Deletar tarefa
//----------------------------------------------------------------------------------------------------------------------------

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }
    tarefas = tarefas.filter(t => t.id !== id);
    res.json({ mensagem: 'Tarefa removida com sucesso', id });
});

module.exports = router;