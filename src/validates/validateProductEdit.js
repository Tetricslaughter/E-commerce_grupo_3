const { body } = require('express-validator');
const path = require('path');
const fs = require('fs');
const db = require('../../database/models');

let validateProductEdit = [
    body('nameProd')
        .notEmpty().withMessage('debe asignar un nombre al producto').bail()
        .isLength({ min: 3 }).withMessage('el nombre del producto debe tener al menos 3 caracteres.'),
    body('categoryProd')
        .notEmpty().withMessage('debe seleccionar una categoria'),
    body('priceProd')
        .notEmpty().withMessage('debe colocar un precio al producto'),
    body('imageProd')
        .custom((value, { req }) => {
            let file = req.file;
            console.log(file);

            if ( file == undefined ) {
                console.log("EL PRODUCTO CONSERVARA SU MISMA IMAGEN");
                return true;

            } else {
                let extensions = [".jpg", ".jpeg", ".png", ".JPG", "JPEG", ".PNG", "webp"];
                let extension = path.extname(file.originalname);
                if (!extensions.includes(extension)) {
                    throw new Error("formato de imagen no permitido.")
                }

                let fileNameToDelete = req.session.nameProdImage;

                db.Products.findOne({
                    where: { image: fileNameToDelete }
                })
                    .then((prod) => {
                        if (prod.image == fileNameToDelete) {
                            fs.unlink(`./public/img/productImages/${fileNameToDelete}`, (error) => {
                                if (error) {
                                    console.log('\nFS: no se pudo borrar la anterior imagen del producto\n');
                                } else {
                                    console.log('\nFS: se borro la anterior imagen del producto\n')
                                }
                            });
                        } else {
                            console.log('\nno coinciden el nombre de ambas imagenes\n');
                        }
                    })
                    .catch(e => console.log(e));
    
                req.session.nameProdImage = file.filename;
    
                return true;
            }

        })
];

module.exports = validateProductEdit;