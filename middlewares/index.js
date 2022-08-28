// const { validJWT } = require('../middlewares/valid-jwt');
// const { isAdminRole, haveRole } = require('../middlewares/valid-role');
// const { validatorFields } = require('../middlewares/validator-fields');

const validJWT = require('../middlewares/valid-jwt');
const validRole = require('../middlewares/valid-role');
const validatorFields = require('../middlewares/validator-fields');
const validarArchivo = require('../middlewares/validar-archivo');


module.exports = {
    ...validJWT,
    ...validRole,
    ...validatorFields,
    ...validarArchivo
}