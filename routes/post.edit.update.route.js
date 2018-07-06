var Joi          = require('joi')
var sanitizeHtml = require('sanitize-html');
var models       = require('../models')
var helpers      = require('../helpers')

var postSchema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(1000).required(),
    text: Joi.string()
})

async function post_edit_update(req, res, next) {
    if (req.isAuthenticated() === false) return res.redirect('/')

    if (!req.params.id) 
        return res.sendStatus(404)

    var post = await models.Post.findById(req.params.id)

    if (!post) 
        return res.sendStatus(404)

    if (req.user.get('id') != post.user && req.user.get('admin') !== true)
        return res.sendStatus(403)

    var validation = postSchema.validate(req.body, {abortEarly: false})
    if (validation.error !== null) return res.render('../views/post.modify.ejs', {
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
        await post.update({
            name: validation.value.name,
            description: validation.value.description,
            text: text
        })

        res.redirect('/post/' + post.get('id'))
    }
    catch(err){
        res.status(400).send("Post update error:" + err)
    }
}

module.exports = post_edit_update