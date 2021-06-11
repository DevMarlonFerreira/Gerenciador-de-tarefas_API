const { config } = require('dotenv')
const { ok } = require('assert')
const { join } = require('path')

// ------- VARIAVEIS DE AMBIENTE -------
const variavelAmbiente = {
    config: function () {
        const env = process.env.NODE_ENV || "dev"
        ok(env === "production" || env === "dev", 'A env e invalida, ou dev ou prod')

        const configPath = join(__dirname, './../config', `.env.${env}`)
        config({
            path: configPath
        })
    }
}

module.exports = variavelAmbiente