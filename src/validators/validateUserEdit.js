const { body } = require('express-validator');
const path = require('path');
const db = require('../../database/models');

let validateRegister = [
    body('name')
        .notEmpty().withMessage('El campo nombre no puede estar vacío.').bail()
        .isLength({ min: 2 }).withMessage('El nombre de usuario debe tener al menos 2 caracteres.'),
    body('surname')
        .notEmpty().withMessage('El campo apellido no puede estar vacío.').bail()
        .isLength({ min: 2 }).withMessage('El apellido de usuario debe tener al menos 2 caracteres.'),
    body('email')
        .notEmpty().withMessage('El campo no puede estar vacío.').bail()
        .isEmail().withMessage('El email no es válido.')
        .custom( async (value, { req }) => {
            let email = req.body.email;
            let emailOfDB = await db.Users.findOne({
                where: {
                    email: { [db.Sequelize.Op.like]: `%${email}%` }
                }
            });
            let thisUser = await db.Users.findByPk(req.params.id);
            if (thisUser.email == email) {
                return true;
            } else {
                if (emailOfDB != undefined) {
                    throw new Error("El email ya está en uso.");
                }
            }

            return true;
        }),
    body('birthDay').notEmpty().withMessage('Debe ingresar una fecha.')

];

module.exports = validateRegister;