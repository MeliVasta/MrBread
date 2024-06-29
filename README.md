# Proyecto de e-commerce 

Este proyecto es una aplicación web de una panadería utilizando tecnologías back-end y front-end. Tiene funcionalidades básicas como listar productos, agregar productos a un carrito de compras, y completar una compra. Está desarrollado utilizando Node.js, base de datos MongoDB Compass, Express, EJS como motor de plantillas y CSS para el diseño.

## Tecnologías Utilizadas

- Node.js
- MongoDB Compass
- Express
- EJS (Embedded JavaScript Templates)
- CSS
- Google Fonts
- BS Icon

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local:

1. **Clonar el repositorio**

    ``` Abrir consola en Visual Studio Code e ingresar a Git Bash
    git clone https://github.com/MeliVasta/MrBread.git
    cd MrBread
    ```

2. **Instalar dependencias**

    Asegúrate de tener [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/) instalados en tu máquina. Luego, instala las dependencias del proyecto ejecutando:

    ```Abrir consola en Visual Studio Code e ingresar cmd (Command Prompt)
    npm install
    ```

3. **Instalar MongoDB Compass**

    1. Ingresar a 'https://www.mongodb.com/products/tools/compass', descargar el archivo e instalarlo. Una verz finalizado, copiar tu url de mongo.
    2. Abrir el proyecto e ir a 'connectDB' y cambiar de url dejando el final del original (despues de /PanaderiaMrBread)
    3. En el archico 'unificar.js' repetir los mismos pasos pero solo la url.
    4. Repetir el mismo paso en app.js (abajo de todo el archivo)
    5. Por último, abrir la terminal e ingresar 'node unificar.js'
    6. ¡Ya estaría conectado a la base de datos!

4. **Iniciar el servidor**

    Inicia el servidor Express ejecutando:

    ```Abrir consola en Visual Studio Code e ingresar cmd (Command Prompt)
    nodemon
    ```

5. **Abrir en el navegador**

    Abre tu navegador y navega a `http://localhost:3717` para ver la aplicación en funcionamiento.
