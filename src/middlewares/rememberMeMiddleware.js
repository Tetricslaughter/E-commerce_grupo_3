const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, "../data/users.json");

const rememberMeMiddleware = (req, res, next) => {
    next();

    if ( req.cookies.rememberMe != undefined && req.session.userLogged == undefined ) {
        let users = JSON.parse(fs.writeFileSync(filePath, "utf-8"));
        for ( i=0; i<users.length; i++ ) {
            if ( req.cookies.userLogged == users[i].username ) {
                req.session.userLogged = users[i];
                break;
            }
        }
    }
}

module.exports = rememberMeMiddleware;