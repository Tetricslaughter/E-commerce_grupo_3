const express = require("express");
const app = express();
const path = require('path');

// routes
const mainRoutes = require('./routes/main.js');
const productsRoutes = require('./routes/products.js');

app.use(express.static('public'));
app.listen(3000, () => console.log("el servidor se conecto en el puerto 3000"));


// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');

// Configurar los directorios de vistas
app.set('views', [
    path.join(__dirname, '/views/users'),
    path.join(__dirname, '/views/products')
]);

app.use("/", mainRoutes);
app.use("/products", productsRoutes);

    