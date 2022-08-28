

const dbValidators = require('./db-validators');
const emailHtml = require('./email-html');
const generateJwt = require('./generate-jwt');
const googleVerify = require('./google-verify');
const sendCode = require('./send-code');
const subirArchivo = require('./subir-archivo');

module.exports = {
    ...dbValidators,
    ...emailHtml,
    ...generateJwt,
    ...googleVerify,
    ...sendCode,
    ...subirArchivo,
}