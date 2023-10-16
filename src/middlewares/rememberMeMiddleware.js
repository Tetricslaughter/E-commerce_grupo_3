const db = require('../../database/models');

const rememberMeMiddleware = async (req, res, next) => {
    try {
        if ( req.cookies.rememberMe != undefined ) {
            console.log('hay una cookie: rememberMe')
            console.log(req.cookies.rememberMe);
            let user = await db.Users.findOne({where: {username: req.cookies.rememberMe}});
            if ( user != undefined ) {
                req.session.userLogged = user;
                res.locals.userLogged = req.session.userLogged;
            } else {
                console.log("usuario no encontrado en la BD")
            }
        } else {
            console.log('no hay cookie rememberMe')
        }
    } catch(e) {
        console.log(e);
    }

    next();
}

module.exports = rememberMeMiddleware;