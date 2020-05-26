const BandService = require('../services/band.service')

const getBandById = async (request, response) => {
    const bandId = request.params.bandId;
    try {
        const band = await BandService.findById(bandId);
        response.json(band);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

const getBands = async (request, response) => {
    try {
        const bands = await BandService.findByFilter(request.query);
        response.json(bands);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

const createBand = async (request, response) => {
    const { name, description, logo, genres, manager } = request.body;
    try {
        const fields = {
            name, description, logo, genres, manager
        }
        const band = await BandService.create(fields);
        return response.json(band);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

const updateBand = async (request, response) => {
    const bandId = request.params.bandId;
    const { name, description, logo, genres, manager } = request.body;
    try {
        const fields = {
            name, description, logo, genres, manager
        }
        const updatedBand = await BandService.update(bandId, fields);
        return response.json(updatedBand);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

const deleteBand = async (request, response) => {
    const bandId = request.params.bandId;
    try {
        await BandService.delete(bandId);
        return response.send();
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

module.exports = {
    getBandById,
    getBands,
    createBand,
    updateBand,
    deleteBand
};