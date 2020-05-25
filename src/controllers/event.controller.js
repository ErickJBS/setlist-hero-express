const EventService = require('../services/event.service')

const getEventById = async (request, response) => {
    const eventId = request.params.eventId;
    try {
        const event = await EventService.findById(eventId);
        response.json(event);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

const getEvents = async (request, response) => {
    try {
        const events = await EventService.find();
        response.json(events);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

const createEvent = async (request, response) => {
    const { name, date, location, band, designer, setlist } = request.body;
    try {
        const fields = {
            name, date, location, band, designer, setlist
        }
        const event = await EventService.create(fields);
        return response.json(event);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

const updateEvent = async (request, response) => {
    const eventId = request.paramas.eventId;
    const { name, date, location, band, designer, setlist } = request.body;
    try {
        const fields = {
            name, date, location, band, designer, setlist
        }
        const updatedEvent = await EventService.update(eventId, fields);
        return response.json(updatedEvent);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

const deleteEvent = async (request, response) => {
    const eventId = request.paramas.eventId;
    try {
        await EventService.delete(eventId);
        return response.send();
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

module.exports = {
    getEventById,
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};