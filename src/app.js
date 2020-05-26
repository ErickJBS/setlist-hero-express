const express = require('express')
const cors = require('cors')
const path = require('path')
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const passport = require('passport');
const session = require('express-session')
const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');

class App {
    constructor(port, routers = []) {
        this.port = port
        this.app = new express()

        const swaggerPath = path.join(__dirname, './swagger/swagger.yaml');
        const swaggerDocument = yaml.load(swaggerPath);
        this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.app.use(express.static(path.join(__dirname, '..', 'public')))

        this.initializeMiddlewares();
        this.initializeControllers(routers);

        this.app.get('*', (request, response) => {
            response.sendFile('index.html', { root: 'public' });
        });
    }

    initializeControllers(routers) {
        routers.forEach(router => {
            this.app.use('/api', router)
        });
    }

    initializeMiddlewares() {
        this.app.use(fileUpload({
            createParentPath: true
        }));
        this.app.use(express.json({ extended: false }))
        this.app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
        this.app.use(passport.initialize())
        this.app.set('trust proxy', 1) 
        this.app.use(session({
            resave: false,
            secret: process.env.SESSION_SECRET,
            saveUninitialized: true,
            cookie: { secure: false },
            genid: (request) => {
                return uuidv4();
            },
        }))
    }

    async listen() {
        return new Promise((resolve, reject) => {
            this.app.listen(this.port, () => {
                resolve();
            }).on('error', (error) => {
                reject(error);
            })
        })
    }
}

module.exports = App;