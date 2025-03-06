class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.explanation = message; // Message passed by the user
    }
}

module.exports = AppError;