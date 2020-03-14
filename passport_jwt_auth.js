// auth.js
var passport = require("passport");
var passportJWT = require("passport-jwt");
var empresas = require("./src/models/Empresa");
var cfg = require("./passport_jwt_config");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {
    var strategy = new Strategy(params, function(payload, done) {
        var empresa = empresas[payload.id] || null;
        if (empresa) {
            return done(null, {id: empresa._id});
        } else {
            return done(new Error("Empresa nao encontrada"), null);
        }
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};