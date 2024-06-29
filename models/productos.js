// Conexión con la DB Mongo Compass

const mongoose = require('mongoose');


// Creamos esquema del documento producto

const productos = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    precio: Number,
    imagen: String,
    categoria: String
});


// Creamos colección de productos en la DB

const Productos = mongoose.model('Productos', productos);


// Exportamos módulo 

module.exports = Productos;