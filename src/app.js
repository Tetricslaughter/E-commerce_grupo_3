const express = require("express");
const app = express();
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mainRoutes = require('./routes/main.js');
const productsRoutes = require('./routes/products.js');
const rememberMeMiddleware = require('./middlewares/rememberMeMiddleware.js');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('./public'));
app.use(session({ secret: 'secreto!' }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.listen(3000, () => console.log("el servidor se conecto en el puerto 3000"));

app.set('views', [
    path.join(__dirname, '/views/users'),
    path.join(__dirname, '/views/products')
]);

app.use(rememberMeMiddleware);

/**
 * Las variables definidas en res.locals estan disponibles en todas las vistas
 */
app.use((req, res, next) => {
    if (req.session.userLogged != undefined) {
        res.locals.userLogged = req.session.userLogged;
        console.log("TIENES UN USUARIO LOGEADO: "+req.session.userLogged.username);
        // console.log(res.locals.userLogged);
    }
    next();
});


app.use("/", mainRoutes);
app.use("/products", productsRoutes);

// Página ERROR 404
app.use((req, res, next) => {
    res.status(404).render('not-found')
})
