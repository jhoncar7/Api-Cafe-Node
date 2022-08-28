const { Schema, model } = require('mongoose');

const RoleShema = Schema({

    role: {
        type: String,
        required: [true, 'El role es obligatorio']
    }
});

module.exports = model('Role', RoleShema);
//Se le Pone Usuario moongose le agrega la 's' y lo crea en la base de datos