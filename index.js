var express = require('express')
var routes  = require('./routes')
var models  = require('./models')

async function initialize() {
    try {
        await models.sequelize.authenticate()
        console.log('Sequelize authenticated')

        var app     = express()
        app.set('view engine', 'ejs')
        app.use('/', routes)
        app.listen(8080, () => console.log('Server started'))
    }
    catch(err) {
        console.log('Sequelize cannot authenticate')
    }
}

initialize()