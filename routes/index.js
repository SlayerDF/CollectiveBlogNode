var express = require('express')
var router  = express.Router()

var route_register_render   = require('./register.render.route.js')
var route_register          = require('./register.route.js')
var route_auth_render       = require('./auth.render.route.js')
var route_auth              = require('./auth.route.js')
var route_logout            = require('./logout.route.js')
var route_main_render       = require('./main.render.route.js')
var route_main_page_render  = require('./main.page.render.route.js')
var route_post_render       = require('./post.render.route.js')
var route_post_new_render   = require('./post.new.render.route.js')
var route_post_new_create   = require('./post.new.create.route.js')
var route_post_edit_render  = require('./post.edit.render.route.js')
var route_post_edit_update  = require('./post.edit.update.route.js')
var route_author_render     = require('./author.render.route.js')

router.get('/register',         route_register_render)

router.post('/register',        route_register)

router.get('/auth',             route_auth_render)

router.post('/auth',            route_auth)

router.get ('/logout',          route_logout)

router.get('/',                 route_main_render)

router.get('/page/:page',       route_main_page_render)

router.get('/post/:id',         route_post_render)

router.get('/post/new',         route_post_new_render)

router.post('/post/new',        route_post_new_create)

router.get('/post/:id/edit',    route_post_edit_render)

router.post('/post/:id',        route_post_edit_update)

router.get('/author/:id',       route_author_render)

module.exports = router