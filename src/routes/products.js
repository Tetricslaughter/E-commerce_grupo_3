const express = require("express");
const router = express.Router();

const productsController = require('../controllers/productsController.js');

router.get('/', productsController.list);
router.get('/history', productsController.history);
router.get('/create', productsController.create);
router.get('/cart', productsController.card);

// router.get('/:id', productsController.details)
// router.post('/', productsController.saveProduct);
// router.get('/:id/edit', productsController.editProduct);
// router.put('/:id', productsController.editProduct);
// router.delete('/:id', productsController.deleteProduct);


module.exports = router;