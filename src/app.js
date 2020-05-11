const express = require('express')
const cors = require('cors')
const path = require('path')

class App {
    constructor(port, routers = []) {
        this.port = port
        this.app = new express()

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