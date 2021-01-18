const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const verif_token = require("../middleware/token");
const config = require("../modules/config")

const adminRoutes = async function (router, con) {
    //CREATE CATEGORY SUBJECT
    await router.post("/subject/category", verif_token, (req, res) => {
        try {
            if (!req.body.idAdmin) throw "please provide idAdmin"
            if (!req.body.nom || req.body.nom == "") throw "please provide a nom"
            let id = req.body.idAdmin;
            let checkAdmin = `SELECT id,administ FROM utilisateurs WHERE id = '${id}';`;
            con.query(checkAdmin, (err, result) => {
                if (err) throw err;
                else if (result[0].administ == 1) {
                    let sql = `INSERT INTO catégories_sujet (nom) VALUES('${req.body.nom}')`;

                    con.query(sql, (err, results) => {
                        if (err) throw err;
                        res.status(200).send("New category added")
                    })
                } else {
                    res.status(200).send("Ur not an admin user")
                }
            })
        } catch (error) {
            res.status(203).send(error)
        }
    });
}

module.exports = adminRoutes;
