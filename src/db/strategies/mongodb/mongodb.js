const ICrud = require('./../interfaces/intefaceCrud')
const Mongoose = require('mongoose')

const STATUS = {
    0: 'Desconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectado',
    4: 'Credencial Invalida'
}

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true, //this is the code I added that solved it all
    keepAlive: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
    useFindAndModify: false
}

class MongoDB extends ICrud {
    constructor(connection, schema) {
        super()
        this._schema = schema
        this._connection = connection

    }
    static async isConnected(connection) {
        const state = STATUS[connection.readyState]
        if (state === 'Conectado')
            return state
        if (state !== 'Conectando')
            return state

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[connection.readyState]
    }

    static connect() {
        Mongoose.connect(process.env.MONGODB_URL, options,
            function (error) {
                if (!error) return;
                console.log('Falha na conexao', error)
            })

        const connection = Mongoose.connection

        connection.once('open', () => console.group('Database MongoDB conectado!'))
        return connection
    }

    async create(item) {
        return this._schema.create(item)
    }

    read(item, colunas = null, sort = { created: -1 }, skip = 0, limit = 90000) {
        return this._schema
            .find(item)
            .select(colunas)
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .sort(sort)
            .lean()
        // .exec()
    }

    readOne(item, colunas = null) {
        return this._schema
            .findOne(item)
            .select(colunas)
            .lean()
        // .exec()
    }

    readOneById(id, colunas = null) {
        return this._schema
            .findById(id)
            .select(colunas)
            .lean()
    }

    findByIdAndUpdate(id, campos, config = {}) {
        return this._schema.findByIdAndUpdate(id, campos, config)
    }

    update(id, item, config = {}) {
        return this._schema.updateOne(id, item, config)
    }

    delete(id) {
        return this._schema.deleteOne(id)
    }

}

module.exports = MongoDB