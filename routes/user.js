const { Router } = require('express');
const { check } = require('express-validator');

const { usersGet, userPut, userPost, userDelete, changePassword } = require('../controllers/user');
const { existRoleValid, emailExist, idUserExist } = require('../helpers/db-validators');

const { haveRole, validJWT, validatorFields } = require('../middlewares');
// const { validJWT } = require('../middlewares/valid-jwt');
// const { isAdminRole, haveRole } = require('../middlewares/valid-role');
// const { validatorFields } = require('../middlewares/validator-fields');

const router = Router();

router.get('/', usersGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(idUserExist),
    check('role').custom(existRoleValid),
    validatorFields
], userPut)

router.post('/', [
    check('name', 'El name es obligatorio').not().isEmpty(), //no tiene que estar vacio
    check('password', 'La password debe ser mas de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El email es obligatorio').isEmail(),
    check('email').custom(emailExist),
    //check('role', 'No es un role valido').isIn(['ADMIN_ROLE', 'USER_ROLE']), //roles validos
    check('role').default('USER_ROLE').custom(existRoleValid),
    validatorFields
], userPost)

router.delete('/:id', [
    validJWT,
    //isAdminRole, //verifica que el usuario sea admin
    haveRole('ADMIN_ROLE', 'VENTAS_ROLE'), //verifica que el usuario sea admin o ventas
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(idUserExist),
    validatorFields
], userDelete)

router.post('/change.pass', [
    check('password', 'La password debe ser mas de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El email es obligatorio').isEmail(),
    //check('email').custom(emailExist),
    // check('role', 'No es un role valido').isIn(['ADMIN_ROLE', 'USER_ROLE']), //roles validos
    check('role').default('USER_ROLE').custom(existRoleValid),
    validatorFields
], changePassword)

/* TODO: Documentadio */
module.exports = router;