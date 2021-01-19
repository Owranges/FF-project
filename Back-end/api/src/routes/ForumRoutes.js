const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const verif_token = require("../middleware/token");
const config = require("../modules/config")

const forumRoutes = async function (router, con) {

    // CREATE SUBJECT
    await router.post("/subject/create", (req, res) => {
        try {
            // let id = req.body.id;
            // let contained = req.body.contained;
            // let idSubject = req.body.idCategorySubject;
            let myDate = Date(Date.now());
            console.log(myDate);
            let object = {
                id_utilisateur: req.body.id_utilisateur,
                date: Date(Date.now()),
                contenu: req.body.contained,
                id_catégories_sujet: req.body.idCategorySubject
            }

            con.query(`INSERT INTO sujet_forum SET ?`, object, (err, result) => {
                if (err) throw err;
                res.status(200).send("Subject well inserted");
            });
        } catch (error) {
            res.status(203).send(error)
        }
    });

    // CREATE A COMMENTARY
    await router.post("/subject/commentaries", (req, res) => {
        try {
            let idAuthor = req.body.idAuthor;
            let contained = req.body.contained;
            let idSubject = req.body.idSubject;
            // let idCategory = req.body.idCategory;

            let sql = `INSERT INTO commentaires SET id_auteur = '${idAuthor}',NOW(),contenu_commentaires = '${contained}', id_sujet_forum = '${idSubject}'`;
            con.query(sql, (err, result) => {
                if (err) throw err;
                res.status(200).send("New commentary added")
            })

        } catch (error) {
            res.status(203).send(error)
        }
    });

    // DELETE A COMMENTARY
    await router.delete("/subject/:id/:idCommentary", (req, res) => {
        try {
            let id = req.params.id;
            let idCommentary = req.params.idCommentary;
            let sql = `DELETE FROM commentaires WHERE commentaires.id_auteur = '${id}' AND id = '${idCommentary}'`;

            con.query(sql, (err, result) => {
                if (err) throw err;
                if (result.length) {
                    res.status(200).send("USER COMMENTARY DELETED");
                } else {
                    res.status(200).send("THIS COMMENTARY DOES NOT EXIST")
                }

            });
        } catch (error) {
            res.status(203).send(error)
        }
    });

}

module.exports = forumRoutes;




