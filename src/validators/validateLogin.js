const { body } = require('express-validator');

let validateLogin = [
    body('username')
        .notEmpty().withMessage('El campo no puede estar vacío.').bail(),
    body('password')
        .notEmpty().withMessage('El campo no puede estar vacío.').bail()
];

module.exports = validateLogin;