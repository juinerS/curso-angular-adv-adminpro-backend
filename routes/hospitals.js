const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campo');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals
} = require('../controllers/hospitals');


const router = Router();

router.get('/', getHospitals);

router.post('/', [
        validarJWT,
        check('name', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    createHospitals
);

router.put('/:id', [], updateHospitals);

router.delete('/:id', deleteHospitals);


module.exports = router;