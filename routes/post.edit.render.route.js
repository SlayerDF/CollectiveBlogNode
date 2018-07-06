var models = require('../models')

async function post_edit_render(req, res, next) {
    if (req.isAuthenticated() === false) return res.redirect('/')

    if (!req.params.id) return res.sendStatus(404)

    var post = await models.Post.findById(req.params.id)

    if (!post) return res.sendStatus(404)
 
    res.render('../views/post', { 
        auth: req.isAuthenticated(),
        post: post,
        edit: true
    })
}

module.exports = post_edit_render