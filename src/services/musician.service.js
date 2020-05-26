const Musician = require('../models/musician.model')
const BaseService = require('./base.service')

class MusicianService extends BaseService {
    constructor() {
        super(Musician);
    }

    async findById(id) {
        const obj = this.model.findById(id)
            .populate('user', 'id email username displayName');
        if (!obj) {
            throw new RequestError(404, `Couldn't find ${this.modelName} with id ${id}`);
        }

        return obj;
    }

    async find({ filter, skip, limit, sort } = {}) {
        return this.model.find(filter)
            .limit(limit).skip(skip).sort(sort)
            .populate('user', 'id email username displayName');
    }

    async findByFilter({ band }) {
        const filter = {};
        if (band) {
            filter['band'] = band;
        }
        return this.find({ filter });
    }
}

module.exports = new MusicianService();