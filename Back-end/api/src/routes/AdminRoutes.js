const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const verif_token = require("../middleware/token");
const config = require("../modules/config")

const adminRoutes = async function (router, con) {
    //CREATE CATEGORY SUBJECT
    await router.post("/subject/category", (req, res) => {
        try {
            if (!req.body.idAdmin || req.body.idAdmin == "") throw "please provide idAdmin"
            if (!req.body.nom || req.body.nom == "") throw "please provide a nom"
            let object = {
                id: req.body.idAdmin
            }
            con.query(`SELECT id,administ FROM utilisateurs WHERE ?;`,object , (err, result) => {
                if (err) throw err;
                else if (result[0].administ == 1) {
                    
                    let objectName = {
                        nom: req.body.nom
                    }

                    con.query(`INSERT INTO catégories_sujet SET ?`,objectName, (err, results) => {
                        if (err) throw err;
                        res.status(200).send("New category added")
                    })
                } else {
                    res.status(403).send("Ur not an admin user")
                }
            })
        } catch (error) {
            res.status(403).send(error)
        }
    });
}

module.exports = adminRoutes;
