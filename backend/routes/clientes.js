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


const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Rota para enviar mensagem pelo WhatsApp
router.post('/send-message', (req, res) => {
    const { whatsapp, message } = req.body;

    client.messages
        .create({
            from: 'whatsapp:+5588988416813', // Número do Twilio
            to: `whatsapp:${whatsapp}`,
            body: message,
        })
        .then(() => res.status(200).json({ message: 'Mensagem enviada com sucesso!' }))
        .catch(err => res.status(500).json({ error: 'Erro ao enviar mensagem', details: err }));
});


router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM clientes WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'Erro ao excluir cliente' });
        res.status(200).json({ message: 'Cliente excluído com sucesso!' });
    });
});


router.put('/mark-pending/:id', (req, res) => {
    const { id } = req.params;
    db.query('UPDATE clientes SET status = "pendente" WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'Erro ao atualizar status' });
        res.status(200).json({ message: 'Cliente marcado como pagamento pendente' });
    });
});


router.put('/mark-paid/:id', (req, res) => {
    const { id } = req.params;
    db.query('UPDATE clientes SET status = "cobrança feita" WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'Erro ao atualizar status' });
        res.status(200).json({ message: 'Cliente marcado como cobrança feita' });
    });
});


router.get('/list', (req, res) => {
    db.query('SELECT * FROM clientes ORDER BY vencimento ASC', (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro ao listar clientes' });
        res.json(results); // Retorna os clientes com todos os campos, incluindo o status
    });
});


// Salvar mensagem padrão no banco de dados
router.post('/save-message', (req, res) => {
    const { message } = req.body;

    if (!message || message.trim() === '') {
        return res.status(400).json({ error: 'A mensagem não pode estar vazia.' });
    }

    // Exemplo: Salvar no banco de dados (uma tabela chamada 'config' pode ser usada)
    db.query(
        'UPDATE config SET whatsapp_message = ? WHERE id = 1',
        [message],
        (err) => {
            if (err) {
                console.error('Erro ao salvar mensagem padrão:', err);
                return res.status(500).json({ error: 'Erro ao salvar mensagem padrão.' });
            }
            res.status(200).json({ message: 'Mensagem padrão salva com sucesso!' });
        }
    );
});


// Rota para buscar a mensagem padrão
router.get('/get-message', (req, res) => {
    db.query('SELECT whatsapp_message FROM config WHERE id = 1', (err, results) => {
        if (err) {
            console.error('Erro ao buscar mensagem padrão:', err);
            return res.status(500).json({ error: 'Erro ao buscar mensagem padrão.' });
        }
        res.status(200).json({ message: results[0]?.whatsapp_message || '' });
    });
});
