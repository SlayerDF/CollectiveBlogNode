var passport        = require('passport')
var LocalStrategy   = require('passport-local').Strategy
var models          = require('../models')

passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (username, password, done) => {
        try {
            var user = await models.User.findOne({ where: { email: username }})
            if (!user) throw "User not found"
            if (!await user.checkPassword(password)) throw "Wrong password"
            done(null, user)
        }
        catch(err){
            return done(err, null)
        }
    }
))

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(async function(id, done) {
    try {
        var user = await models.User.findById(id)
        if (!user) return done("User not found", null)
        done(null, user)
    }
    catch(err){
        done(err, null)
    }
});

passport.authenticationMiddleware = function (req, res, next) {
      if (req.isAuthenticated()) return next()
      res.redirect('/')
}