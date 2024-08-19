const asyncWrapper = require("../utils/asyncWrapper");
const appError = require("../utils/appError");
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY;

const authorization = asyncWrapper(async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    const newError = appError.create(false, "Unauthorized", 401);
    return next(newError);
  }
  try {
    const { id } = await JWT.verify(token, secret);
    req.body.userId = id;
    next();
  } catch (err) {
    const newError = appError.create(false, "Unauthorized", 401);
    return next(newError);
  }
});

module.exports = authorization;
