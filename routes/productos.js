// Requerimos los paquetes

const express = require('express');
const router = express.Router();
const { obtenerTodosLosProductos, buscarPorPanificado, buscarPorPasteleria, buscarPorSalado, carritoDeCompra, eliminarProductoCarrito, sumarProductoUnidad, restarProductoUnidad, comprarProductos, buscarProductos } = require ('../controllers/productos');
const  { autenticacionUsuario } = require('../controllers/usuarios');

// Ruta a todos los productos

router.route('/all').get(obtenerTodosLosProductos);


// Ruta carrito compra

router.route('/shop/:id').get(autenticacionUsuario, carritoDeCompra);


// Ruta para ver el carrito de compras

router.route('/shop').get(autenticacionUsuario, (req, res) => {
    const carrito = req.session.carrito || [];
    const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    res.render('page/shop', { carrito: carrito, total: total });
});


// Ruta para eliminar un producto del carrito

router.post('/:id/eliminar', eliminarProductoCarrito);


// Rutas para sumar y restar unidades de productos en el carrito

router.post('/:id/sumar', sumarProductoUnidad);
router.post('/:id/restar', restarProductoUnidad);


// Rutas por categorías 

router.route('/panificado').get(buscarPorPanificado);
router.route('/pasteleria').get(buscarPorPasteleria);
router.route('/salado').get(buscarPorSalado);


// Ruta para finalizar la compra

router.post('/comprar', comprarProductos);


// Ruta para buscar productos

router.get('/buscar', buscarProductos);


// Exportamos módulo 

module.exports = router;