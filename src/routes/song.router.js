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
    check('tempo').exists().withMessage('tempo is required')
        .isNumeric().withMessage('tempo must be a number'),
    check('name', 'name is required').exists().notEmpty(),
    check('band').exists().withMessage('band is required')
        .isMongoId().withMessage('invalid band id format'),
    check('tags', 'tags must be an array of string').optional().isArray(),
    check('sheets', 'sheets must be an array of { instrument: string, content: string }')
        .optional().isArray(),
    errorValidation
], SongController.createSong)
router.put('/song/:songId', [
    auth,
    check('tempo').optional().isNumeric().withMessage('tempo must be a number'),
    check('name', 'name can not be empty').optional().notEmpty(),
    check('tags', 'tags must be an array of string').optional().isArray(),
    check('sheets', 'sheets must be an array of { instrument: string, content: string }')
        .optional().isArray(),
    errorValidation
], SongController.updateSong);
router.delete('/song/:songId', [
    auth,
    check('songId', 'invalid songId').isMongoId(),
    errorValidation
], SongController.deleteSong)

module.exports = router;