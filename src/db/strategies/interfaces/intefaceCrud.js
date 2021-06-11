class NotImplementedException extends Error {
    constructor() {
        super('Nao implementado')
    }
}

class ICrud {
    read() {
        throw new NotImplementedException()
    }

    create() {
        throw new NotImplementedException()
    }

    update() {
        throw new NotImplementedException()
    }

    delete() {
        throw new NotImplementedException()
    }

    connect(){
        throw new NotImplementedException()
    }

    isConnected() {
        throw new NotImplementedException()
    }

    closeConnection(){
        throw new NotImplementedException()
    }

}

module.exports = ICrud