export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let code = err.code || "INTERNAL_SERVER_ERROR";
  let errors = err.errors || [];

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors || {})
      .map((item) => item.message)
      .join(", ") || "Validation failed";
    code = "VALIDATION_ERROR";
    errors = Object.values(err.errors || {}).map((item) => ({
      field: item.path,
      message: item.message,
    }));
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path || "ID"}`;
    code = "INVALID_ID";
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate value";
    code = "DUPLICATE_VALUE";
  }

  const response = {
    success: false,
    statusCode,
    message,
    code,
    errors,
    requestId: req.id || null,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  };

  res.status(statusCode).json(response);
};
