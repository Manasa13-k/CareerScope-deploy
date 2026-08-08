/**
 * Wrapper to catch exceptions inside asynchronous express routes
 * and forward them to the global error middleware.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
