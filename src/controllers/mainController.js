const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const usersFilePath = path.join(__dirname, "../data/users.json");
var users;

const controller = {
    
    home: (req, res) => {
        res.render('home')
    },

    register: (req, res) => {
        return res.render('register');
    },

    registerProcess: (req, res) => {
        let usersArchive = fs.readFileSync(usersFilePath, "utf-8");
        let errors = validationResult(req);
        console.log(errors.mapped());
        console.log(req.body)
        // console.log(req.body)
        // console.log(req.file);

        if ( usersArchive == "" )
            users = [];
        else
            users = JSON.parse(usersArchive);

        if ( !errors.isEmpty() ) {
            return res.render("register", {
                errors: errors.mapped(),
                old: req.body    
            })
        } else {
            let id = 0;
            for (i=0; i<users.length; i++){
                if (users[i].id > id) {
                    id = users[i].id;
                }
            }
            id++;
            let user = {
                "id": id,
                "name": req.body.name,
                "surname": req.body.surname,
                "username": req.body.username,
                "email": req.body.email,
                "birthDate": req.body.birthDate,
                "avatar": req.session.nameProfileImage,
                "password": bcrypt.hashSync(req.body.password, 10)
            };

            users.push(user);
            let usersJSON = JSON.stringify(users);
            fs.writeFileSync(usersFilePath, usersJSON);

            return res.redirect('/login');
        }
    },

    login: (req, res) => {
        res.render('login')
    },

    loginProcess: (req, res) => {
        let usersArchive = fs.readFileSync(usersFilePath, "utf-8");
        let errors = validationResult(req);

        if ( usersArchive == "" )
            users = [];
        else
            users = JSON.parse(usersArchive);

        if ( !errors.isEmpty() ) {
            res.render('login', { 
                errors: errors.mapped(),
                old: req.body 
            });
        } else {

            let userLogged;
            for (i=0; i<users.length; i++) {
                if ( users[i].username == req.body.username && bcrypt.compareSync(req.body.password, users[i].password) ) {
                    userLogged = users[i];
                    break;
                }
            }
            
            if ( userLogged == undefined ) {
                return res.render('login', { 
                    errors: {                        
                        username: {
                            "msg": "el usuario o contraseña son incorrectos"
                        }
                    }
                });
            }

            // guardamos en session
            req.session.userLogged = userLogged;

            if ( req.body.rememberMe != undefined ) {
                res.cookie(
                    "rememberMe",
                    userLogged.username,
                    { maxAge: 120000 }
                    )
            }
            
            return res.redirect('/');
        }
    },

    profile: (req, res) => {
        let usersArchive = fs.readFileSync(usersFilePath, "utf-8");
        if ( usersArchive == "" )
            users = [];
        else
            users = JSON.parse(usersArchive);

        if ( req.session.userSignUp == false ) {
            return res.send('para ver perfiles de usuarios inicia sesion');
        } else {
            let user;
            for (i=0; i<users.length; i++) {
                if (req.params.id == users[i].id) {
                    user = users[i];
                }
            }
            if (user != undefined) {
                console.log(user);
                return res.render('profile', { user: user });
            } else {
                return res.send("el usuario "+req.params.id+" no existe")
            }
        }         
    }
}

module.exports = controller;