
function post_new_render(req, res) {
    if (req.isAuthenticated() === false) return res.redirect('/')
    res.render('../views/post', { auth: req.isAuthenticated() })
}

module.exports = post_new_render