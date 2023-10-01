const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, "../data/users.json");

const authMiddleware = (req, res, next) => {
    if ( req.session.userLogged == undefined ) {
        req.session.userSignUp = false;
    } else {
        req.session.userSignUp = true;
    }
    next();
}

module.exports = authMiddleware;