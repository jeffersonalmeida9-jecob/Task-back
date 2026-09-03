const tarefasModel = require('../models/tarefas.model');

const tarefasController = {

//----------------------------------------------------------------------------------------------------------------------------
//  1 — Listar todas
//----------------------------------------------------------------------------------------------------------------------------

    listar(req, res) {
        const {coluna} = req.query;
        const resultado = coluna
            ? tarefasModel.listarPorColuna(coluna)
            : tarefasModel.listar();
        res.json(resultado);
    },

//----------------------------------------------------------------------------------------------------------------------------
//  2 — Buscar tarefa por ID
//----------------------------------------------------------------------------------------------------------------------------


    buscarPorId(req, res) {
        const id = parseInt(req.params.id);
        const tarefa = tarefasModel.buscar(id)
        if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada'});
        res.json(tarefa)
    },

//----------------------------------------------------------------------------------------------------------------------------
//  3 — Criar tarefa
//----------------------------------------------------------------------------------------------------------------------------

    criar(req, res) {
        const { texto, prioridade, coluna } = req.body;
        if (!texto) return res.status (400).json({erro: 'Texto obrigatório'});
        const novaTarefa = tarefasModel.adicionar ({
            texto,
            prioridade,
            coluna 
        });
        res.status(201).json(novaTarefa);
    },

//----------------------------------------------------------------------------------------------------------------------------
//  5 — Atualizar tarefa
//----------------------------------------------------------------------------------------------------------------------------

    atualizar(req, res) {
        const id = Number(req.params.id);
        const { texto, prioridade, coluna, cidade } = req.body;
        const tarefaAtualizada = tarefasModel.atualizar(id, {
            texto,
            prioridade,
            coluna
        });
        if (!tarefaAtualizada) {
            return res.status(404).json({ erro: 'Tarefa não encontrada' });
        }
        res.json(tarefaAtualizada);
        },
        

//----------------------------------------------------------------------------------------------------------------------------
//  6 — Deletar tarefa
//----------------------------------------------------------------------------------------------------------------------------

    remover(req, res) {
        const id = parseInt(req.params.id);
        const removida = tarefasModel.remover(id);
        if (!removida) {
            return res.status(404).json({ erro: 'Tarefa não encontrada' });
        }
        res.json({ mensagem: 'Tarefa removida com sucesso', tarefa: removida });
    },

//----------------------------------------------------------------------------------------------------------------------------
//  7 — Estatisticas tarefa
//----------------------------------------------------------------------------------------------------------------------------

    estatisticas(req, res) {
        const {coluna} = req.query;
        const base = coluna ? tarefasModel.listarPorColuna(coluna) : tarefasModel.listar();
        const porColuna = {
            afazer: base.filter(t => t.coluna === 'afazer').length,
            andamento: base.filter(t => t.coluna === 'andamento').length,
            concluido: base.filter(t => t.coluna === 'concluido').length,
        };
        res.json({total: base.length, porColuna})
    },
};

module.exports = tarefasController