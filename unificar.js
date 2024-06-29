// Requerimos funciónes a utilizar para enviar los datos a la Base de Datos

const connectDB = require('./config/connectDB');
const Productos = require('./models/productos');
const jsonProductos = require('./datos.json');


const crearProductos = async () => {
    try{
        await connectDB('mongodb://localhost:27017')  // Conección a la DB
        await Productos.create(jsonProductos) // Enviando datos

        console.log('Se ejecutó el cambio o se agregaron nuevos');
    }

    catch(error){
        console.log('Error al ejecutar cambio o agregar dato a la DB')
    }
}

crearProductos(); 