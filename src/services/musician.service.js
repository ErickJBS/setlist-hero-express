const Musician = require('../models/musician.model')
const UserService = require('./users.service')
const BandService = require('./band.service')
const MailService = require('./mail.service')
const BaseService = require('./base.service')

class MusicianService extends BaseService {
    constructor() {
        super(Musician);
    }

    async create(musician) {
        const email = musician.email;
        const user = await UserService.findByEmail(email);
        if (!user) {
            // User does not exists
            const band = await BandService.findById(musician.band);
            const manager = await UserService.findById(band.manager);
            await MailService.sendBandInvitation(email, {
                role: musician.instrument,
                band: band.name,
                manager: manager.displayName
            })
        }
        return super.create(musician);
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