const bcrypt = require('bcryptjs');
const Usuarios = require("../models/usuarios");



// Función para agregar nuevo usuarios a la colección Usuarios

const agregarUsuarios = async (req, res) => {
    console.log("Agregando usuario nuevo");

    const nombreUsuario = req.body.usuario;
    const email = req.body.email;
    const contrasena = req.body.contrasena;
    const confirmcontrasena = req.body.confirmContrasena;

    console.log("Nombre de usuario " + nombreUsuario);

            // Generar el hash de la contraseña
            const hashedPassword = await bcrypt.hash(contrasena, 10); 

    if (contrasena === confirmcontrasena) {
        await Usuarios.insertMany({
            usuario: nombreUsuario,
            email: email,
            contrasena: hashedPassword,
        });
        res.render("page/login");
    } else {
        console.log("Las contraseñas no coinciden");
        res.redirect("/register");
    }
};


// Función para verificar si existe usuario en la colección Usuarios

    const cuentaExistenteUsuarios = async (req, res) => {
        console.log("Verificando si tiene usuario existente");
    
        const nombreUsuario = req.body.usuario;
        const contrasena = req.body.contrasena;
    
        try {
            // Buscar el usuario por nombre de usuario
            const usuario = await Usuarios.findOne({ usuario: nombreUsuario });
    
            if (!usuario) {
                console.log('Usuario no encontrado');
            }
    
            // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
            const contraseñaValida = bcrypt.compare(contrasena, usuario.contrasena);
    
            if (contraseñaValida) {
                console.log('Usuario autenticado');
                req.session.login = true;
                req.session.user = nombreUsuario; // Establece el usuario en la sesión
                res.redirect('/'); // Redirige a la página principal al validar correctamente el usuario
            } else {
                console.log('Contraseña incorrecta');
            }
        } catch (error) {
            console.log('Error al verificar usuario', error);
        }
    };


// Middleware de verificación de usuario

const autenticacionUsuario = (req, res, next) => {
    if (req.session.login) {
        return next();
    } else {
        res.redirect('/login'); 
    }
};


// Exportamos módulos

module.exports = {
    agregarUsuarios,
    cuentaExistenteUsuarios,
    autenticacionUsuario
};
