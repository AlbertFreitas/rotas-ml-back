module.exports = (schema, where = 'body') => async (req, _res, next) => {
  try {
    req[where] = await schema.validate(req[where], {
      abortEarly: false,
      stripUnknown: true,
    });

    return next();
  } catch (error) {
    return next(error);
  }
};
