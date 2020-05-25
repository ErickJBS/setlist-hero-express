const SongService = require('../services/users.service')

const getSongById = async (request, response) => {
    const songId = request.params.songId;
    try {
        const song = await SongService.findById(songId);
        response.json(song);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

const getSongs = async (request, response) => {
    try {
        const songs = await SongService.find();
        response.json(songs);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

const createSong = async (request, response) => {
    const { name, band, tags, lyrics, sheets } = request.body;
    try {
        const fields = { name, band, tags, lyrics, sheets }
        const song = await SongService.create(fields);
        return response.json(song);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

const updateSong = async (request, response) => {
    const songId = request.paramas.songId;
    const { name, band, tags, lyrics, sheets } = request.body;
    try {
        const fields = { name, band, tags, lyrics, sheets }
        const updatedSong = await SongService.update(songId, fields);
        return response.json(updatedSong);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

const deleteSong = async (request, response) => {
    const songId = request.paramas.songId;
    try {
        await SongService.delete(songId);
        return response.send();
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

module.exports = {
    getSongById,
    getSongs,
    updateSong,
    deleteSong,
    createSong
};