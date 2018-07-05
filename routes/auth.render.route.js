
function auth_render(req, res, next) {
    if (req.isAuthenticated()) return res.redirect('/')
    res.render('../views/auth', { auth: req.isAuthenticated() })
}

module.exports = auth_render