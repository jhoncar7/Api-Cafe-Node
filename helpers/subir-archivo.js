const path = require('path')
const { v4: uuidv4 } = require('uuid')

const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const nombre = archivo.name.split('.')
        const extension = nombre[nombre.length - 1]

        if (!extensionesValidas.includes(extension.toLowerCase()))
            return reject(`la extension ${extension} no es permitida, [${extensionesValidas}]`)

        const nombreTemporal = uuidv4() + '.' + extension;

        uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemporal)

        archivo.mv(uploadPath, (err) => {
            if (err) reject(err)

            resolve(nombreTemporal)
        });
    });


}


module.exports = {
    subirArchivo,
}