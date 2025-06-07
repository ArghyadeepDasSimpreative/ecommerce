export const errorHandler = (err, req, res) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // Mongoose duplicate key error
  else if (err.code && err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate field value for "${field}"`;
  }

  // Mongoose CastError (e.g., invalid ObjectId)
  else if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // JWT errors (optional: if using JWT later)
  else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  } else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token has expired";
  }

  // Custom error (thrown manually)
  else if (err.statusCode && err.message) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Fallback to generic error
  else if (err.message) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
