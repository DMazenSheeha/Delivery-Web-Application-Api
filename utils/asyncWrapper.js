const asyncWrapper = (asyncFunction) => {
  return (req, res, next) => {
    asyncFunction(req, res, next).catch((err) => {
      if (err) {
        return next(err);
      }
    });
  };
};

module.exports = asyncWrapper;
