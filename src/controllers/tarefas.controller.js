//----------------------------------------------------------------------------------------------------------------------------
// Tarefas
//----------------------------------------------------------------------------------------------------------------------------

let tarefas = [
    { id: 1, texto: 'Estudar Node', prioridade: 'alta', coluna: 'afazer' },
    { id: 2, texto: 'Criar API', prioridade: 'alta', coluna: 'andamento' },
    { id: 3, texto: 'Testar Postman',prioridade: 'media', coluna: 'concluido' },
];
let proximoId = 4

const tarefasController = {

//----------------------------------------------------------------------------------------------------------------------------
//  1 — Listar todas
//----------------------------------------------------------------------------------------------------------------------------

    listar(req, res) {
        const {coluna} = req.query;
        let resultado = tarefas;
        if (coluna) resultado = tarefas.filter(t => t.coluna === coluna);
        res.json(resultado)
    },

//----------------------------------------------------------------------------------------------------------------------------
//  2 — Buscar tarefa por ID
//----------------------------------------------------------------------------------------------------------------------------


    buscarPorId(req, res) {
        const id = parseInt(req.params.id);
        const tarefa = tarefas.find(t => t.id === id);
        if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada'});
        res.json(tarefa)
    },

//----------------------------------------------------------------------------------------------------------------------------
//  3 — Criar tarefa
//----------------------------------------------------------------------------------------------------------------------------

    criar(req, res) {
        const { texto, prioridade, coluna } = req.body;
        if (!texto) return res.status (400).json({erro: 'Texto obrigatório'});
        const novaTarefa = { 
            id: proximoId++, texto,
            prioridade: prioridade || 'media',
            coluna: coluna || 'afazer'     
        }
        tarefas.push(novaTarefa);
        res.status(201).json(novaTarefa);
    },

//----------------------------------------------------------------------------------------------------------------------------
//  5 — Atualizar tarefa
//----------------------------------------------------------------------------------------------------------------------------

    atualizar(req, res) {
        const id = Number(req.params.id);
        const { texto, prioridade, coluna, cidade } = req.body;
        const indice = tarefas.findIndex(t => t.id === id);
        if (indice === -1) {
            return res.status(404).json({ erro: 'Tarefa não encontrada' });
        }
        const tarefaAtualizada = { id, texto, prioridade, coluna, cidade };
        tarefas[indice] = tarefaAtualizada;
        res.json(tarefaAtualizada);
        },
        

//----------------------------------------------------------------------------------------------------------------------------
//  6 — Deletar tarefa
//----------------------------------------------------------------------------------------------------------------------------

    remover(req, res) {
        const id = parseInt(req.params.id);
        const idx = tarefas.findIndex(t => t.id === id);
        if (idx === -1) {
            return res.status(404).json({ erro: 'Tarefa não encontrada' });
        }
        const removida = tarefas.splice(idx, 1)[0]
        res.json({ mensagem: 'Tarefa removida com sucesso', tarefa: removida });
    },

//----------------------------------------------------------------------------------------------------------------------------
//  7 — Estatisticas tarefa
//----------------------------------------------------------------------------------------------------------------------------

    estatisticas(req, res) {
        const {coluna} = req.query;
        const base = coluna ? tarefas.filter(t => t.coluna === coluna) : tarefas;
        const porColuna = {
            afazer: base.filter(t => t.coluna === 'afazer').length,
            andamento: base.filter(t => t.coluna === 'andamento').length,
            concluido: base.filter(t => t.coluna === 'concluido').length,
        };
        res.json({total: base.length, porColuna})
    },
};

module.exports = tarefasController