const { Router } = require('express');
const { login, googleSingIn } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campo');



const router = Router();

router.post('/', [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    login
);

router.post('/google', [
        check('token', 'El token de Google es obligatoria').not().isEmpty(),
        validarCampos
    ],
    googleSingIn
);



module.exports = router;