const Band = require('../models/band.model')
const BaseService = require('./base.service')
const UserService = require('./users.service')
const { Types } = require('mongoose')
const { normalizeMongoId } = require('../utils/object.utils')

class BandService extends BaseService {
    constructor() {
        super(Band);
    }

    async findByFilter({ genre, manager, active, musician }) {
        const filter = {};
        const query = [{
            '$lookup': {
                'from': 'musicians',
                'localField': '_id',
                'foreignField': 'band',
                'as': 'musicians'
            }
        }, {
            '$match': filter
        }, {
            '$unset': 'musicians'
        }];

        if (genre) {
            filter['genres'] = genre;
        }
        if (manager) {
            filter['manager'] = Types.ObjectId(manager);
        }
        if (active) {
            const isActive = active == 'true';
            filter['active'] = isActive;
        }
        if (musician) {
            const user = await UserService.findById(musician);
            filter['musicians.email'] = user.email;
        }
        
        const bands = await Band.aggregate(query);
        return normalizeMongoId(bands);
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