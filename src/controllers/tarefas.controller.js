const tarefasModel = require('../models/tarefas.model');
const usuariosModel = require('../models/usuario.model')

const tarefasController = {

//----------------------------------------------------------------------------------------------------------------------------
//  1 — Listar todas
//----------------------------------------------------------------------------------------------------------------------------

    listar(req, res) {
        const {coluna, usuarioId} = req.query;
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
        const { texto, prioridade, coluna, usuarioId } = req.body;
        if (
            coluna !== 'afazer' 
            && coluna !== 'andamento' 
            && coluna !== 'concluida') 
            return res.status (400).json({erro: 'Coluna inválida. Use: afazer, andamento ou concluida'})
        if (
            prioridade !== 'alta' 
            && prioridade !==  'media' 
            && prioridade !== 'baixa')
            return res.status (400).json({erro: 'Prioridade inválida. Use: alta, media ou baixa'})
        if (!texto) return res.status (400).json({erro: 'Texto obrigatório'});
        const tarefas_andameto = tarefasModel.listar().filter(t => t.coluna === 'andamento')
        if (tarefas_andameto.length >= 2) return res.status(400).json({erro: 'Limite de 2 tarefas em andamento por usuário atingido'})
        const id_u = usuariosModel.buscar(usuarioId)
        if (!id_u) return res.status (400).json({erro: 'Usuário não encontrado'})
        const novaTarefa = tarefasModel.adicionar ({
            texto,
            prioridade,
            coluna,
            usuarioId
        });
        res.status(201).json(novaTarefa);
    },

//----------------------------------------------------------------------------------------------------------------------------
//  5 — Atualizar tarefa
//----------------------------------------------------------------------------------------------------------------------------

    atualizar(req, res) {
        const id = Number(req.params.id);
        const { texto, prioridade, coluna, usuarioId, cidade } = req.body;
        let tarefaAtualizada
        if (coluna === "concluida") {
            tarefaAtualizada = tarefasModel.atualizar(id, {
                texto,
                prioridade,
                coluna,
                usuarioId,
                concluidaEm: new Date().toISOString()
            });
        }    else {
            tarefaAtualizada = tarefasModel.atualizar(id, {
                texto,
                prioridade,
                coluna,
                usuarioId,
            });
        }
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
        res.json(coluna ? tarefasModel.listar() : tarefasModel.estatisticas())
    },
};

module.exports = tarefasController