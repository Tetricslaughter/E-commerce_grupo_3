const { body } = require('express-validator');
const path = require('path');

let validateProduct = [
    body('nameProd')
        .notEmpty().withMessage('el campo no puede estar vacío.').bail()
        .isLength({ min: 3 }).withMessage('el nombre del producto debe tener al menos 3 caracteres.'),
    body('categoryProd')
        .notEmpty().withMessage('debe seleccionar una categoria'),
    body('priceProd')
        .notEmpty().withMessage('debe colocar un precio al producto'),
    body('imageProd')
        .custom((value, { req }) => {
            let file = req.file;
            console.log(file);
            let extensions = [".jpg", ".jpeg", ".png", ".JPG", "JPEG", ".PNG"];
            if (file == undefined) {
                throw new Error('debes subir una imagen')
            }
            let extension = path.extname(file.originalname);
            if (!extensions.includes(extension)) {
                throw new Error("formato de imagen no permitido.")
            }
            req.session.nameProdImage = file.filename;

            return true;
        })
];

module.exports = validateProduct;