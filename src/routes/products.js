const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');
const productsController = require('../controllers/productsController.js');

// configuracion para imagenes de fotos de usuario
let multerDiskStorage1 = multer.diskStorage({
    destination: (req, file, callback) => {
        let folder = path.join(__dirname, '../../public/img/profileImages');
        callback(null, folder);
    },
    filename: (req, file, callback) => {
        let imageName = 'user-' + Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    }
})
let fileUserUpload = multer({ storage: multerDiskStorage1 });

// configuracion para imagenes de productos de usuario
let multerDiskStorage2 = multer.diskStorage({
    destination: (req, file, callback) => {
        let folder = path.join(__dirname, '../../public/img/productImages');
        callback(null, folder);
    },
    filename: (req, file, callback) => {
        let imageName = 'prod-' + Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    }
})
let fileProdUpload = multer({ storage: multerDiskStorage2 });

// rutas
router.get('/', productsController.allProducts);
router.get('/create', productsController.createProduct);
router.post('/create', fileProdUpload.single('imagenProd'), productsController.saveProduct);
router.get('/:idProducto/details', productsController.productDetails);
router.get('/:idProducto/edit', productsController.editProduct);
router.put('/:idProducto/edit', productsController.updateProduct);
// router.delete('/:id', productsController.deleteProduct);
router.get('/:categoria', productsController.listByCategory);
router.get('/history', productsController.productHistory);


module.exports = router;