const { Schema, model } = require('mongoose');

const UserShema = Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true //que no existan mas correos con el mismo nombre
    },
    password: {
        type: String,
        required: [true, 'El contraseña es obligatoria']
    },
    picture: {
        type: String,
        default: process.env.PICTURE_PROFILE
    },
    role: {
        type: String,
        required: true,
        enum: ['USER_ROLE', 'ADMIN_ROLE', 'SUPER_ADMIN'], // enum, para validar que el parametro q paso sea alguno de esos
        default: 'USER_ROLE'
    },
    status: {
        type: Boolean,
        default: true
    },
    experience: {
        type: Array,
        default: []
    },
    level: {
        type: Array,
        default: []
    },
    dateCreation: {
        type: Date,
        default: Date.parse(new Date())
    },
    dateDelete: {
        type: Date,
        default: Date.parse(new Date())
    },
    phone: {
        type: String,
        default: ''
    },
    google: {
        type: Boolean,
        default: false
    },
    facebook: {
        type: Boolean,
        default: false
    }

});

// enviar el objeto parcial, con los campos que unicamente quiero mostrar
UserShema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}


module.exports = model('User', UserShema);
//Se le Pone Usuario moongose le agrega la 's' y lo crea en la base de datos