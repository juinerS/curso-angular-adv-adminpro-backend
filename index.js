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

// Directorio Público
app.use(express.static('public'));

// Routes
app.use('/api/user', require('./routes/users'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});