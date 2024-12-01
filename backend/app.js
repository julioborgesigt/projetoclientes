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


// Rota para a página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html')); // Supondo que você tenha um index.html na pasta public
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
