//console.log('TaskFlow API - pronto para o Express!')
const express = require('express');
const app = express();
const PORTA = 3000;

app.get('/', (req, res) => {
    res.json({ mensagem: 'TaskFlow API funcionando!' });
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});