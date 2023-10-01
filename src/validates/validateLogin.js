const { body } = require('express-validator');

let validateLogin = [
    body('username')
        .notEmpty().withMessage('el campo no puede estar vacío.').bail(),
    body('password')
        .notEmpty().withMessage('el campo no puede estar vacío.').bail()
];

module.exports = validateLogin;