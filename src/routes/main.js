const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');

/** Validaciones de formularios */
let validateRegister = require('../validates/validateRegister.js');
let validateLogin = require('../validates/validateLogin.js');

/** Middlewares */
const authMiddleware = require('../middlewares/authMiddleware.js');
const mainController = require('../controllers/mainController.js');

/** Configuracion de multer */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/profileImages')
    },
    filename: (req, file, cb) => {
        let filename = `${Date.now()}-img${path.extname(file.originalname)}`
        cb(null, filename)
    }
})
const uploadFile = multer({ storage }); 


/** Pagina de inicio */
router.get('/', mainController.index);

/** Pagina de registro de usuario */
router.get('/register', mainController.register);

/** Proceso de registro de usuario */
router.post('/register', uploadFile.single('profileImage'), validateRegister, mainController.registerProcess);

/** Pagina de login */
router.get('/login', mainController.login);

/** Proceso de login */
router.post('/login', validateLogin, mainController.loginProcess);

router.get('/profile/logout', mainController.logout);

/** Pagina de un perfil de usuario */
router.get('/profile/:id', authMiddleware, mainController.profile);

/** PAgina de edicion de cuenta */
router.get('/profile/:id/edit', authMiddleware, mainController.profileEdit);

/** Proceso de edicion de cuenta */
router.put('/profile/:id/edit', authMiddleware, mainController.profileEditProcess);

/** Eliminacion de cuenta de un usuario */
router.delete('/profile/:id/delete', authMiddleware, mainController.profileDeleteProcess);

module.exports = router;