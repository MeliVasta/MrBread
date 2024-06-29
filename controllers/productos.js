// Requerimos la colección Productos y Usuarios de la DB

const Productos = require("../models/productos");

// Función para obtener todos los documentos de la colección Productos de la DB

const obtenerTodosLosProductos = async (req, res) => {
    try {
        // Obtener todos los productos de la DB
        const productos = await Productos.find({});
        res.render("page/productos", {
            productos: productos,
            resultados: [],
            busqueda: "",
        });
    } catch (error) {
        console.error("Error al obtener todos los productos:", error);
    }
};

// Función para buscar productos por nombre o descripción

const buscarProductos = async (req, res) => {
    console.log("Comenzando filtrado de productos");

    try {
        const busqueda = req.query.q.toLowerCase(); // Término de búsqueda desde la URL

        // Recuperar todos los productos desde la base de datos
        const todosLosProductos = await Productos.find();

        // Filtrar los productos
        const resultados = todosLosProductos.filter(
            (producto) =>
                producto.nombre.toLowerCase().includes(busqueda) ||
                producto.descripcion.toLowerCase().includes(busqueda)
        );

        // Renderizar la vista con los resultados encontrados
        res.render("page/productos", {
            productos: [],
            resultados: resultados,
            busqueda: busqueda,
        });
    } catch (error) {
        console.log("Error al buscar productos:", error);
    }
};

// Función carrito de compra

const carritoDeCompra = async (req, res) => {
    console.log("Agregando producto al carrito");

    const idReq = { _id: req.params.id };

    try {
        // Verificar si el usuario está autenticado
        if (!req.session.login) {
            return res.redirect("/login");
        }

        // Buscar el producto por su ID en la base de datos
        let producto = await Productos.findOne(idReq);
        console.log("IDREQ: ", idReq);

        if (!producto) {
            console.log("Producto no encontrado");
            return res.status(404).send("Producto no encontrado");
        }

        // Inicializar el carrito en la sesión si no existe
        if (!req.session.carrito) {
            req.session.carrito = [];
        }

        // Verificar si el producto ya está en el carrito
        const productoEnCarritoIndex = req.session.carrito.findIndex(
            (prod) => prod._id.toString() === producto._id.toString()
        );

        if (productoEnCarritoIndex !== -1) {
            // Si el producto ya está en el carrito, aumentar la cantidad
            req.session.carrito[productoEnCarritoIndex].cantidad += 1;
        } else {
            // Si el producto no está en el carrito, agregarlo con cantidad 1
            req.session.carrito.push({ ...producto.toObject(), cantidad: 1 });
        }

        console.log(
            "Carrito de compra actualizado:",
            req.session.carrito
        );

        // Calcular el total del carrito asegurando que los valores sean números
        let total = req.session.carrito.reduce((acc, prod) => {
            const precio = Number(prod.precio) || 0;
            const cantidad = Number(prod.cantidad) || 0;
            return acc + precio * cantidad;
        }, 0);

        // Renderizar la vista shop.ejs con el carrito y el total
        res.render("page/shop", { carrito: req.session.carrito, total: total });
    } catch (error) {
        console.log("Error al agregar producto al carrito de compra", error);
        res.status(500).send("Error al agregar producto al carrito de compra");
    }
};


// Función para obtener todos los documentos de la colección Productos por categorías

const buscarPorPanificado = async (req, res) => {
    // Petición a la base de datos collecion Productos
    try {
        // Obtener solo los productos que tengan la categoría Panificado
        const productos = await Productos.find({ categoria: "Panificado" });
        res.render("page/productos", {
            productos: productos,
            resultados: [],
            busqueda: "",
        });

        console.log(
            "Petición a colección productos, categoría panificados todo ok"
        );
    } catch (erorr) {
        console.log("Error al obtener productos de la categoría panificados");
    }
};

const buscarPorPasteleria = async (req, res) => {
    // Petición a la base de datos collecion Productos
    try {
        // Obtener solo los productos que tengan la categoría Pastelería
        const productos = await Productos.find({ categoria: "Pastelería" });
        res.render("page/productos", {
            productos: productos,
            resultados: [],
            busqueda: "",
        });

        console.log("Petición a colección productos, categoría pasteleria todo ok");
    } catch (erorr) {
        console.log("Error al obtener productos de la categoría pasteleria");
    }
};

const buscarPorSalado = async (req, res) => {
    // Petición a la base de datos collecion Productos
    try {
        // Obtener solo los productos que tengan la categoría Pastelería
        const productos = await Productos.find({ categoria: "Salado" });
        res.render("page/productos", {
            productos: productos,
            resultados: [],
            busqueda: "",
        });

        console.log("Petición a colección productos, categoría salado todo ok");
    } catch (erorr) {
        console.log("Error al obtener productos de la categoría salado");
    }
};

// Función para eliminar un producto del carrito

const eliminarProductoCarrito = async (req, res) => {
    const productId = req.params.id;

    try {
        // Encontrar el índice del producto en el carrito
        const index = req.session.carrito.findIndex(
            (producto) => producto._id === productId
        );

        if (index !== -1) {
            // Eliminar el producto del carrito
            req.session.carrito.splice(index, 1);
        }

        // Calcular el total del carrito
        let total = 0;
        if (req.session.carrito.length > 0) {
            total = req.session.carrito.reduce((acc, prod) => acc + prod.precio, 0);
        }

        // Renderizar la vista shop.ejs con el carrito y el total actualizados
        res.render("page/shop", { carrito: req.session.carrito, total: total });
    } catch (error) {
        console.log("Error al eliminar producto del carrito de compra", error);
    }
};


//  Función para finalizar compra carrito

const comprarProductos = async (req, res) => {
    try {
        // Verificar si hay productos en el carrito
        if (!req.session.carrito || req.session.carrito.length === 0) {
            console.log("No hay productos en el carrito para finalizar la compra.");
        }

        // Vaciar el carrito después de la compra
        req.session.carrito = [];

        // Renderizar la página de compra realizada con el mensaje
        res.render("page/compra-realizada");

    } catch (error) {
        console.log("Error al finalizar la compra del carrito", error);
    }
};


// Función para sumar unidades de un producto en el carrito

const sumarProductoUnidad = async (req, res) => {
    const productoId = req.params.id;

    try {
        // Encontrar el producto en el carrito
        const producto = req.session.carrito.find(
            (prod) => prod._id === productoId
        );

        if (producto) {
            // Aumentar la cantidad del producto
            producto.cantidad = producto.cantidad ? producto.cantidad + 1 : 1;
        }

        // Calcular el total del carrito
        let total = 0;
        if (req.session.carrito.length > 0) {
            total = req.session.carrito.reduce(
                (acc, prod) => acc + prod.precio * prod.cantidad,
                0
            );
        }

        // Renderizar la vista shop.ejs con el carrito y el total actualizados
        res.render("page/shop", { carrito: req.session.carrito, total: total });
    } catch (error) {
        console.log(
            "Error al intentar sumar una unidad del carrito de compra",
            error
        );
    }
};

// Función para restar unidades de un producto en el carrito

const restarProductoUnidad = async (req, res) => {
    const productoId = req.params.id;

    try {
        // Encontrar el producto en el carrito
        const producto = req.session.carrito.find(
            (prod) => prod._id === productoId
        );

        if (producto && producto.cantidad > 0) {
            // Disminuir la cantidad del producto
            producto.cantidad -= 1;

            // Si la cantidad llega a cero, eliminar el producto del carrito
            if (producto.cantidad === 0) {
                const index = req.session.carrito.indexOf(producto);
                req.session.carrito.splice(index, 1);
            }
        }

        // Calcular el total del carrito
        let total = 0;
        if (req.session.carrito.length > 0) {
            total = req.session.carrito.reduce(
                (acc, prod) => acc + prod.precio * prod.cantidad,
                0
            );
        }

        // Renderizar la vista shop.ejs con el carrito y el total actualizados
        res.render("page/shop", { carrito: req.session.carrito, total: total });
    } catch (error) {
        console.log(
            "Error al intentar restar una unidad del carrito de compra",
            error
        );
    }
};

// Exportamos módulos

module.exports = {
    obtenerTodosLosProductos,
    buscarPorPanificado,
    buscarPorPasteleria,
    buscarPorSalado,
    carritoDeCompra,
    eliminarProductoCarrito,
    comprarProductos,
    sumarProductoUnidad,
    restarProductoUnidad,
    buscarProductos,
};
