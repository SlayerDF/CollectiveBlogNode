var Joi         = require('joi')
var passport    = require('passport')
var helpers     = require('../helpers')

var authSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(5).max(30).required()
})

function auth(req, res, next) {
    if (req.isAuthenticated()) return res.redirect('/')

    var validation = authSchema.validate(req.body, {abortEarly: false})
    if (validation.error !== null) return res.render('../views/auth', {
        auth: req.isAuthenticated(),
        data: {
            email: req.body.email
        },
        errors: helpers.arrayToObject(validation.error.details, 'context.key', 'message')
    })

    passport.authenticate('local', function(err, user) {
        if (err) {
            if (err === 'User not found') err = { 'email': 'Wrong email address'}
            else if (err === 'Wrong password') err = { 'password': err }
            return res.render('../views/auth', {
                auth: req.isAuthenticated(),
                data: { email: req.body.email }, 
                errors: err 
            })
        }
        req.logIn(user, function(err) {
            if (err) { return next(err) }
            res.redirect('/')
        })
    })(req, res, next)
}

module.exports = auth