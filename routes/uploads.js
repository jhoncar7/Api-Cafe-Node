const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validJWT, validarArchivoSubir } = require('../middlewares');
const { validatorFields } = require('../middlewares/validator-fields');

const router = Router();


router.post('/', validarArchivoSubir, cargarArchivo)

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'no es un id de mongo').isMongoId(),
    //check('coleccion', 'no es una coleccion permitida').custom(c => coleccionesPermitidas(c, ['users', 'productos'])),
    check('coleccion', 'no es una coleccion permitida son: ').isIn(['users', 'productos']),
    validatorFields
], actualizarImagenCloudinary)


module.exports = router;