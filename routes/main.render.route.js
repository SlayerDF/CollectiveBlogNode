
function main_render(req, res, next) {
    res.render('../views/main', { auth: req.isAuthenticated() })
}

module.exports = main_render