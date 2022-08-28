const { response, request } = require('express');
const bcryptjs = require('bcryptjs')
const User = require('../models/user');
const { generarJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');
const { sendCode } = require('../helpers/send-code');

const login = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) // verificar email
            return res.status(404).json({ msg: 'Usuario / Password no son correctos' });

        if (!user.status) //verificar status
            return res.status(404).json({ msg: 'Usuario / Password no son correctos' });

        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) //verificar password
            return res.status(404).json({ msg: 'Usuario / Password no son correctos' });

        const token = await generarJWT(user._id);

        return res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
};

const googleSingIn = async (req = request, res = response) => {
    const { id_token } = req.body;

    try {
        const { name, picture, email } = await googleVerify(id_token);

        let user = await User.findOne({ email });

        if (!user) {
            const data = {
                name, email, password: '.$', picture, google: true,
            }
            user = new User(data);
            await user.save();
        }
        if (!user.status) {
            return res.status(401).json({ msg: 'Hable con el administrador, usuario bloqueado' });
        }

        const token = await generarJWT(user._id);

        return res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        });
    }

}

const revalidateToken = async (req = request, res = response) => {

    try {
        const user = req.user;

        //generar nuevo token y retornarlo
        const token = await generarJWT(user._id);

        return res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const generateCode = async (req = request, res = response) => {
    try {

        const { email, title } = req.body;

        if (title === 'REGISTRO') {
            const user = await User.findOne({ email });
            if (user) {
                console.log('El email ya existe')
                return res.status(400).json({ msg: 'El email ya existe' });
            }
        }
        if (title === 'PASSWORD') {
            const user = await User.findOne({ email });
            if (!user) {
                console.log('El email no existe')
                return res.status(400).json({ msg: 'El email no existe' });
            }
        }

        const codeVerification = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

        sendCode(email, codeVerification, title);
        console.log(codeVerification);
        return res.json({
            codeVerification
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    login,
    googleSingIn,
    revalidateToken,
    generateCode
};