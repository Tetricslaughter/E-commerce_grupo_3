const express = require('express');
const router = express.Router();
const usersAPIController = require("../../controllers/api/usersAPIController");

/** Obtener todos los usuarios */
router.get('/', usersAPIController.users);

/** Obtener detalles de un usuario */
router.get('/:id', usersAPIController.userDetails);


module.exports = router;