const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const verif_token_admin = require("../middleware/tokenAdmin");
const config = require("../modules/config");

const adminRoutes = async function (router, con) {
    //CREATE CATEGORY SUBJECT
    //     await router.post("/subject/category", (req, res) => {
    //         try {
    //             if (!req.body.idAdmin || req.body.idAdmin == "") throw "please provide idAdmin"
    //             if (!req.body.nom || req.body.nom == "") throw "please provide a nom"
    //             let object = {
    //                 id: req.body.idAdmin
    //             }
    //             con.query(`SELECT id,administ FROM utilisateurs WHERE ?;`, object, (err, result) => {
    //                 if (err) throw err;
    //                 else if (result[0].administ == 1) {

    //                     let objectName = {
    //                         nom: req.body.nom
    //                     }

    //                     con.query(`INSERT INTO catégories_sujet SET ?`, objectName, (err, results) => {
    //                         if (err) throw err;
    //                         res.status(200).send("New category added")
    //                     })
    //                 } else {
    //                     res.status(403).send("Ur not an admin user")
    //                 }
    //             })
    //         } catch (error) {
    //             res.status(403).send(error)
    //         }
    //     });
    // }  

    // GET USERS
    await router.get("/users", verif_token_admin, (req, res) => {
        try {
            con.query(`SELECT * FROM utilisateurs`, (err, result) => {
                if (err) throw err
                if (!result.length) {
                    res.status(403).send("There is no users")
                } else {
                    res.status(200).send(result)
                }
            })
        } catch (error) {
            res.status(403).send(error)
        }
    })

    // DELETE USER ACCOUNT
    await router.delete("/users/:id", verif_token_admin, (req, res) => {
        try {

            if (!req.params.id || req.params.id == "") throw "id is required"

            con.query(`DELETE FROM utilisateurs WHERE utilisateurs.id = ?`, req.params.id, (err, result) => {
                if (err) throw err;
                else if (result.affectedRows == 1) {
                    res.status(200).send("USER ACCOUNT DELETED");
                } else {
                    res.status(403).send("THIS USER DOES NOT EXIST")
                }

            });
        } catch (error) {
            res.status(403).send(error)
        }
    });


    // DELETE SUBJECT
    await router.delete("/subject/:id", verif_token_admin, (req, res) => {
        try {
            if (!req.params.id || req.params.id == "") throw "id is required"
            con.query(`DELETE FROM sujet_forum WHERE sujet_forum.id = ?`, req.params.id, (err, result) => {
                if (err) throw err;
                if (result.affectedRows == 1) {
                    res.status(200).send("SUBJECT DELETED");
                }
                else {
                    res.status(403).send("SUBJECT DOES NOT EXIST");
                }
            });
        } catch (error) {
            res.status(403).send(error)
        }
    })
}

module.exports = adminRoutes;
