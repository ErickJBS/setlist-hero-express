const { Router } = require('express')
const EventController = require('../controllers/event.controller')
const { check } = require('express-validator')
const auth = require('../middlewares/auth.middleware')
const errorValidation = require('../middlewares/validation.middleware')

const router = new Router();

router.get('/event/:eventId', [
    auth,
    check('eventId', 'invalid eventId').isMongoId(),
    errorValidation
], EventController.getEventById)
router.get('/event', [
    auth,
    check('designer').optional()
        .isMongoId().withMessage('invalid designer id format'),
    check('manager').optional()
        .isMongoId().withMessage('invalid manager id format'),
    check('musician').optional()
        .isMongoId().withMessage('invalid musician id format'),
    check('band').optional()
        .isMongoId().withMessage('invalid band id format'),
    check('startDate').optional().toDate(),
    check('endDate').optional().toDate(),
    errorValidation
], EventController.getEvents)
router.post('/event', [
    auth,
    check('tags', 'tags must be an array of string').optional().isArray(),
    check('name', 'name is required').exists().notEmpty(),
    check('date', 'date is required').exists().toDate(),
    check('location', 'location is required').exists().notEmpty(),
    check('band').exists().withMessage('band is required')
        .isMongoId().withMessage('invalid band id format'),
    check('designer').exists().withMessage('designer is required')
        .isEmail().withMessage('designer must be a valid email'),
    check('setlist', 'setlist must be an array').optional().isArray(),
    errorValidation
], EventController.createEvent)
router.put('/event/:eventId', [
    auth,
    check('tags', 'tags must be an array of string').optional().isArray(),
    check('eventId', 'invalid eventId').isMongoId(),
    check('date', 'date must be a valid date').optional().toDate(),
    check('location', 'location can not be empty').optional().notEmpty(),
    check('band').optional().isMongoId().withMessage('invalid band id format'),
    check('designer').optional().isEmail().withMessage('designer must be a valid email'),
    check('setlist', 'setlist must be an array').optional().isArray(),
    errorValidation
], EventController.updateEvent);
router.delete('/event/:eventId', [
    auth,
    check('eventId', 'invalid eventId').isMongoId(),
    errorValidation
], EventController.deleteEvent)

module.exports = router;