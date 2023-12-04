const express = require('express');
const router = express.Router();
const productsAPIController = require("../../controllers/api/productsAPIController");

/** Obtener todos los productos */
router.get('/', productsAPIController.list);

/** Obtener detalles de un producto */
router.get('/:id', productsAPIController.productDetails);

module.exports = router;