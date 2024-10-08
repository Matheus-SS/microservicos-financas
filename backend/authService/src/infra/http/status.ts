const http_status = {
  CREATE: 201,
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
  CONFLICT: 409,
  UNPROCESSABLE_CONTENT: 422
};

Object.freeze(http_status);

export default http_status;