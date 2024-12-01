const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);


// Configuração das rotas
app.get('/', (req, res) => {
    res.send('Página de Boas-Vindas'); // Ou qualquer outra página que você deseja mostrar
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
