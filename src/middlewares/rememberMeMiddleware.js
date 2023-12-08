const db = require('../../database/models');

const rememberMeMiddleware = async (req, res, next) => {
    try {

        if (res.locals.userLogged === undefined) {
            if (req.cookies.rememberMe != undefined) {

                // console.log('hay una cookie: rememberMe')
                // console.log(req.cookies.rememberMe);

                let user = await db.Users.findOne({
                    include: [{ association: "rol" }],
                    where: {
                        username: req.cookies.rememberMe
                    }
                });

                if (user != undefined) {
                    req.session.userLogged = user.get({ plain: true });
                    res.locals.userLogged = user.get({ plain: true });

                } else {
                    console.log("usuario no encontrado en la BD")
                }

            } else {
                console.log('no hay cookie rememberMe')
            }
        }
    } catch (e) {
        console.log(e);
    }

    next();
}

module.exports = rememberMeMiddleware;