// Conexión con la DB Mongo Compass

const mongoose = require('mongoose');


// Creamos esquema del documento usuarios

const usuarios = new mongoose.Schema({
    usuario: String,
    email: String,
    contrasena: String,
    confirmcontrasena: String
});


// Creamos colección de usuarios en la DB

const Usuarios = mongoose.model('Usuarios', usuarios);


// Exportamos módulo 

module.exports = Usuarios;