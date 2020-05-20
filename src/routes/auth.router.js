const passport = require('passport')
const { Router } = require('express')
const AuthController = require('../controllers/auth.controller')

const router = new Router();

router.post('/auth/register', AuthController.userRegister)
router.post('/auth/email', AuthController.emailAuth)
router.get('/auth/google', AuthController.googleAuth)
router.get('/auth/facebook', AuthController.facebookAuth)
router.get('/googleRedirect', passport.authenticate('google'), AuthController.googleRedirect)
router.get('/facebookRedirect', passport.authenticate('facebook', { scope: 'email' }), AuthController.facebookRedirect)

module.exports = router;