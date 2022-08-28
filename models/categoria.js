const { Schema, model } = require('mongoose');

const CategoriaShema = Schema({

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
    }

});

// enviar el objeto parcial, con los campos que unicamente quiero mostrar
CategoriaShema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    //data.uid = _id;
    return data;
}


module.exports = model('Categoria', CategoriaShema);
//Se le Pone Usuario moongose le agrega la 's' y lo crea en la base de datos