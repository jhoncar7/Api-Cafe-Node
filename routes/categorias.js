const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategorias, borrarCategorias } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');
const { validJWT, validatorFields, isAdminRole } = require('../middlewares');

const router = Router();


/* {{url}}/api/categorias */

// Obtener todas las categorias
router.get('/', obtenerCategorias)

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id', 'No es un id valido de mongo').custom(existeCategoria),
    validatorFields
], obtenerCategoria)

// Crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    validJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validatorFields
], crearCategoria)

//Actualizar - rivado - cualquier con token valido
router.put('/:id', [
    validJWT,
    check('id', 'No es un id valido').custom(existeCategoria),
    check('nombre', 'EL nombre es obligatorio').not().isEmpty(),
    validatorFields
], actualizarCategorias)

// Borrar una cateoria - Admin
router.delete('/:id', [
    validJWT,
    isAdminRole,
    check('id', 'No es un id valido').custom(existeCategoria),
    validatorFields
], borrarCategorias)
module.exports = router;