var express = require('express')
var routes = require('./routes')

var app = express()

app.set('view engine', 'ejs')
app.use('/', routes)
app.listen(8080)