const iCrud = require('../interfaces/intefaceCrud')

class contextStrategy extends iCrud {
    constructor(context) {
        super()
        this._database = context
    }

    read(item, colunas, sort, skip, limit) {
        return this._database.read(item, colunas, sort, skip, limit)
    }

    readOne(item, colunas) {
        return this._database.readOne(item, colunas)
    }

    readOneById(id, colunas) {
        return this._database.readOneById(id, colunas)
    }

    findByIdAndUpdate(id, colunas, config) {
        return this._database.findByIdAndUpdate(id, colunas, config)
    }

    create(item) {
        return this._database.create(item)
    }

    update(id, item, config) {
        return this._database.update(id, item, config)
    }

    delete(id) {
        return this._database.delete(id)
    }

    static connect() {
        return this._database.connect()
    }

    isConnected() {
        return this._database.isConnected()
    }

    closeConnection() {
        return this._database.closeConnection()
    }

}

module.exports = contextStrategy