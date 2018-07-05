
function logout(req, res) {
    if (!req.isAuthenticated()) return res.redirect('/')
    req.logout()
    res.redirect('/')
}

module.exports = logout