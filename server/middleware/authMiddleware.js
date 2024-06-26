const authenticate = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).send({ error: "Unauthorized" });
  }
};

export default authenticate;
