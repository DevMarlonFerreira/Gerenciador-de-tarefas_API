const defineModelMongoDb = require('../../model/defineModel/defineModelMongoDb')
const TaskModel = require('../../model/TaskModel')
const { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } = require('date-fns');

const current = new Date();

const taskHandler = {
    post: async function (req, res) {
        const context = await defineModelMongoDb.defineModelContext(TaskModel)
        await context.create(req.body)
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json('Erro na operação')
            })
    },

    patch: async function (req, res) {
        const context = await defineModelMongoDb.defineModelContext(TaskModel)
        await context.update({ "_id": req.params.id }, { $set: req.body }, { new: true })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json('Erro na operação')
            })
    },

    all: async function (req, res) {
        const context = await defineModelMongoDb.defineModelContext(TaskModel)
        await context.read({ macaddress: { '$in': req.params.macaddress } }, null, sort = 'when')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json('Erro na operação')
            })
    },

    show: async function (req, res) {
        const context = await defineModelMongoDb.defineModelContext(TaskModel)
        await context.readOneById(req.params.id)
            .then(response => {
                if (response)
                    return res.status(200).json(response)
                else
                    return res.status(404).json('Tarefa não encontrada')
            })
            .catch(error => {
                return res.status(500).json('Erro na operação')
            })
    },

    delete: async function (req, res) {
        const context = await defineModelMongoDb.defineModelContext(TaskModel)
        await context.delete({ "_id": req.params.id })
            .then(response => {
                if (response)
                    return res.status(200).json(response)
                else
                    return res.status(404).json('Tarefa não encontrada')
            })
            .catch(error => {
                return res.status(500).json('Erro na operação')
            })

    },

    done: async function (req, res) {
        const context = await defineModelMongoDb.defineModelContext(TaskModel)
        await context.findByIdAndUpdate({ "_id": req.params.id }, { 'done': req.params.done }, { new: true })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json('Erro na operação')
            })
    },

    late: async function (req, res) {
        const context = await defineModelMongoDb.defineModelContext(TaskModel)
        await context.read({
            'when': { '$lt': current },
            'macaddress': { '$in': req.params.macaddress }
        },
            null, 'when')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json('Erro na operação')
            })
    },

    today: async function (req, res) {
        const context = await defineModelMongoDb.defineModelContext(TaskModel)
        await context.read({
            'macaddress': { '$in': req.params.macaddress },
            'when': { '$gte': startOfDay(current), '$lte': endOfDay(current) }
        },
            null, 'when')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json('Erro na operação')
            })
    },

    week: async function (req, res) {
        const context = await defineModelMongoDb.defineModelContext(TaskModel)
        await context.read({
            'macaddress': { '$in': req.params.macaddress },
            'when': { '$gte': startOfWeek(current), '$lte': endOfWeek(current) }
        },
            null, 'when')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json('Erro na operação')
            })
    },

    month: async function (req, res) {
        const context = await defineModelMongoDb.defineModelContext(TaskModel)
        await context.read({
            'macaddress': { '$in': req.params.macaddress },
            'when': { '$gte': startOfMonth(current), '$lte': endOfMonth(current) }
        },
            null, 'when')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json('Erro na operação')
            })
    },

    year: async function (req, res) {
        const context = await defineModelMongoDb.defineModelContext(TaskModel)
        await context.read({
            'macaddress': { '$in': req.params.macaddress },
            'when': { '$gte': startOfYear(current), '$lte': endOfYear(current) }
        },
            null, 'when')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json('Erro na operação')
            })
    }

}



module.exports = taskHandler