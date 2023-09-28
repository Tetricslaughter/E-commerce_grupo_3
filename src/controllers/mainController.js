const { validationResult } = require('express-validator');

const controller = {
    
    home: (req, res) => {
        res.render('home')
    },

    register: (req, res) => {
        let errors = validationResult(req);
        res.render('register', { errors: errors.mapped(), old: req.body });

    },

    registerProcess: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            res.render('register');
        } else {
            console.log('erorr ajajs2');
            console.log(errors);
            res.render('register', { errors: errors.mapped(), old: req.body });
        }
    },

    login: (req, res) => {
        res.render('login')
    },
    loginProcess: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

        } else {
            res.render('login', { errors: errors.mapped(), old: req.body });
        }

    }
}


module.exports = controller;