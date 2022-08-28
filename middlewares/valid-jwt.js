const jwt = require('jsonwebtoken');
const { response, request } = require('express')

const User = require('../models/user')

const validJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token-auth');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                msg: 'El usuario no existe'
            });
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'Token no valido - status'
            });
        }
        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token invalido'
        });
    }
}


module.exports = {
    validJWT
}
