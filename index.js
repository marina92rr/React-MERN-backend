

const express = require('express');     //Importacion de express
require('dotenv').config();  // Cargar las variables de entorno
const cors = require('cors');
const {dbConnection} = require('./database/config');        //


//Crear servidor express
const app = express();

// BBDD
dbConnection();

//CORS
app.use( cors());

//Directorio publico
app.use( express.static('public'));

//Lectura y parsero del body
app.use( express.json());


//Rutas
//auth: crear, login, renew...
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );
//CRUD: eventos

//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(` Servidor ejecutandose en el puerto ${process.env.PORT}`);
} );