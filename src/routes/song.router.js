const { Router } = require('express')
const SongController = require('../controllers/song.controller')
const { check } = require('express-validator')
const auth = require('../middlewares/auth.middleware')
const errorValidation = require('../middlewares/validation.middleware')

const router = new Router();

router.get('/song/:songId', [
    auth,
    check('songId', 'invalid songId').isMongoId(),
    errorValidation
], SongController.getSongById)
router.get('/song', auth, SongController.getSongs)
router.post('/song', [
    auth,
    check('name', 'name is required').exists().notEmpty(),
    check('lyrics', 'lyrics is required').exists().notEmpty(),
    check('band').exists().withMessage('band is required')
        .isMongoId('invalid band id format'),
    check('tags', 'tags must be an array of string').isArray(),
    check('sheets', 'sheets must be an array of { instrument: string, content: string }').isArray(),
    errorValidation
], SongController.createSong)
router.put('/song/:songId', [
    auth,
    check('name', 'name is required').exists().notEmpty(),
    check('lyrics', 'lyrics is required').exists().notEmpty(),
    check('tags', 'tags must be an array of string').isArray(),
    check('sheets', 'sheets must be an array of { instrument: string, content: string }').isArray(),
    errorValidation
], SongController.updateSong);
router.delete('/song/:songId', [
    auth,
    check('songId', 'invalid songId').isMongoId(),
    errorValidation
], SongController.deleteSong)

module.exports = router;