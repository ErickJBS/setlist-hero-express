const SongService = require('../services/song.service')

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
        const songs = await SongService.findByFilter(request.query);
        response.json(songs);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

const createSong = async (request, response) => {
    const { name, band, tempo, tags, lyrics, chords, sheets } = request.body;
    try {
        const fields = { name, band, tempo, tags, chords, lyrics, sheets }
        const song = await SongService.create(fields);
        return response.json(song);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

const updateSong = async (request, response) => {
    const songId = request.params.songId;
    const { name, tags, tempo, chords, lyrics, sheets } = request.body;
    try {
        const fields = { name, tempo, chords, band, tags, lyrics, sheets }
        const updatedSong = await SongService.update(songId, fields);
        return response.json(updatedSong);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

const deleteSong = async (request, response) => {
    const songId = request.params.songId;
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