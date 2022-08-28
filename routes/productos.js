const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeCategoria, existeProducto } = require('../helpers/db-validators');
const { validJWT, validatorFields, isAdminRole } = require('../middlewares');

const router = Router();


/* {{url}}/api/categorias */

// Obtener todas las categorias
router.get('/', obtenerProductos)

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id', 'No es un id valido de mongo').custom(existeProducto),
    validatorFields
], obtenerProducto)

// Crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    validJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id valido').isMongoId(),
    check('categoria', 'No es un id valido').custom(existeCategoria),
    validatorFields
], crearProducto)

//Actualizar - rivado - cualquier con token valido
router.put('/:id', [
    validJWT,
    check('id', 'No es un id valido').custom(existeProducto),
    validatorFields
], actualizarProducto)

// Borrar una cateoria - Admin
router.delete('/:id', [
    validJWT,
    isAdminRole,
    check('id', 'No es un id valido').custom(existeProducto),
    validatorFields
], borrarProducto)
module.exports = router;