const { Router } = require('express')
const MusicianController = require('../controllers/musician.controller')
const { check } = require('express-validator')
const auth = require('../middlewares/auth.middleware')
const errorValidation = require('../middlewares/validation.middleware')

const router = new Router();

router.get('/musician/:musicianId', [
    auth,
    check('musicianId', 'invalid musicianId').isMongoId(),
    errorValidation
], MusicianController.getMusicianById)
router.get('/musician', auth, MusicianController.getMusicians)
router.post('/musician', [
    auth,
    check('instrument', 'instrument is required').exists().notEmpty(),
    check('band').exists().withMessage('band is required')
        .isMongoId('invalid band id format'),
    errorValidation
], MusicianController.createMusician)
router.put('/musician/:musicianId', [
    auth,
    check('musicianId', 'invalid musicianId').isMongoId(),
    check('instrument', 'instrument is required').exists().notEmpty(),
    errorValidation
], MusicianController.updateMusician);
router.delete('/musician/:musicianId', [
    auth,
    check('musicianId', 'invalid musicianId').isMongoId(),
    errorValidation
], MusicianController.deleteMusician)

module.exports = router;