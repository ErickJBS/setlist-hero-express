const Event = require('../models/event.model')
const UserService = require('./users.service')
const BandService = require('./band.service')
const BaseService = require('./base.service')
const MailService = require('./mail.service')
const { Types } = require('mongoose')
const { normalizeMongoId } = require('../utils/object.utils')

class EventService extends BaseService {
    constructor() {
        super(Event);
    }

    async findByFilter({ designer, manager, musician, band, tag, startDate, endDate }) {
        const filter = {};
        const query = [{
            '$lookup': {
                'from': 'bands',
                'localField': 'band',
                'foreignField': '_id',
                'as': 'bandDetail'
            }
        }, {
            '$unwind': {
                'path': '$bandDetail'
            }
        }, {
            '$lookup': {
                'from': 'musicians',
                'localField': 'band',
                'foreignField': 'band',
                'as': 'musicians'
            }
        }, {
            '$match': filter
        }, {
            '$addFields': {
              'bandName': '$bandDetail.name'
            }
        }, {
            '$unset': [
                'musicians', 'bandDetail'
            ]
        }];

        if (designer) {
            const user = await UserService.findById(designer);
            filter['designer'] = user.email;
        }
        if (manager) {
            filter['bandDetail.manager'] = Types.ObjectId(manager);
        }
        if (musician) {
            const user = await UserService.findById(musician);
            filter['musicians.email'] = user.email;
        }
        if (band) {
            filter['band'] = Types.ObjectId(band);
        }
        if (tag) {
            filter['tags'] = tag;
        }
        if (startDate || endDate) {
            filter['date'] = {}
            if (startDate) {
                filter['date']['$gte'] = startDate;
            }
            if (endDate) {
                filter['date']['$lte'] = endDate;
            }
        }

        const events = await Event.aggregate(query);
        return normalizeMongoId(events);
    }

    async findById(id) {
        const event = await Event.findById(id)
            .populate({
                path: 'setlist.songs',
                select: 'name tags tempo'
            })
        if (!event) {
            throw new RequestError(404, `Couldn't find event with id ${id}`);
        }

        return event;
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