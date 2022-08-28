const Role = require('../models/role');
const { User, Categoria, Producto } = require('../models')


const existRoleValid = async (role = '') => {
    role = role.toUpperCase();
    const existRol = await Role.findOne({ role });
    if (!existRol) {
        throw new Error(`El role ${role} no existe`);
    }
}

const emailExist = async (email = '') => {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error(`El email ${email} ya existe`);
    }
}

const idUserExist = async (id) => {
    const existIdUser = await User.findById(id);
    if (!existIdUser) {
        throw new Error(`El id ${id} no existe`);
    }
}

const existeCategoria = async (id) => {
    const existIdCategoria = await Categoria.findById(id);
    if (!existIdCategoria) {
        throw new Error(`El id ${id} no existe`);
    }
}

const existeProducto = async (id) => {
    const existIdProducto = await Producto.findById(id);
    if (!existIdProducto) {
        throw new Error(`El id ${id} no existe`);
    }
}


module.exports = {
    existRoleValid,
    emailExist,
    idUserExist,
    existeCategoria,
    existeProducto
};