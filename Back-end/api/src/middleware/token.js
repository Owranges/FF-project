const jwt = require("jsonwebtoken");
const config = require("../modules/config")

const verif_token = (req, res, next) => {
  let auth = req.headers["authorization"];


  jwt.verify(auth, config.secret, (err, result) => {
    if (err) {
      res.status(200).send(err);
    } else if (result.length <= 0) {
      res.status(200).send(result);
    } else {
      next();
    }
  });
};

module.exports = verif_token;