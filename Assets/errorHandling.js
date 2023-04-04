const ErrorHandling = (err, req, res, next) => {
  const status = err.status ? err.status : 500;
  const message = err.message ? err.message : "internal server error";
  res.status(status).json({
    succes: false,
    message: message,
  });
};

export default ErrorHandling;
