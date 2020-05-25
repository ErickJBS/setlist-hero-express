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
router.get('/event', auth, EventController.getEvents)
router.post('/event', [
    auth,
    check('name', 'name is required').exists().notEmpty(),
    check('date', 'date is required').exists().toDate(),
    check('location', 'location is required').exists().notEmpty(),
    check('band').exists().withMessage('band is required')
        .isMongoId('invalid band id format'),
    check('designer').exists().withMessage('designer is required')
        .isMongoId('invalid designer id format'),
    check('setlist', 'setlist must be an array').isArray(),
    errorValidation
], EventController.createEvent)
router.put('/event/:eventId', [
    auth,
    check('eventId', 'invalid eventId').isMongoId(),
    check('name', 'name is required').exists().notEmpty(),
    check('date', 'date is required').exists().toDate(),
    check('location', 'location is required').exists().notEmpty(),
    check('band').exists().withMessage('band is required')
        .isMongoId('invalid band id format'),
    check('designer').exists().withMessage('designer is required')
        .isMongoId('invalid designer id format'),
    check('setlist', 'setlist must be an array').isArray(),
    errorValidation
], EventController.updateEvent);
router.delete('/event/:eventId', [
    auth,
    check('eventId', 'invalid eventId').isMongoId(),
    errorValidation
], EventController.deleteEvent)

module.exports = router;