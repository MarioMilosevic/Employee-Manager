export const successReq = (res, statusCode, data) => {
    res.status(statusCode).json({
        sucess: true,
        data
  });
};

