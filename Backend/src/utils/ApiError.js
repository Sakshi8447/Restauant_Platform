export const ApiError = (statusCode, message) => {
    const newError = new Error();
    newError.message = message;
    newError.statusCode = statusCode;
    return newError;
}
