var Joi          = require('joi')
var sanitizeHtml = require('sanitize-html');
var models       = require('../models')
var helpers      = require('../helpers')


var postSchema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(1000).required(),
    text: Joi.string()
})

async function post_new_create(req, res, next) {
    if (req.isAuthenticated() === false) return res.redirect('/')

    var validation = postSchema.validate(req.body, {abortEarly: false})
    if (validation.error !== null) return res.render('../views/modify.ejs', {
        auth: req.isAuthenticated(),
        post: {
            name: req.body.name,
            description: req.body.description,
            text: req.body.text
        },
        errors: helpers.arrayToObject(validation.error.details, 'context.key', 'message')
    })

    var text = ""
    if (req.body.text) {
        text = sanitizeHtml(req.body.text, {
            allowedTags: [ 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'b', 'i', 'blockquote', 'pre', 'a' ],
            allowedAttributes: {
              'a': [ 'href' ],
              'img': [ 'alt', 'src' ]
            }
        })
    }

    try {
        var post = await models.Post.create({
            name: validation.value.name,
            description: validation.value.description,
            text: text,
            user: req.user.get('id')
        })

        res.redirect('/post/' + post.get('id'))
    }
    catch(err){
        res.status(400).send("Post create error:" + err)
    }
}

module.exports = post_new_create