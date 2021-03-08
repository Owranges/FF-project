const jwt = require("jsonwebtoken");
const config = require("../modules/config")

const verif_token_admin = (req, res, next) => {
    try {
        const token = req.headers["authorization"];


        let decoded = jwt.verify(token, config.secret)
        jwt.verify(token, config.secret, (err, result) => {
            if (err) throw err
            if (decoded.admin) {
                next();
            }
        })
    } catch (error) {
        res.status(401).send(error)
    };
};

module.exports = verif_token_admin;