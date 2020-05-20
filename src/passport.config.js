const passport = require('passport')

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: process.env['GOOGLE_CALLBACK_URL']

}, (acccessToken, refreshToken, profile, done) => {
    return done(null, profile)
}))

passport.use(new FacebookStrategy({
    clientID: process.env['FACEBOOK_CLIENT_ID'],
    clientSecret: process.env['FACEBOOK_CLIENT_SECRET'],
    callbackURL: process.env['FACEBOOK_CALLBACK_URL'],
    profileFields: ['id', 'displayName', 'email', 'picture']

}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile)
}))
  
passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((obj, done) => {
    done(null, obj)
})