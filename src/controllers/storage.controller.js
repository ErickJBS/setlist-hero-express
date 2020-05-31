const StorageService = require('../services/storage.service')

const uploadFile = async (request, response) => {
    const fileData = request.files.data;
    try {
        const file = await StorageService.saveFile(fileData);
        return response.json(file);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

module.exports = {
    uploadFile
};