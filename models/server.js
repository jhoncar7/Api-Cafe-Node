const express = require('express')
var cors = require('cors');
var fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            user: '/api/user',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            uploads: '/api/uploads',
        }

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middleware();
        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middleware() {
        //CORS
        this.app.use(cors());
        // lectura y parseo del body
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'))
        //Cargad de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.user, require('../routes/user'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ', this.port)
        })
    }
}

module.exports = Server;