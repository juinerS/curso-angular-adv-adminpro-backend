require('dotenv').config();

const express = require('express');
const cors = require('cors');


const { ConoectionDB } = require('./database/config');

// Crear servidor Express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos
ConoectionDB();

// Routes
app.use('/api/user', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});