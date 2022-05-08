const statusMessage = {
    400: "Bad request",
    401: "Email or password is wrong",
    404: "Not found",
    409: "Conflict",
};

const createError = (status, message = statusMessage[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

module.exports = createError;