const { Storage } = require('@google-cloud/storage');
const RequestError = require('../errors/request.error.js');

const storage = new Storage();
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
const MAX_FILE_SIZE = 5242880;

class StorageService {

    async saveFile(file) {
        if (file.size > MAX_FILE_SIZE) {
            throw new RequestError(400, 'Provided file is too big')
        }
        const name = `${new Date().getTime()}_${file.name}`;
        const blob = bucket.file(name);
        const blobStream = blob.createWriteStream({
            resumable: false
        });

        blobStream.on('error', (err) => {
            console.log(err)
            throw new RequestError(500, 'An error happened when saving the file')
        });

        const response = new Promise((resolve, reject) => {
            blobStream.on('finish', () => {
                // The public URL can be used to directly access the file via HTTP.
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                resolve({
                    downloadUrl: publicUrl,
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size
                });
            });
        });

        blobStream.end(file.data);
        return response;
    }

    async uploadPdf(file) {
        const imageMimeTypes = [ 'application/pdf' ];
        const type = file.mimetype;
        if (!imageMimeTypes.includes(type)) {
            throw new RequestError(400, 'Provided file is not PDF')
        }
        return this.saveFile(file);
    }

    async uploadImage(file) {
        const imageMimeTypes = [ 'image/png', 'image/jpeg' ];
        const type = file.mimetype;
        if (!imageMimeTypes.includes(type)) {
            throw new RequestError(400, 'Provided file is not an image')
        }
        return this.saveFile(file);
    }

}

module.exports = new StorageService();