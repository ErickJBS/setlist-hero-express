const Event = require('../models/event.model')
const UserService = require('./users.service')
const BandService = require('./band.service')
const BaseService = require('./base.service')
const MailService = require('./mail.service')

class EventService extends BaseService {
    constructor() {
        super(Event);
    }

    async create(event) {
        const email = event.designer;
        const user = await UserService.findByEmail(email);
        if (!user) {
            // User does not exists
            const band = await BandService.findById(event.band);
            const manager = await UserService.findById(band.manager);
            await MailService.sendEventInvitation(email, {
                manager: manager.displayName,
                band: band.name,
                event: event.name,
                date: event.date
            })
        }
        return super.create(event);
    }
}

module.exports = new EventService();