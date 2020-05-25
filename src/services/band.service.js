const Band = require('../models/band.model')
const BaseService = require('./base.service')

class BandService extends BaseService {
    constructor() {
        super(Band);
    }
}

module.exports = new BandService();