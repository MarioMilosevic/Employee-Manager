const errorFactory = {
  handleBadRequest(error) {
    return {
      success: false,
      status: 400,
      message: "Bad request",
      error: error.message || "Invalid input provided",
    };
  },
  handleNotAuthorized() {
    return {
      success: false,
      status: 401,
      message: "Not authorized",
      error: "You are not authorized to access this resource",
    };
  },
  internalError(error) {
    return {
      success: false,
      status: 500,
      message: "Internal server error",
      error: error?.message || "An unexpected error occurred",
    };
  },
  handleNotFound() {
    return {
      success: false,
      status: 404,
      message: "Not found",
      error: "The requested resource could not be found",
    };
  },
};

export default errorFactory
