const { body } = require('express-validator');
const path = require('path');
const db = require('../../database/models');

let validateRegister = [
    body('name')
        .notEmpty().withMessage('el campo nombre no puede estar vacío.').bail()
        .isLength({ min: 2 }).withMessage('el nombre de usuario debe tener al menos 2 caracteres.'),
    body('surname')
        .notEmpty().withMessage('el campo apellido no puede estar vacío.').bail()
        .isLength({ min: 2 }).withMessage('el apellido de usuario debe tener al menos 2 caracteres.'),
    body('username')
        .notEmpty().withMessage('el campo no puede estar vacío.').bail()
        .isLength({ min: 6 }).withMessage('el nombre de usuario debe tener al menos 6 caracteres.'),
    body('password')
        .notEmpty().withMessage('el campo no puede estar vacío.').bail()
        .isLength({ min: 8 }).withMessage('la contraseña debe tener al menos 8 caracteres.'),
    body('confirmPassword')
        .notEmpty().withMessage('el campo no puede estar vacío.').bail()
        .custom((value, { req }) => {
            let pass = req.body.password;
            let cpass = req.body.confirmPassword;
            console.log(pass+" y "+cpass);
            if (pass == cpass) {
                return true;
            } else {
                throw new Error("la contraseña no es igual.");
            }
        }),
    body('email')
        .notEmpty().withMessage('el campo no puede estar vacío.').bail()
        .isEmail().withMessage('email no válido.'),
    body('birthDay').notEmpty().withMessage('debe ingresar una fecha.'),
    body('profileImage')
        .custom((value, { req }) => {
            let file = req.file;
            // console.log(file);
            let extensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".JPG", ".JPEG", ".PNG", ".GIF", ".WEBP"];

            if (file == undefined) {
                throw new Error('debes subir una imagen.')
            }

            let extension = path.extname(file.originalname);
            // console.log("extension: " + extension);
            req.session.nameProfileImage = file.filename;

            if (!extensions.includes(extension)) {
                throw new Error("formato de imagen no permitido.")
            }

            return true;
        })
];

module.exports = validateRegister;