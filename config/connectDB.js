// Configuración con la Base de Datos

// Conexión con la DB Mongo Compass

const mongoose = require('mongoose');


// Función para conectar con la Base de Datos con manejo de errores

const connectDB = async () => {
    try{
        const conection = await mongoose.connect('mongodb://localhost:27017/PanaderiaMrBread');
        console.log('Se conectó a la base de datos correctamente');
    }
    catch(error){
        console.log('Error al conectar a la base de datos en connectDB.js')
    }
};

module.exports = connectDB;

