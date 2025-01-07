
function createResponseError(message, status, data) {
  const error = new Error(message);
  // @ts-ignore
  error.isCustomError = true;
  // @ts-ignore

  error.response = {
    ...data,
    status,
    message,
  };
    //   throw error;
    return Promise.reject(error);
    // throw error
}

// function retur 

export default {
  badRequest(message = "Bad request", data) {
    return createResponseError(message, 400, data);
  },
  notFound(message = "Not found", data) {
    return createResponseError(message, 404, data);
  },
};
