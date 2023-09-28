const { check } = require('express-validator');

let validateRegister = [
    check('nombre')
        .notEmpty().withMessage('el campo no puede estar vacío.')
        .isLength({min: 6}).withMessage('el nombre de usuario debe tener al menos 6 caracteres.'),
    check('apellido')
        .notEmpty().withMessage('el campo no puede estar vacío.')
        .isLength({min: 6}).withMessage('el nombre de usuario debe tener al menos 6 caracteres.'),
    check('username')
        .notEmpty().withMessage('el campo no puede estar vacío.')
        .isLength({min: 6}).withMessage('el nombre de usuario debe tener al menos 6 caracteres.'),
    check('password')
        .notEmpty().withMessage('el campo no puede estar vacío.')
        .isLength({min: 6}).withMessage('la contraseña debe tener al menos 6 caracteres.'),
    check('confirmpassword')
        .notEmpty().withMessage('el campo no puede estar vacío.')
        .isLength({min: 6}).withMessage('la contraseña debe tener al menos 6 caracteres.'),
    check('email')
        .notEmpty().withMessage('el campo no puede estar vacío.')
        .isLength({min: 6}).withMessage('la contraseña debe tener al menos 6 caracteres.')
        .isEmail().withMessage('email no válido.'),
    check('fechadenac').notEmpty().withMessage('debe ingresar una fecha'),

];

module.exports = validateRegister;