//----------------------------------------------------------------------------------------------------------------------------
// Usuários
//----------------------------------------------------------------------------------------------------------------------------

let usuarios = [
    { id: 1, nome: 'Admin', email: 'adimin@gmail.com',},
    { id: 2, nome: 'Jeff', email: 'jeff@gmail.com'},
    { id: 3, nome: 'Jecob',email: 'jecob@gmail.com'},
];
let proximoId = 4

module.exports = {
    listar: () => usuarios,

    buscar: (id) => usuarios.find(t => t.id === id),

    adicionar: ({ nome, email }) => {
                const novousuario = { 
            id: proximoId++, 
            nome: nome,
            email: email    
        }
        usuarios.push(novousuario);
        return novousuario
    },

    atualizar: (id, dados) => {
        const indice = usuarios.findIndex(t => t.id === id);
        if (indice === -1) {
            return null;
        }
        usuarios[indice] = {
            id,
            ...dados
        };
        return usuarios[indice];
    },

    remover: (id) => {
        const indice = usuarios.findIndex(t => t.id === id);
        if (indice === -1) {
            return null;
        }
        return usuarios.splice(indice, 1)[0];
    }
};