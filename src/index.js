const dotenv = require('dotenv');
const App = require('./app')

dotenv.config();

const port = process.env.PORT || 3000;

const app = new App(port, []);

app.listen().then(() => {
    console.log(`App running in port ${port}`)
}).catch((error) => {
    console.log(error)
})
