const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../../database/models');

const controller = {
    
    index: (req, res) => {
        res.render('home')
    },

    register: (req, res) => {
        return res.render('register');
    },

    registerProcess: async (req, res) => {
        try {
            let errors = validationResult(req);
            if ( !errors.isEmpty() ) {
                return res.render("register", {
                    errors: errors.mapped(),
                    old: req.body    
                })
            } else {
                await db.Users.create({
                    username: req.body.username,
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    birthday: req.body.birthDay,
                    avatar: req.session.nameProfileImage,
                    rol_id: 2,
                    active: 1
                })
                return res.redirect('/login');
            }
        } catch(e) {
            console.log(e)
        }
    },

    login: (req, res) => {
        res.render('login')
    },

    loginProcess: async (req, res) => {
        try {
            let errors = validationResult(req);
            // console.log(req.body);
            if ( !errors.isEmpty() ) {
                res.render('login', { 
                    errors: errors.mapped(),
                    old: req.body 
                });

            } else {
                let user = await db.Users.findOne({
                    include: [{association: "rol"}],
                    where: {
                        username: req.body.username
                    }
                });

                if ( user == undefined ) {
                    return res.render('login', { 
                        errors: {
                            username: {
                                "msg": "el usuario o contraseña son incorrectos" 
                            }
                        },
                        old: req.body
                    });

                } else {
                    if ( bcrypt.compareSync(req.body.password, user.password) == false ) {
                        return res.render('login', { 
                            errors: {
                                username: {
                                    "msg": "el usuario o contraseña son incorrectos" 
                                }
                            },
                            old: req.body
                        });
                    } else {
                        req.session.userLogged = user;
                        req.session.userSignUp = true;

                        if ( req.body.rememberMe != undefined ) {
                            res.cookie("rememberMe", req.session.userLogged.username, {maxAge: 120000});
                        }

                        return res.redirect('/');
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
    },

    logout: async (req, res) => {
        try {
            req.session.userLogged = undefined;
            res.locals.userLogged = undefined;
            req.session.userSignUp = false;
            res.locals.userSignUp = false;
            req.session.isAdmin = false;
            res.locals.isAdmin = false;
            res.clearCookie('rememberMe');
            console.log('ha cerrado sesion');
            return res.redirect('/');

        } catch(error) {
            console.log(error);
        }
    },

    profile: async (req, res) => {
        try {
            if ( req.session.userSignUp == false ) {
                return res.render('profile', { 
                    errors:  {
                       msg: "Para ver perfiles de otros usuarios primero debes iniciar sesión."
                    }
                });

            } else {

                let user = await db.Users.findOne({
                    include: [{association: "rol"}],
                    where: { id: req.session.userLogged.id }
                })

                if ( user == undefined ) {
                    return res.render('profile', { 
                        errors:  {
                           msg: "error al cargar el perfil"
                        }
                    });

                } else {

                    if ( user.id != req.params.id) {
                        user = await db.Users.findOne({where:{id:req.params.id}});
                        if (user != undefined) {
                            return res.render('profile', {
                                user: user, 
                                errors:  {
                                msg: "No puedes ver los datos personales de otros usuarios."
                                }
                            });
                        } else {
                            return res.render('profile', { 
                                errors:  {
                                   msg: "Lo sentimos, el usuario "+req.params.id+" al parecer no existe."
                                }
                            });
                        }

                    } else {
                        return res.render('profile', { user: user });
                    }
                }
            }
        } catch(e) {
            console.log(e);
        }        
    },

    profileEdit: async (req, res) => {
        try {

            let user = await db.Users.findOne({
                include: [{association: "rol"}],
                where: { id: req.session.userLogged.id }
            });

            if (req.session.userLogged.id != req.params.id) {
                return res.render('profileEdit', {
                    errors: {
                        msg: "no puedes editar informacion de otro perfil"
                    }
                });

            } else {
                return res.render('profileEdit', {
                    user: user
                });
            }
            
        } catch(e) {
            console.log(e);
        }
    },

    profileEditProcess: async (req, res) => {
        try {
            let errors = validationResult(req);
            if ( !errors.isEmpty() ) {
                return res.render("profileEdit", {
                    errors: errors.mapped(),
                    old: req.body,
                    user: req.session.userLogged 
                })
            } else {
                
                await db.Users.update({
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    birthday: req.body.birthDay,
                },{
                    where: { id: req.session.userLogged.id }
                })
                req.session.userLogged = await db.Users.findOne({where:{id:req.params.id}});
                return res.redirect('/profile/'+req.params.id);
            }
        } catch(e) {
            console.log(e);
        }
    },

    profileDeleteProcess: async (req, res) => {
        try {
            console.log('borrando cuenta '+req.session.userLogged.id);
            await db.Users.destroy({
                where: { id: req.session.userLogged.id }
            });
            req.session.userLogged = undefined;
            res.locals.userLogged = undefined;
            req.session.userSignUp = false;
            res.locals.userSignUp = false;
            req.session.isAdmin = false;
            res.locals.isAdmin = false;
            res.clearCookie('rememberMe');
            res.redirect('/');
        } catch(e) {
            console.log(e);
        }
    }

}

module.exports = controller;