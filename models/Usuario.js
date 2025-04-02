
const mongoose = require('mongoose');       //importar BBDD MongoDB
const { Schema, model} = require('mongoose');


//Los campos que debe tener un usuario
const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

module.exports = model('Usuario', UsuarioSchema);       //Exportar usuarioSchema como Usuario