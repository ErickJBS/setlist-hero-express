const passport = require('passport')
const AuthService = require('../services/auth.service')

const emailAuth = async (request, response) => {
    const { identifier, password } = request.body;
    try {
        const token = await AuthService.login(identifier, password);
        response.cookie('jwt', JSON.stringify(token))
        return response.json(token)
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}


const userRegister = async (request, response) => {
    const { email, displayName, password, username } = request.body;
    try {
        const user = await AuthService.register({ email, displayName, password, username })
        return response.json(user);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

const googleAuth = (request, response, next) => {
    request.session.redirect = request.query.redirectUri;
    passport.authenticate('google', { scope: ['profile','email'] })(request, response, next);
}

const facebookAuth = (request, response, next) => {
    request.session.redirect = request.query.redirectUri;
    passport.authenticate('facebook', { scope:'email' })(request, response, next);
}

const socialLoginRedirect = async (request, response) => {
    const redirectUri = request.session.redirect || process.env.HOST_URL;
    try {
        const { id, displayName, provider } = request.user;
        const { email } = request.user._json;
        const auth = await AuthService.loginSocialProvider({
            userId: id, displayName, email, authProvider: provider
        });
        response.cookie('jwt', JSON.stringify(auth))
        response.redirect(`${redirectUri}?token=${auth.token}&userId=${auth.user._id}`);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

module.exports = {
    emailAuth,
    googleAuth,
    facebookAuth,
    socialLoginRedirect,
    userRegister
};