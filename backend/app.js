const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // Importação do módulo path

dotenv.config();

const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);


// Configura o uso de arquivos estáticos (CSS, JS, etc.) a partir da pasta frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rota para a página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html')); // Caminho para o index.html
});
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
