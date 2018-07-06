var models = require('../models')

async function post_render(req, res) {
    if (!req.params.id) return res.sendStatus(404)

    var post = await models.Post.findById(req.params.id)

    if (!post) return res.sendStatus(404)

    post.author = await models.User
            .findOne({ where: { id: post.user }, attributes: [ 'fullName' ]})
            .get('fullName')

    res.render('../views/post', { 
        auth: req.isAuthenticated(),
        post: post,
        access: req.user && (req.user.get('id') == post.user || req.user.get('admin') === true)
     })
}

module.exports = post_render