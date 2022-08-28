const { response, request } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user');
const { generarJWT } = require('../helpers/generate-jwt');

const usersGet = async (req = request, res = response) => {

    try {
        const { limit = 5, from = 0 } = req.query;
        const query = { status: true };

        const usersPromise = User.find(query).skip(Number(from)).limit(Number(limit));
        const totalPromise = User.countDocuments(query);

        const [total, users] = await Promise.all([totalPromise, usersPromise]);

        return res.json({
            total,
            users
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const userPost = async (req = request, res = response) => {

    try {

        const { name, email, password, role } = req.body;
        const rol = role.toUpperCase();

        const user = new User({ name, email, password, role: rol });

        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(12); // por defaul es 10
        user.password = bcryptjs.hashSync(password, salt);

        //Guardar en BD
        await user.save();

        //Generar JWT
        const token = await generarJWT(user._id);

        return res.json({ user, token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

const userPut = async (req = request, res = response) => {

    try {
        const { id } = req.params;
        const { _id, password, google, email, ...others } = req.body;

        if (password) {
            const salt = bcryptjs.genSaltSync(12); // por defaul es 10
            others.password = bcryptjs.hashSync(password, salt);
        }

        const user = await User.findByIdAndUpdate(id, others, { new: true });
        console.log(user);

        return res.json(user)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const userDelete = async (req = request, res = response) => {

    try {
        const { id } = req.params;

        //Borrar fisicamente de la base de datos
        //const user = await User.findByIdAndDelete(id);

        const user = await User.findByIdAndUpdate(id, { status: false }, { new: true });
        const userAuthenticated = req.user;

        return res.json({
            user,
            userAuthenticated
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const changePassword = async (req = request, res = response) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                msg: 'El usuario no existe'
            });
        }

        const salt = bcryptjs.genSaltSync(12); // por defaul es 10
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();

        return res.json({
            status: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    usersGet,
    userPut,
    userPost,
    userDelete,
    changePassword
}