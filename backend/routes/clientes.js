const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// Rota para adicionar cliente
router.post('/add', (req, res) => {
    const { name, vencimento, servico, whatsapp, observacoes } = req.body;

    db.query(
        'INSERT INTO clientes (name, vencimento, servico, whatsapp, observacoes) VALUES (?, ?, ?, ?, ?)',
        [name, vencimento, servico, whatsapp, observacoes],
        (err, results) => {
            if (err) return res.status(500).json({ error: 'Erro ao adicionar cliente' });
            res.status(201).json({ message: 'Cliente adicionado com sucesso!' });
        }
    );
});

// Rota para listar clientes
router.get('/list', (req, res) => {
    db.query('SELECT * FROM clientes', (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro ao buscar clientes' });
        res.status(200).json(results);
    });
});

module.exports = router;
