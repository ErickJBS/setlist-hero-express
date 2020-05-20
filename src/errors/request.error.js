class RequestError extends Error {

    constructor(errorCode, message) {
        super(message)
        this.errorCode = errorCode;
    }
}

module.exports = RequestError;