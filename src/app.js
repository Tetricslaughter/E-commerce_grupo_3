const express = require("express");
const app = express();

// routes
const mainRoutes = require('./routes/main.js');
const productsRoutes = require('./routes/products.js');

app.use(express.static('public'));
app.listen(3000, () => console.log("el servidor se conecto en el puerto 3000"));


// seteamos el template engine EJS
app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');


app.use("/", mainRoutes);
app.use("/products", productsRoutes);

    