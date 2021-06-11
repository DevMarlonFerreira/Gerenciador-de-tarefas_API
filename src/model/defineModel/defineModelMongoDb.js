const MongoDb = require('../../db/strategies/mongodb/mongodb')
const Context = require('../../db/strategies/base/contextStrategy')

class DefineModelMongoDbHelper{

    static async defineModelContext(schema) {
        const context = new Context(new MongoDb(connectionMongoDB, schema))
        return context
    }
}

module.exports = DefineModelMongoDbHelper, this.context