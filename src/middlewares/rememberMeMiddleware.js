const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, "../data/users.json");

const rememberMeMiddleware = (req, res, next) => {
    
    if ( req.cookies.rememberMe != undefined ) {
        console.log('HAY UNA COOKIE')
        console.log(req.cookies.rememberMe);
        let users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        for ( i=0; i<users.length; i++ ) {
            if ( req.cookies.rememberMe == users[i].username ) {
                req.session.userLogged = users[i];
                break;
            }
        }
        res.locals.userLogged = req.session.userLogged;
    } else {
        console.log('no hay cookie')
    }
    next();
}

module.exports = rememberMeMiddleware;