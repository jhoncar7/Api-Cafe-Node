const { response, request } = require('express')
const { Categoria } = require('../models')

const crearCategoria = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre })

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        })
    }

    //generar la data a guardar

    const data = {
        nombre,
        usuario: req.user._id
    }

    const categoria = new Categoria(data);

    await categoria.save();

    return res.status(201).json(categoria)
}

//usando el populate
const obtenerCategorias = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query).populate('usuario', 'name') // popular es buscar el campo usuario como esta relacionado con la collection user, busca el nombre de ese usuario o el campo que le pida
            .skip(Number(from)).limit(Number(limit))
    ]);

    return res.json({
        total,
        categorias
    });

}

const obtenerCategoria = async (req = request, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'name')
    return res.json(categoria)

}

const actualizarCategorias = async (req = request, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.user._id; // ultimo usuairo que actualizo la categoria

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true })

    return res.json(categoria)
}

const borrarCategorias = async (req = request, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true })
    return res.json(categoria)
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategorias,
    borrarCategorias
}