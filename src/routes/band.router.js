const { Router } = require('express')
const BandController = require('../controllers/band.controller')
const { check } = require('express-validator')
const auth = require('../middlewares/auth.middleware')
const errorValidation = require('../middlewares/validation.middleware')

const router = new Router();

router.get('/band/:bandId', [
    auth,
    check('bandId', 'Invalid bandId').isMongoId(),
    errorValidation
], BandController.getBandById)
router.get('/band', [
    auth,
    check('manager').optional()
        .isMongoId().withMessage('Invalid manager id'),
    errorValidation
], BandController.getBands)
router.post('/band', [
    auth,
    check('name', 'name is required').exists().notEmpty(),
    check('logo', 'logo must be a valid URL').optional().isURL({ 
        allow_underscores: true,
        allow_protocol_relative_urls: true,
        require_tld: false
    }),
    check('genres', 'genres must be an array of string').optional().isArray(),
    check('manager').exists().withMessage('manager is required')
        .isMongoId().withMessage('Invalid manager id'),
    errorValidation
], BandController.createBand)
router.put('/band/:bandId', [
    auth,
    check('bandId', 'Invalid bandId').isMongoId(),
    check('name', 'name can not be empty').optional().notEmpty(),
    check('logo', 'logo must be a valid URL').optional().isURL({
        allow_underscores: true,
        allow_protocol_relative_urls: true,
        require_tld: false
    }),
    check('active').optional().isBoolean().withMessage('active must be boolean'),
    check('genres', 'genres must be an array of string').optional().isArray(),
    check('manager', 'Invalid manager id').optional().isMongoId(),
    errorValidation
], BandController.updateBand);
router.delete('/band/:bandId', [
    auth,
    check('bandId', 'Invalid bandId').isMongoId(),
    errorValidation
], BandController.deleteBand)

module.exports = router;