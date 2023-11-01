const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');
const productsController = require('../controllers/productsController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const validateProduct = require('../validates/validateProduct.js');
const validateProductEdit = require('../validates/validateProductEdit.js');

/** configuracion de multer */
let multerDiskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/img/productImages');
    },
    filename: (req, file, callback) => {
        let imageName = 'prod-' + Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    }
})
let fileProdUpload = multer({ storage: multerDiskStorage });


/** Pagina con todos los productos */
router.get('/', productsController.allProducts);

/** Buscar un producto */
router.get('/search', productsController.searchProducts);

/** Historial */
router.get('/history', authMiddleware, productsController.productHistory);

/** Creacion de un Producto */
router.get('/create', productsController.createProduct);
router.post('/create', fileProdUpload.single('imageProd'), validateProduct, productsController.saveProduct);

/** Pagina de carrito de compras */
router.get('/cart', authMiddleware, productsController.productCart);

/** Buscar productos filtrado por una categoria */
router.get('/category/:idCategory', productsController.listByCategory);

/** Pagina de detalle de un Producto */
router.get('/:idProducto/details', productsController.productDetails);

/** Edicion de un Producto */
router.get('/:idProducto/edit', productsController.editProduct);
router.put('/:idProducto/edit', fileProdUpload.single('imageProd'), validateProductEdit, productsController.updateProduct);

/** Eliminacion de un Producto */
router.delete('/:idProducto/delete', productsController.deleteProduct); // 7

module.exports = router;