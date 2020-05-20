const express = require('express')
const cors = require('cors')
const path = require('path')
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const passport = require('passport');

class App {
    constructor(port, routers = []) {
        this.port = port
        this.app = new express()

        const swaggerPath = path.join(__dirname, './swagger/swagger.yaml');
        const swaggerDocument = yaml.load(swaggerPath);
        this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.app.use(express.static(path.join(__dirname, 'public')))

        this.initializeMiddlewares();
        this.initializeControllers(routers);
    }

    initializeControllers(routers) {
        routers.forEach(router => {
            this.app.use('/api', router)
        });
    }

    initializeMiddlewares() {
        this.app.use(express.json({ extended: false }))
        this.app.use(cors())
        this.app.use(passport.initialize())
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