const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');
const productsController = require('../controllers/productsController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const validateProduct = require('../validates/validateProduct.js');
const validateProductEdit = require('../validates/validateProductEdit.js');

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

router.get('/', productsController.allProducts);
router.get('/search', productsController.searchProducts);

router.get('/list', productsController.list)
router.get('/history', authMiddleware, productsController.productHistory);

router.get('/create', productsController.createProduct);
router.post('/create', fileProdUpload.single('imageProd'), validateProduct, productsController.saveProduct);

router.get('/cart', authMiddleware, productsController.productCart);

router.get('/:categoria', productsController.listByCategory);

router.get('/:idProducto/details', productsController.productDetails);

router.get('/:idProducto/edit', productsController.editProduct);
router.put('/:idProducto/edit', fileProdUpload.single('imageProd'), validateProductEdit, productsController.updateProduct);

/**
 * Comentamos la ruta con metodo delete para usar get para que funcione el eliminar productos
 */
// router.get('/:idProducto/delete', productsController.deleteProduct); // 7
router.delete('/:idProducto/delete', productsController.deleteProduct); // 7



module.exports = router;