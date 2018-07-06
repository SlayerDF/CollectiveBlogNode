var express     = require('express')
var bodyParser  = require('body-parser')
var session     = require('express-session')
var passport    = require('passport')
var routes      = require('./routes')
var models      = require('./models')

var app         = express()

require('./authentication')

async function initialize() {
    try {
        await models.sequelize.authenticate()
        console.log('Sequelize authenticated')
        
        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(session({ 
            secret: 'keyboard cat',
            resave: true,
            saveUninitialized: true
        }));
        app.use(passport.initialize())
        app.use(passport.session())
        app.use('/', routes)
        
        app.listen(process.env.PORT || 80, () => console.log('Server started'))
    }
    catch(err) {
        console.log(err)
    }
}

initialize()