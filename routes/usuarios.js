const express = require('express');
const router = express.Router();
const { agregarUsuarios, cuentaExistenteUsuarios, autenticacionUsuario } = require('../controllers/usuarios');

// Ruta para agregar usuarios nuevo a colección Usuarios en la DB
router.route('/usuarioregistrado').post(agregarUsuarios);
router.route('/usuariologueado').post(cuentaExistenteUsuarios); // Cambiar a POST para manejo de formularios de login

// Ruta protegida de ejemplo
router.route('/protected').get(autenticacionUsuario, (req, res) => {
    res.send('Bienvenido a la página protegida');
});

// Exportamos módulo
module.exports = router;
