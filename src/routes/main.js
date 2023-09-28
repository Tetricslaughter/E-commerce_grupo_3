const express = require("express");
const router = express.Router();
const { check } = require('express-validator');
let validateRegister = require('../errorControllers/errores.js');

const mainController = require('../controllers/mainController.js');

router.get('/', mainController.home);
router.get('/register', mainController.register);
router.post('/register', validateRegister, mainController.registerProcess);
router.get('/login', mainController.login);
router.post('/login', mainController.loginProcess);


module.exports = router;