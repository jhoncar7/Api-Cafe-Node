const { response, request } = require('express')

const isAdminRole = (req = request, res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: 'Se quiere verificar el token primero'
        });
    }
    const { role, name } = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `El usuario ${name} no tiene el rol de administrador`
        });
    }

    next();

}

const haveRole = (...roles) => {
    return (req = request, res = response, next) => {

        if (!req.user) {
            return res.status(500).json({
                msg: 'Se quiere verificar el token primero'
            });
        }
        const { role, name } = req.user;

        if (!roles.includes(role)) {
            return res.status(401).json({
                msg: `El usuario ${name} no tiene ningun rol valido [${roles}]`
            });
        }

        next();
    }
}

module.exports = {
    isAdminRole,
    haveRole
}