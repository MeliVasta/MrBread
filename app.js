// Abrimos terminal ( ctrl+ñ ), instalamos ( package.json ), sobte la terminal ingresar ' npm init -y '
// Instalamos paquetes en la termianl > 'Command Prompt' > npm i express dotenv mongoose ejs express-session body-parser

// Requerimos los paquetes

const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const connectDB = (require('./config/connectDB'));
const productosRoutes = require('./routes/productos');
const registerRoutes = require('./routes/usuarios');



// Configuración de express-session

app.use( session ({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));


// Configuración de los middleware

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// Configuración de body-parser para manejar datos de formularios

app.use(bodyParser.urlencoded({ extended: true }));


// Middleware para pasar la información del usuario a todas las vistas

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});


// Rutas

app.use('/productos', productosRoutes);
app.use('/usuarios', registerRoutes);



// Rutas GET

app.get('/', (req, res) => {
    res.render('page/home')
});
    
app.get('/productos', (req, res) => {
    res.render('page/productos')
});
    
app.get('/favoritos', (req, res) => {
    res.render('page/favoritos')
});
/*
app.get('/shop', (req, res) => {
    res.render('page/shop')
});
*/
app.get('/contacto', (req, res) => {
    res.render('page/contacto')
});

app.get('/login', (req, res) => {
    res.render('page/login')
});

app.get('/register', (req, res) => {
    res.render('page/register')
});

app.get('/compra-realizada', (req, res) => {
    res.render('page/compra-realizada')
});








// Función para inicar la conexión a la Base de Datos

const iniciar = async () => {
    try{
        await connectDB('mongodb://localhost:27017');
    }
    catch(error){
        console.log('Error al conectar a la base de datos en app.js')
    }
}

iniciar();




// Puerto
app.listen(3717, () => {
    console.log('Puerto ejecutandose correctamente')
});

