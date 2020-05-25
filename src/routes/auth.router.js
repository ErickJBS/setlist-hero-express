const passport = require('passport')
const { Router } = require('express')
const AuthController = require('../controllers/auth.controller')
const { check } = require('express-validator')
const errorValidation = require('../middlewares/validation.middleware')

const router = new Router();

router.post('/auth/register', [
    check('email').notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    check('username', 'username is required').notEmpty(),
    check('displayName', 'displayName is required').notEmpty(),
    check('password').exists().withMessage('password is required')
        .isLength({ min: 8 }).withMessage('password is too short'),
    errorValidation
], AuthController.userRegister)
router.post('/auth/email', [
    check('identifier', 'identifier is required').notEmpty(),
    check('password', 'password is required').notEmpty(),
    errorValidation
], AuthController.emailAuth)
router.get('/auth/google', AuthController.googleAuth)
router.get('/auth/facebook', AuthController.facebookAuth)
router.get('/googleRedirect', passport.authenticate('google'), AuthController.socialLoginRedirect)
router.get('/facebookRedirect', passport.authenticate('facebook', { scope: 'email' }), AuthController.socialLoginRedirect)

module.exports = router;