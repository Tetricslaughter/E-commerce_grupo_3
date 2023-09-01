const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');

let multerDiskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        let folder = path.join(__dirname, '../public/profileImages');
        callback(null, folder);
    },
    filename: (req, file, callback) => {
        let imageName = Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    }
})

let fileUpload = multer({ storage: multerDiskStorage });

const productsController = require('../controllers/productsController.js');

router.get('/', productsController.list);
router.get('/history', productsController.history);
router.get('/details/:id', productsController.details);
router.get('/:categoria', productsController.listCategoria);
router.get('/create', productsController.create);
router.post('/create', fileUpload.single('imagenProd'), productsController.saveProduct);
// router.get('/:id/edit', productsController.editProduct);
// router.put('/:id', productsController.editProduct);
// router.delete('/:id', productsController.deleteProduct);


module.exports = router;