const Event = require('../models/event.model')
const BaseService = require('./base.service')

class EventService extends BaseService {
    constructor() {
        super(Event);
    }
}

module.exports = EventService();