const express = require('express');
require('dotenv').config();
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares base
app.use(cors());
app.use(express.json());

// Ruta de prueba inicial
app.get('/', (req, res) => {
    res.send('Servidor de Speedcuberos API corriendo en el puerto ' + PORT);
});

// Rutas de autenticación
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});