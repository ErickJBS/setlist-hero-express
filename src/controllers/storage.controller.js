const StorageService = require('../services/storage.service')

const uploadImage = async (request, response) => {
    const fileData = request.files.data;
    try {
        const file = await StorageService.uploadImage(fileData);
        return response.json(file);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

const uploadPdf = async (request, response) => {
    const fileData = request.files.data;
    try {
        const file = await StorageService.uploadPdf(fileData);
        return response.json(file);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

module.exports = {
    uploadImage, uploadPdf
};