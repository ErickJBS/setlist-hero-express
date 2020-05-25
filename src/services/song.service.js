const Song = require('../models/song.model')
const BaseService = require('./base.service')

class SongService extends BaseService {
    constructor() {
        super(Song);
    }
}

module.exports = SongService();