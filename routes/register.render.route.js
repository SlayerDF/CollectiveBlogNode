
function register_render(req, res, next) {
    if (req.isAuthenticated()) return res.redirect('/')
    res.render('../views/register')
}

module.exports = register_render