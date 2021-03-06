const jwt = require("jsonwebtoken");
const config = require("../modules/config")

const verif_token = (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) throw 'No token'

    jwt.verify(token, config.secret, (err, result) => {
      if (err) throw err
      next();
    })
  } catch (error) {
    res.status(401).send(error)
  };
};

module.exports = verif_token;