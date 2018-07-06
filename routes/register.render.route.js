
function register_render(req, res) {
    if (req.isAuthenticated() === true) return res.redirect('/')
    res.render('../views/register', { auth: req.isAuthenticated() })
}

module.exports = register_render