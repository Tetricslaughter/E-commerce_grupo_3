const express = require("express");
const app = express();
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mainRoutes = require('./routes/main.js');
const productsRoutes = require('./routes/products.js');
const rememberMeMiddleware = require('./middlewares/rememberMeMiddleware.js');


// configuracion para metodo POST
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// method-override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.static('./public'));
app.listen(3000, () => console.log("el servidor se conecto en el puerto 3000"));
app.use(session({ secret: 'secreto!' }));
app.use(cookieParser());
app.set('view engine', 'ejs');

app.set('views', [
    path.join(__dirname, '/views/users'),
    path.join(__dirname, '/views/products')
]);

app.use((req, res, next) => {
    if (req.session.userLogged != undefined) {
        res.locals.userSignUp = req.session.userLogged;
        console.log("TIENES UN USUARIO EN userSignUp")
    }

    next();
});

app.use(rememberMeMiddleware);

app.use("/", mainRoutes);
app.use("/products", productsRoutes);

// Página ERROR 404
app.use((req, res, next) => {
    res.status(404).render('not-found')
})
