const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const mainRoutes = require('./routes/main.js');
const productsRoutes = require('./routes/products.js');

const productsAPIRoutes = require('./routes/api/productsApi.js');
const usersAPIRoutes = require('./routes/api/usersApi.js');

const rememberMeMiddleware = require('./middlewares/rememberMeMiddleware.js');

app.use(express.static('./public'));

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

const PORT = 3000;
app.listen(PORT, () => console.log(`Up to -> http://localhost:${PORT}`));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(session({ secret: 'secreto!' }));

app.use(cookieParser());

app.set('views', [
    path.join(__dirname, '/views/users'),
    path.join(__dirname, '/views/products')
]);

let corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Methods", "OPTIONS, POST, GET, PUT, DELETE");
    res.header('Access-Control-Allow-Headers', "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    next();
}

app.use(allowCrossDomain);

app.use(rememberMeMiddleware);

// Las variables definidas en res.locals estan disponibles en todas las vistas
app.use((req, res, next) => {
    if (req.session.userLogged != undefined) {

        res.locals.userLogged = req.session.userLogged;
        console.log("hay un usuario loggeado: "+req.session.userLogged.username);

        req.session.userSignUp = true;
        console.log(res.locals.userLogged);

        if ( req.session.userLogged.rol_id == 1 ) {
            req.session.isAdmin = true;
            res.locals.isAdmin = req.session.isAdmin;
            console.log('\nse logeo un admin\n');
        } else {
            req.session.isAdmin = false;
            res.locals.isAdmin = req.session.isAdmin;
            console.log('\nse logeo un cliente\n');
        }
    }
    
    next();
});

/** Routes */
app.use("/", mainRoutes);
app.use("/products", productsRoutes);

/** Routes de APIs */
app.use('/api/products', productsAPIRoutes);
app.use('/api/users', usersAPIRoutes);

/** Pagina error 404 */
app.use((req, res, next) => {
    res.status(404).render('not-found')
})
