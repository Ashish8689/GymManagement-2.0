class AppError extends Error {
    constructor(errorMessage, errorCode) {
        super(errorMessage);
        this.status = errorCode;
        this.isOperational = true;

        // This line receives the stack trace i.e., the file from which the error has originated.
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
