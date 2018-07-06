
function logout(req, res) {
    if (req.isAuthenticated() === false) return res.redirect('/')
    req.logout()
    res.redirect('/')
}

module.exports = logout