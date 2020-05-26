const Musician = require('../models/event.model')
const BaseService = require('./base.service')

class MusicianService extends BaseService {
    constructor() {
        super(Musician);
    }
}

module.exports = new MusicianService();