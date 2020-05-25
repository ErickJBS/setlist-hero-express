const MusicianService = require('../services/musician.service')

const getMusicianById = async (request, response) => {
    const musicianId = request.params.musicianId;
    try {
        const musician = await MusicianService.findById(musicianId);
        response.json(musician);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

const getMusicians = async (request, response) => {
    try {
        const musicians = await MusicianService.find();
        response.json(musicians);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

const createMusician = async (request, response) => {
    const { instrument, band, user } = request.body;
    try {
        const fields = { instrument, band, user }
        const musician = await MusicianService.create(fields);
        return response.json(musician);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

const updateMusician = async (request, response) => {
    const musicianId = request.paramas.musicianId;
    const { instrument } = request.body;
    try {
        const fields = { instrument }
        const updatedMusician = await MusicianService.update(musicianId, fields);
        return response.json(updatedMusician);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

const deleteMusician = async (request, response) => {
    const musicianId = request.paramas.musicianId;
    try {
        await MusicianService.delete(musicianId);
        return response.send();
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

module.exports = {
    getMusicianById,
    getMusicians,
    createMusician,
    updateMusician,
    deleteMusician
};