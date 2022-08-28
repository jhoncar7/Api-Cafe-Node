const { response, request } = require('express');
const { ObjectId } = require('mongoose').Types
const { User, Categoria, Producto } = require('../models')

const coleccionesPermitidas = [
    'users',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuarios = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino); // devuelve true o false

    if (esMongoID) {
        const usuario = await User.findById(termino);
        return res.json({
            results: usuario ? [usuario] : []
        })
    }

    const regex = new RegExp(termino, 'i')//que sea insincible a M o m

    const usuarios = await User.find({ $or: [{ name: regex }, { email: regex }], $and: [{ status: true }] }) // retorna un arreglo vacio si no enceuntra nada

    //const usuarios = await User.count({ $or: [{ name: regex }, { email: regex }], $and: [{ status: true }] }) // retorna  cantidad

    return res.json({
        results: usuarios
    })
}

const buscarCategorias = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino); // devuelve true o false

    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: categoria ? [categoria] : []
        })
    }

    const regex = new RegExp(termino, 'i')//que sea insincible a M o m

    const categorias = await Categoria.find({ nombre: regex, estado: true }) // retorna un arreglo vacio si no enceuntra nada

    return res.json({
        results: categorias
    })
}

const buscarProductos = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino); // devuelve true o false

    if (esMongoID) {
        const poducto = await Producto.findById(termino).populate('categoria', 'nombre')
        return res.json({
            results: poducto ? [poducto] : []
        })
    }

    const regex = new RegExp(termino, 'i')//que sea insincible a M o m

    const poductos = await Producto.find({ nombre: regex, estado: true }).populate('categoria', 'nombre') // retorna un arreglo vacio si no enceuntra nada

    return res.json({
        results: poductos
    })
}

const buscar = (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion))
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })

    switch (coleccion) {
        case 'users':
            buscarUsuarios(termino, res)
            break;
        case 'categorias':
            buscarCategorias(termino, res)
            break;
        case 'productos':
            buscarProductos(termino, res)
            break;
        default:
            return res.status(500).json({
                msg: 'Se me olvido impelemntar esta busqueda'
            })
    }

    /*  return res.json({
         coleccion,
         termino
     }) */
}

module.exports = {
    buscar
}