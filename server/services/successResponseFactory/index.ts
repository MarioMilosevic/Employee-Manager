function createSuccessResponse(message: string, status: number, data?: any) {
  return {
    sucess: true,
    message,
    status,
    data,
  };
}

export default {
  goodRequest(message: string = "OK", status: number = 200, data: any) {
    return createSuccessResponse(message, status, data);
  },
  created(
    message: string = "Successfully created",
    status: number = 201,
    data: any
  ) {
    return createSuccessResponse(message, status, data);
  },
  noContent(message: string = "Successfull request", status: number = 204) {
    return createSuccessResponse(message, status);
  },
};
