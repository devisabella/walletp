const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const transactionRoutes = require('./routes/transactionRoutes');
app.use('/transactions', transactionRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

console.log('Rotas carregadas com sucesso.');
