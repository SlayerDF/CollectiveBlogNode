var Joi    = require('joi')
var models = require('../models')

var pageSchema = Joi.object().keys({
    page: Joi.number().integer().min(1),
});

const perPage = 10

async function main_page_render(req, res, next) {

    var validation = pageSchema.validate(req.params, {abortEarly: false})
    var page = typeof req.params.page !== 'undefined' && validation.error === null ? req.params.page : 1

    var pages = Math.ceil(await models.Post.count() / perPage)
    if (pages === 0) page = 1
    else if (page > pages) page = pages

    var posts = await models.Post.findAll({
        limit: perPage,
        offset: (page - 1) * perPage,
        order: [[ 'createdAt', 'DESC' ]]
    })

    await Promise.all(posts.map(async post => {
        post.author = await models.User
            .findOne({ where: { id: post.user }, attributes: [ 'fullName' ]})
            .get('fullName')
    }))

    res.render('../views/main', { 
        auth: req.isAuthenticated(),
        posts: posts,
        pages: {
            previous: page > 1 ? parseInt(page) - 1 : null,
            current: page,
            next: page < pages ? parseInt(page) + 1 : null
        }
    })
}

module.exports = main_page_render