const Band = require('../models/band.model')
const BaseService = require('./base.service')

class BandService extends BaseService {
    constructor() {
        super(Band);
    }

    async findByFilter({ manager }) {
        const filter = {};
        if (manager) {
            filter['manager'] = manager;
        }
        return this.find({ filter });
    }

    async delete(id) {
        try {
            const band = await this.findById(id);
            band.active = false;
            return this.update(id, {active: band.active});
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new BandService();