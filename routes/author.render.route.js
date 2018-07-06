var models = require('../models')

async function author_render(req, res, next) {
    if (!req.params.id) 
        return res.sendStatus(404)

    var user = await models.User.findOne({ where: { id: req.params.id }, attributes: [ 'id', 'fullName' ]})

    if (!user) 
        return res.sendStatus(404)

    var posts = await models.Post.findAll({ where: { user: user.get('id') }, attributes: [ 'id', 'name' ]})

    res.render('../views/author', { 
        auth: req.isAuthenticated(),
        author: user.get('fullName'),
        posts: posts
    })
}

module.exports = author_render