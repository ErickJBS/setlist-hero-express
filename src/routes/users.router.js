const { Router } = require('express')
const UserController = require('../controllers/user.controller')
const { check } = require('express-validator')
const auth = require('../middlewares/auth.middleware')
const errorValidation = require('../middlewares/validation.middleware')

const router = new Router();

router.get('/user/:userId', UserController.getUser)

module.exports = router;