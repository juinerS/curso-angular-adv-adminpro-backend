const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getTodo, getDocumentColection } = require('../controllers/busquedas');


const router = Router();

router.get('/:busqueda', validarJWT, getTodo);
router.get('/conlection/:table/:busqueda', validarJWT, getDocumentColection);



module.exports = router;