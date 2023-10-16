const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
let validateRegister = require('../validates/validateRegister.js');
let validateLogin = require('../validates/validateLogin.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const mainController = require('../controllers/mainController.js');
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

router.get('/', mainController.index);

router.get('/register', mainController.register);
router.post('/register', uploadFile.single('profileImage'), validateRegister, mainController.registerProcess);

router.get('/login', mainController.login);
router.post('/login', validateLogin, mainController.loginProcess);

/**
 * para ver perfiles se requiere primero iniciar sesion
 * ademas no se podra ver la informacion personal de los demas perfiles salvo el propio
 */
router.get('/profile/:id', authMiddleware, mainController.profile);
router.get('/profile/:id/edit', authMiddleware, mainController.profileEdit);
router.put('/profile/:id/edit', authMiddleware, mainController.profileEditProcess);
router.delete('/profile/:id/delete', authMiddleware, mainController.profileDeleteProcess);


module.exports = router;