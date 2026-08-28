console.log ('ola, Node.js!');
const nome = 'TaskFlow API';

const versao = 1;

console.log(`Projeto: ${nome}`)
console.log(`Versao: ${versao}`)

const tarefas = ['Estudar Node', 'criar API', 'Testar no Postman']
tarefas.forEach (t => console.log(' -', t));

console.log(Process.pataform)
console.log(Process.env.PATH)

