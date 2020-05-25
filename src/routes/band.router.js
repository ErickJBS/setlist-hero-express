const { Router } = require('express')
const BandController = require('../controllers/band.controller')
const { check } = require('express-validator')
const auth = require('../middlewares/auth.middleware')
const errorValidation = require('../middlewares/validation.middleware')

const router = new Router();

router.get('/band/:bandId', [
    auth,
    check('bandId', 'Invalid bandId').exists().isMongoId(),
    errorValidation
], BandController.getBandById)
router.get('/band', auth, BandController.getBands)
router.post('/band', [
    auth,
    check('name', 'name is required').exists().notEmpty(),
    check('logo', 'logo must be a valid URL').isURL(),
    check('genres', 'genres must be an array of string').isArray(),
    check('mananger').exists().withMessage('manager is required')
        .isMongoId().withMessage('Invalid manager id'),
    errorValidation
], BandController.createBand)
router.put('/band/:bandId', [
    auth,
    check('bandId', 'Invalid bandId').exists().isMongoId(),
    check('name', 'name is required').exists().notEmpty(),
    check('logo', 'logo must be a valid URL').isURL(),
    check('genres', 'genres must be an array of string').isArray(),
    check('mananger').exists().withMessage('manager is required')
        .isMongoId().withMessage('Invalid manager id'),
    errorValidation
], BandController.updateBand);
router.delete('/band/:bandId', [
    auth,
    check('bandId', 'Invalid bandId').exists().isMongoId(),
    errorValidation
], BandController.deleteBand)

module.exports = router;