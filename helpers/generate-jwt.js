const jwt = require('jsonwebtoken');

const generarJWT = async (id) => {
    try {
        const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
        return token;
    } catch (error) {
        console.log(error);
        throw new Error('Error al generar el token');
    }
}

module.exports = {
    generarJWT
}