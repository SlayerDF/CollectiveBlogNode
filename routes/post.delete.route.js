var models = require('../models')

async function post_delete(req, res, next) {
    if (req.isAuthenticated() === false) return res.redirect('/')

    if (!req.params.id) 
        return res.sendStatus(404)

    var post = await models.Post.findById(req.params.id)

    if (!post) 
        return res.sendStatus(404)

    if (req.user.get('id') != post.user && req.user.get('admin') !== true)
        return res.sendStatus(403)

    try {
        await post.destroy()

        res.redirect('/')
    }
    catch(err){
        res.status(400).send("Post delete error:" + err)
    }
}

module.exports = post_delete