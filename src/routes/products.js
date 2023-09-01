const express = require("express");
const router = express.Router();

const productsController = require('../controllers/productsController.js');

router.get('/', productsController.list);
router.get('/details', productsController.details);
router.get('/history', productsController.history);
router.get('/create', productsController.create);

module.exports = router;