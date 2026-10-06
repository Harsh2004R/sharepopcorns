class ApiError extends Error {
  constructor({
    statusCode = 500,
    message = "Internal Server Error",
    code = "INTERNAL_SERVER_ERROR",
    errors = [],
    data = null,
  } = {}) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.errors = errors;
    this.data = data;
    this.success = false;

    Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };
