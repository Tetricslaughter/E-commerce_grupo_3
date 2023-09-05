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

// configuracion para imagenes de productos
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
router.get('/', productsController.allProducts); // 1
router.get('/search', productsController.searchProducts)
router.get('/history', productsController.productHistory);
router.get('/create', productsController.createProduct); // 2
router.post('/create', fileProdUpload.single('imagenProd'), productsController.saveProduct); // 4
router.get('/:categoria', productsController.listByCategory);
router.get('/:idProducto/details', productsController.productDetails); // 3
router.get('/:idProducto/edit', productsController.editProduct); // 5
router.put('/:idProducto/edit', productsController.updateProduct); // 6
router.delete('/:idProducto/delete', productsController.deleteProduct); // 7
router.get('/card', productsController.productCard);


module.exports = router;