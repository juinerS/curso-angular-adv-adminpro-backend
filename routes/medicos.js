const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campo');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    createMedicos,
    updateMedicos,
    deleteMedicos
} = require('../controllers/medicos');


const router = Router();

router.get('/', getMedicos);

router.post('/', [
        validarJWT,
        check('name', 'El nombre del médico es necesario').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser válido').isMongoId(),
        validarCampos
    ],
    createMedicos
);

router.put('/:id', [
        validarJWT,
        check('name', 'El nombre del médico es necesario').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser válido').isMongoId(),
        validarCampos
    ],
    updateMedicos
);

router.delete('/:id', validarJWT, deleteMedicos);


module.exports = router;