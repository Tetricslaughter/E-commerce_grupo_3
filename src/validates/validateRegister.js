const { body } = require('express-validator');
const path = require('path');

let validateRegister = [
    body('name')
        .notEmpty().withMessage('el campo no puede estar vacío.').bail()
        .isLength({ min: 3 }).withMessage('el nombre de usuario debe tener al menos 6 caracteres.'),
    body('surname')
        .notEmpty().withMessage('el campo no puede estar vacío.').bail()
        .isLength({ min: 3 }).withMessage('el nombre de usuario debe tener al menos 6 caracteres.'),
    body('username')
        .notEmpty().withMessage('el campo no puede estar vacío.').bail()
        .isLength({ min: 6 }).withMessage('el nombre de usuario debe tener al menos 6 caracteres.'),
    body('password')
        .notEmpty().withMessage('el campo no puede estar vacío.').bail()
        .isLength({ min: 6 }).withMessage('la contraseña debe tener al menos 6 caracteres.'),
    body('confirmPassword')
        .notEmpty().withMessage('el campo no puede estar vacío.').bail()
        .custom((value, { req }) => {
            let pass = req.body.password;
            let cpass = req.body.confirmPassword;
            console.log(pass+" y "+cpass);
            if (pass == cpass) {
                return true;
            } else {
                throw new Error("la contraseña no es igual");
            }
        }),
    body('email')
        .notEmpty().withMessage('el campo no puede estar vacío.').bail()
        .isEmail().withMessage('email no válido.'),
    body('birthDate').notEmpty().withMessage('debe ingresar una fecha'),
    body('profileImage')
        .custom((value, { req }) => {
            let file = req.file;
            console.log(file);
            let extensions = [".jpg", ".jpeg", ".png"];

            if (file == undefined) {
                throw new Error('debes subir una imagen')
            }

            let extension = path.extname(file.originalname);
            console.log("extension: " + extension);
            req.session.nameProfileImage = file.filename;

            if (!extensions.includes(extension)) {
                throw new Error("formato de imagen no permitido.")
            }

            return true;
        })
];

module.exports = validateRegister;