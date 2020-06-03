const { Router } = require('express')
const StorageController = require('../controllers/storage.controller')

const router = new Router();

router.post('/storage/upload/image', StorageController.uploadImage)
router.post('/storage/upload/pdf', StorageController.uploadPdf)

module.exports = router;