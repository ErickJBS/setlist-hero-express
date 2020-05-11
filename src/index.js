const dotenv = require('dotenv');
const App = require('./app')
const Database = require('./database/db-connnection');

dotenv.config();

const port = process.env.PORT || 5000;
const connectionUri = process.env.CONNECTION_URI;

if (!connectionUri) {
    throw new Error("Couldn't find CONNECTION_URI variable in this environment");
}

const app = new App(port, []);

const database = new Database(connectionUri);

database.connect().then(() => {
    console.log('Database connected successfully')
    return app.listen();
}).then(() => {
    console.log(`App running in port ${port}`)
}).catch((error) => {
    console.log(error)
})
