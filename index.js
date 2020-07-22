require('dotenv').config();

const express = require('express');
const cors = require('cors');


const { ConoectionDB } = require('./database/config');

// Crear servidor Express
const app = express();

// Configurar CORS
app.use(cors());


// Base de datos
ConoectionDB();


// console.log(process.env);


// mean_user
// 0rYEQQkF75DxuLbH

// Routes
app.get('/', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Hello World'
    });
});


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});