const Song = require('../models/song.model')
const BaseService = require('./base.service')

class SongService extends BaseService {
    constructor() {
        super(Song);
    }

    async findByFilter({ band, tag }) {
        const filter = {};
        if (band) {
            filter['band'] = band;
        }
        if (tag) {
            filter['tags'] = tag;
        }
        return this.find({ filter });
    }
}

module.exports = new SongService();