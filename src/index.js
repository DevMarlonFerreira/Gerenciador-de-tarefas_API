require('./helpers/promiseRejection');
require('./helpers/variavelAmbienteHelper').config();

const app = require('express')();

const cors = require('cors');
const bodyParser = require('body-parser');

const MongoDb = require('./db/strategies/mongodb/mongodb');

const routes = require('./routes/Routes');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

(async function main() {

    connectionMongoDB = MongoDb.connect();
    await MongoDb.isConnected(this.connectionMongoDB);

    app.use('/', routes);

    const server = app.listen(process.env.PORT, function () {
        console.log('Servidor rodando na porta ' + server.address().port);
    })
})()

// app.listen(3000, () => {
//     console.log('Servidor rodando na porta ');
// })