const StorageService = require('../services/storage.service')

const uploadImage = async (request, response) => {
    const image = request.files.data;
    try {
        const file = await StorageService.saveImage(image);
        return response.json(file);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

module.exports = {
    uploadImage
};