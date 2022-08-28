const { response, request } = require('express')
const { Producto } = require('../models')

const crearProducto = async (req = request, res = response) => {

    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre})

    if (productoDB) {
        return res.status(400).json({
            msg: `El Producto ${productoDB.nombre}, ya existe`
        })
    }

    //generar la data a guardar

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.user._id
    }

    const producto = new Producto(data);

    await producto.save();

    return res.status(201).json(producto)
}

//usando el populate
const obtenerProductos = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).populate('usuario', 'name').
            populate('categoria', 'nombre') // popular es buscar el campo usuario como esta relacionado con la collection user, busca el nombre de ese usuario o el campo que le pida
            .skip(Number(from)).limit(Number(limit))
    ]);

    return res.json({
        total,
        productos
    });

}

const obtenerProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findById(id).populate('usuario', 'name').populate('categoria', 'nombre')
    return res.json(producto)

}

const actualizarProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if (data.nombre)
        data.nombre = data.nombre.toUpperCase();

    data.usuario = req.user._id; // ultimo usuairo que actualizo la categoria

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true })

    return res.json(producto)
}

const borrarProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true })
    return res.json(producto)
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}