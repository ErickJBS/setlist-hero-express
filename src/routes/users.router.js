const { Router } = require('express')
const UserController = require('../controllers/user.controller')

const router = new Router();

router.get('/user/:userId', UserController.getUser)

module.exports = router;