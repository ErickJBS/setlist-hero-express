const { Router } = require('express')
const StorageController = require('../controllers/storage.controller')

const router = new Router();

router.post('/storage/upload', StorageController.uploadFile)

module.exports = router;