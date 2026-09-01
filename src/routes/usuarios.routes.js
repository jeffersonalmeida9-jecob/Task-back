const express = require('express');
const router = express.Router ();

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

router.get('/', (req, res) => {
    res.json(usuarios);
});

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 2 — Buscar usuário por ID
//----------------------------------------------------------------------------------------------------------------------------

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const usurio = usuarios.find(t => t.id === id);
    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    usuarios = usuarios.filter(t => t.id !== id);
    res.json({ mensagem: 'Usuario removido com sucesso', id });
});

module.exports = router;