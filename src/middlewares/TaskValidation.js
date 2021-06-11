const { isPast } = require('date-fns')
const defineModelMongoDb = require('../model/defineModel/defineModelMongoDb')
const TaskModel = require('../model/TaskModel')


const TaskValidation = async (req, res, next) => {

    const { macaddress, type, title, description, when, done } = req.body

    if (!macaddress)
        return res.status(400).json({ error: 'macaddress é obrigatório' })
    else if (!type)
        return res.status(400).json({ error: 'Tipo é obrigatório' })
    else if (!title)
        return res.status(400).json({ error: 'Titulo é obrigatório' })
    else if (!description)
        return res.status(400).json({ error: 'Descrição é obrigatório' })
    else if (!when)
        return res.status(400).json({ error: 'Data e Hora são obrigatórios' })
    else if (isPast(new Date(when)) && !done)
        return res.status(400).json({ error: 'Escolha uma Data e Hora futura' })
    else {
        const context = await defineModelMongoDb.defineModelContext(TaskModel)

        let exists
        if (req.params.id) {
            exists = await context.readOne(
                {
                    '_id': { '$ne': req.params.id },
                    'when': { '$eq': new Date(when) },
                    'macaddress': { '$in': macaddress }
                });
        }
        else {
            exists = await context.readOne({
                'when': { '$eq': new Date(when) },
                'macaddress': { '$in': macaddress }
            });
        }

        if (exists) {
            return res.status(400).json({ error: 'Já existe uma tarefa nesse dia e horário' })
        }
        else
            next();
    }

}

module.exports = TaskValidation