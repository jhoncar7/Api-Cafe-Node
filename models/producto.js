const { Schema, model } = require('mongoose');

const ProductoShema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre de la categoria es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true },
    img: { type: String },

});

// enviar el objeto parcial, con los campos que unicamente quiero mostrar
ProductoShema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    //data.uid = _id;
    return data;
}


module.exports = model('Producto', ProductoShema);
//Se le Pone Usuario moongose le agrega la 's' y lo crea en la base de datos