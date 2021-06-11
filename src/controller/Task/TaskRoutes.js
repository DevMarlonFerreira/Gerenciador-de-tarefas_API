const router = require('express').Router();
const taskHandler = require('./TaskController.js')

const TaskValidation = require('../../middlewares/TaskValidation')


router.post('/task', TaskValidation, async (req, res) => {
    taskHandler.post(req, res)
})

router.patch('/task/:id', TaskValidation, async (req, res) => {
    taskHandler.patch(req, res)
})

router.patch('/task/:id/:done', async (req, res) => {
    taskHandler.done(req, res)
})

router.delete('/task/:id', async (req, res) => {
    taskHandler.delete(req, res)
})

router.get('/task/:id', (req, res) => {
    taskHandler.show(req, res)
})

router.get('/task/filter/all/:macaddress', (req, res) => {
    taskHandler.all(req, res)
})

router.get('/task/filter/late/:macaddress', (req, res) => {
    taskHandler.late(req, res)
})

router.get('/task/filter/today/:macaddress', (req, res) => {
    taskHandler.today(req, res)
})

router.get('/task/filter/week/:macaddress', (req, res) => {
    taskHandler.week(req, res)
})

router.get('/task/filter/month/:macaddress', (req, res) => {
    taskHandler.month(req, res)
})

router.get('/task/filter/year/:macaddress', (req, res) => {
    taskHandler.year(req, res)
})

module.exports = router