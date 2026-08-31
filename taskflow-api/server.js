//console.log('TaskFlow API - pronto para o Express!')
const express = require('express');
const app = express();
const PORTA = 3000;

app.use(express.json());

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 1 — Status da API
//----------------------------------------------------------------------------------------------------------------------------

app.get('/', (req, res) => {
    res.json({ api: 'TaskFlow', versao: '1.0', status: 'online' });
});

//----------------------------------------------------------------------------------------------------------------------------
// Tarefas
//----------------------------------------------------------------------------------------------------------------------------

let tarefas = [
    { id: 1, texto: 'Estudar Node', prioridade: 'alta', coluna: 'afazer' },
    { id: 2, texto: 'Criar API', prioridade: 'alta', coluna: 'andamento' },
    { id: 3, texto: 'Testar Postman',prioridade: 'media', coluna: 'concluido' },
];
let proximoId = 4;

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 2 — Buscar tarefa por ID
//----------------------------------------------------------------------------------------------------------------------------

app.get('/tarefas/:id', (req, res) => {
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

app.get('/tarefas', (req, res) => {
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
//ROTA 4 — Criar tarefa
//----------------------------------------------------------------------------------------------------------------------------

app.post('/tarefas', (req, res) => {
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

app.put('/tarefas/:id', (req, res) => {
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

app.delete('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id);
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }
    tarefas = tarefas.filter(t => t.id !== id);
    res.json({ mensagem: 'Tarefa removida com sucesso', id });
});

//----------------------------------------------------------------------------------------------------------------------------
// Usuários
//----------------------------------------------------------------------------------------------------------------------------

const usuarios = [
    { id: 1, nome: 'Admin', email: 'adimin@gmail.com',},
    { id: 2, nome: 'Jeff', email: 'jeff@gmail.com'},
    { id: 3, nome: 'Jecob',email: 'jecob@gmail.com'},
];

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 1 - Listar todos os usuários
//----------------------------------------------------------------------------------------------------------------------------

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 2 — Buscar usuário por ID
//----------------------------------------------------------------------------------------------------------------------------

app.get('/usuarios/:id', (req, res) => {
    const id = Number(req.params.id);
    const usuario = usuarios.find(t => t.id === id);
    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    res.json(usuario);
});

//----------------------------------------------------------------------------------------------------------------------------
//ROTA 3 — Adicionar usuário 
//----------------------------------------------------------------------------------------------------------------------------

app.post('/usuarios', (req, res) => {
    const { nome, email,} = req.body;
    const novoUsuario = {
        id: proximoId++, 
        nome: nome,
        email: email || '',
    };
    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 4 — Atualizar usuário
//----------------------------------------------------------------------------------------------------------------------------

app.put('/usuarios/:id', (req, res) => {
    const id = Number(req.params.id);
    const { nome, email } = req.body;
    const indice = usuarios.findIndex(t => t.id === id);
    if (indice === -1) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    const tarefaAtualizada = { id, nome, email, };
    usuarios[indice] = usuarioAtualizado;
    res.json(usuarioAtualizado);
});

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 5 — Deletar usuarios
//----------------------------------------------------------------------------------------------------------------------------

app.delete('/usuarios/:id', (req, res) => {
    const id = Number(req.params.id);
    const usurio = usuarios.find(t => t.id === id);
    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    usuarios = usuarios.filter(t => t.id !== id);
    res.json({ mensagem: 'Usuario removido com sucesso', id });
});

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 6 — 404 genérico
//----------------------------------------------------------------------------------------------------------------------------
app.use((req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada',
        metodo: req.method,
        caminho: req.url,
    });
});

app.listen(PORTA, () => console.log(`Porta ${PORTA}`));