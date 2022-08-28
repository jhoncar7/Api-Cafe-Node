const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const { response, request } = require('express');
const { subirArchivo } = require('../helpers');
const { User, Producto } = require('../models');


const cargarArchivo = async (req = request, res = response) => {

    try {
        const pathCompleto = await subirArchivo(req.files, undefined, 'imgs')

        return res.json({
            path: pathCompleto
        })
    } catch (msg) {
        return res.status(400).json({ msg })
    }

}

const actualizarImagen = async (req = request, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'users':
            modelo = await User.findById(id);
            if (!modelo) return res.status(400).json({ msg: `EL usuario con id ${id} no existe` })
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) return res.status(400).json({ msg: `EL producto con id ${id} no existe` })
            break;
        default:
            return res.status(500).json({ msg: 'Falta por implementar esta opcion' })
    }

    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen)
        }
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion)

    modelo.img = nombre;

    await modelo.save();
    return res.json({ modelo })
}

const actualizarImagenCloudinary = async (req = request, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'users':
            modelo = await User.findById(id);
            if (!modelo) return res.status(400).json({ msg: `EL usuario con id ${id} no existe` })
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) return res.status(400).json({ msg: `EL producto con id ${id} no existe` })
            break;
        default:
            return res.status(500).json({ msg: 'Falta por implementar esta opcion' })
    }

    if (modelo.img) {
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1]
        const [public_id] = nombre.split('.')
        cloudinary.uploader.destroy(public_id);

    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

    modelo.img = secure_url;
    await modelo.save();

    return res.json(modelo)
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    actualizarImagenCloudinary
}