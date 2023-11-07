const { body } = require('express-validator');
const path = require('path');

let validateProduct = [
    body('nameProd')
        .notEmpty().withMessage('el campo no puede estar vacío.').bail()
        .isLength({ min: 5 }).withMessage('el nombre del producto debe tener al menos 5 caracteres.'),
    body('descriptionProd')
        .notEmpty().withMessage('el campo no puede estar vacío.').bail()
        .isLength({ min: 20 }).withMessage('la descripcion del producto debe tener al menos 20 caracteres.'),
    body('brandProd')
        .notEmpty().withMessage('debes ingresar la marca del producto'),
    body('categoryProd')
        .notEmpty().withMessage('debe seleccionar una categoria'),
    body('lifestageProd')
        .notEmpty().withMessage('debe seleccionar una etapa de vida'),
    body('priceProd')
        .notEmpty().withMessage('debe colocar un precio al producto'),
    body('imageProd')
        .custom((value, { req }) => {
            let file = req.file;
            // console.log(file);
            let extensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".JPG", ".JPEG", ".PNG", ".GIF", ".WEBP"];
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