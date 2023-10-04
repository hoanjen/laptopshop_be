const passport = require('passport')
const bcrypt = require('bcryptjs')
const localStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const User = require('../models/User')
require('dotenv').config();

passport.use(new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('authorization'),
        secretOrKey: process.env.secret
    },
    async (payload, done) => {
        try {
            const user = await User.findById(payload.id);
            if (!user) return done(null, false);
            done(null, user);
        }
        catch (error) {
            done(error, false);
        }
}))


passport.use(new localStrategy({
    usernameField: 'email'  
}, async (email,password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return done(null, false);
        }
        const check = await bcrypt.compare(password, user.password)
        if (!check) return done(null, false);
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }

}))
