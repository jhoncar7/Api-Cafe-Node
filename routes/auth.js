const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn, revalidateToken, generateCode } = require('../controllers/auth');
const { validJWT } = require('../middlewares');

const { validatorFields } = require('../middlewares/validator-fields');

const router = Router();


router.post('/login', [
    check('password', 'La password debe ser mas de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El email es obligatorio').isEmail(),
    validatorFields
], login)

router.post('/login.google', [
    check('id_token', 'El id_token de google es necesario').not().isEmpty(),
    validatorFields
], googleSingIn);

router.get('/renew.token', validJWT, revalidateToken);

router.post('/generate.code', [
    check('email', 'El email es obligatorio').isEmail(),
    check('title', 'el title no contiene ni REGISTRO ni PASSWORD').isIn(['REGISTRO', 'PASSWORD']),
    validatorFields
], generateCode);

module.exports = router;