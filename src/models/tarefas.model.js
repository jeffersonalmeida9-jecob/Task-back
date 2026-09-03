//----------------------------------------------------------------------------------------------------------------------------
// Tarefas
//----------------------------------------------------------------------------------------------------------------------------

let tarefas = [
    { id: 1, texto: 'Estudar Node', prioridade: 'alta', coluna: 'afazer' },
    { id: 2, texto: 'Criar API', prioridade: 'alta', coluna: 'andamento' },
    { id: 3, texto: 'Testar Postman',prioridade: 'media', coluna: 'concluido' },
];
let proximoId = 4

module.exports = {
    listar: () => tarefas,

    listarPorColuna: (coluna) => tarefas.filter (t => t.coluna === coluna),

    buscar: (id) => tarefas.find(t => t.id === id),

    adicionar: ({ texto, prioridade, coluna }) => {
                const novaTarefa = { 
            id: proximoId++, texto,
            prioridade: prioridade || 'media',
            coluna: coluna || 'afazer'     
        }
        tarefas.push(novaTarefa);
        return novaTarefa
    },

    atualizar: (id, dados) => {
        const indice = tarefas.findIndex(t => t.id === id);
        if (indice === -1) {
            return null;
        }
        tarefas[indice] = {
            id,
            ...dados
        };
        return tarefas[indice];
    },

    remover: (id) => {
        const indice = tarefas.findIndex(t => t.id === id);
        if (indice === -1) {
            return null;
        }
        return tarefas.splice(indice, 1)[0];
    }
};