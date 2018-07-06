var Joi         = require('joi')
var passport    = require('passport')
var models      = require('../models')
var helpers     = require('../helpers')

var registerSchema = Joi.object().keys({
    fullName: Joi.string().regex(/^[a-zA-Z ]+$/).min(5).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(5).max(30).required(),
    passwordRepeat: Joi.any().valid(Joi.ref('password')).required()
})

async function register(req, res, next) {
    if (req.isAuthenticated() === true) return res.redirect('/')

    var validation = registerSchema.validate(req.body, {abortEarly: false})
    if (await models.User.count({ where: { email: req.body.email }}) !== 0) {
        if (validation.error == null) validation.error = { details: [] }
        validation.error.details.push({ 
            message: "This email address already in use",
            context: { key: "email" }
        })
    }
    if (validation.error !== null) return res.render('../views/register', {
        auth: req.isAuthenticated(),
        data: {
            fullName: req.body.fullName,
            email: req.body.email
        },
        errors: helpers.arrayToObject(validation.error.details, 'context.key', 'message')
    })

    try {
        await models.User.create({
            fullName: validation.value.fullName,
            email: validation.value.email,
            password: validation.value.password
        })

        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/register'
        })(req, res, next)
    }
    catch(err){
        res.status(400).send("User creation error:" + err)
    }
}

module.exports = register