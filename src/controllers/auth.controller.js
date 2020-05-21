const passport = require('passport')
const AuthService = require('../services/auth.service')

const emailAuth = async (request, response) => {
    const { identifier, password } = request.body;
    try {
        const token = await AuthService.login(identifier, password);
        response.cookie('jwt', JSON.stringify(token))
        response.redirect('http://localhost:3000/');
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

const googleAuth = passport.authenticate('google', { scope: ['profile','email'] })
const facebookAuth = passport.authenticate('facebook', { scope:'email' })

const googleRedirect = async (request, response) => {

    try {
        const { id, displayName } = request.user;
        const { email } = request.user._json;
        const token = await AuthService.loginSocialProvider({
            userId: id, displayName, email, authProvider: 'Google'
        });
        response.cookie('jwt', JSON.stringify(token))
        response.redirect('http://localhost:3000/')
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

const facebookRedirect = async (request, response) => {

    try {
        const { id, displayName } = request.user;
        const { email } = request.user._json;
        const token = await AuthService.loginSocialProvider({
            userId: id, displayName, email, authProvider: 'Facebook'
        });
        response.cookie('jwt', JSON.stringify(token))
        response.redirect('http://localhost:3000/');
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

module.exports = {
    emailAuth,
    googleAuth,
    facebookAuth,
    googleRedirect,
    facebookRedirect,
    userRegister
};