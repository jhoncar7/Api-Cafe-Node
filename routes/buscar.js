const { Router } = require('express');
const { buscar } = require('../controllers/buscar');
const { validatorFields, validJWT } = require('../middlewares');

const router = Router();

router.get('/:coleccion/:termino', [
    validJWT,
    //check('coleccion', 'No es un id valido de mongo').isMongoId(),
    //check('termino', 'No es un id valido de mongo').custom(existeCategoria),
    validatorFields
], buscar)


module.exports = router;