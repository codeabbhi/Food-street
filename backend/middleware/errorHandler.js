module.exports = (err, req, res, next) => {
  console.error("❌ Error:", err);

  const status = err.statusCode || 500;
  const message = process.env.NODE_ENV === "development" 
    ? err.message 
    : "Internal Server Error";

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};
