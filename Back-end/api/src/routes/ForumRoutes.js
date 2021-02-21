const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const verif_token = require("../middleware/token");
const config = require("../modules/config")

const forumRoutes = async function (router, con) {

    // GET ONE SUBJECT 
    await router.get("/subject/:id", (req, res) => {
        try {
            let object = {
                id: req.params.id_subject
            }
            con.query('SELECT * FROM sujet_from WHERE ?', object, (err, result) => {
                if (err) throw err;
                if (!result.length) {
                    res.status(403).send("This subject doesn't exist")
                } else {
                    res.status(200).send(result)
                }
            })
        } catch (error) {
            res.status(403).send(error)
        }
    })
    // GET ALL SUBJECT 
    await router.get("/subject", (req, res) => {
        try {
            con.query('SELECT * FROM sujet_forum', (err, result) => {
                if (err) throw err;
                if (!result.length) {
                    res.status(200).send("There is no subject yet")
                } else {
                    res.status(200).send(result)
                }
            })
        } catch (error) {
            res.status(403).send(error)
        }
    })
    // CREATE SUBJECT
    await router.post("/subject/create", (req, res) => {
        try {
            if (!req.body.pseudo_utilisateur || req.body.pseudo_utilisateur == "") throw "pseudo_utilisateur id is required"
            if (!req.body.contained || req.body.contained == "") throw "contained is required"
            if (!req.body.title_subject || req.body.title_subject == "") throw "title is required"
            if (!req.body.idCategorySubject || req.body.idCategorySubject == "") throw "subject category id is required"

            let todayDate = new Date().toISOString().slice(0, 10);

            let object = {
                pseudo_utilisateur: req.body.pseudo_utilisateur,
                date: todayDate,
                contenu: req.body.contained,
                title_subject: req.body.title_subject,
                id_catégories_sujet: req.body.idCategorySubject
            }

            con.query(`INSERT INTO sujet_forum SET ?`, object, (err, result) => {
                if (err) throw err;
                res.status(200).send("Subject well inserted");
            });
        } catch (error) {
            res.status(403).send(error)
        }
    });

    // CREATE A COMMENTARY
    await router.post("/subject/commentaries", (req, res) => {
        try {

            if (!req.body.idAuthor || req.body.idAuthor == "") throw "author id is required"
            if (!req.body.contained || req.body.contained == "") throw "contained is required"
            if (!req.body.idSubject || req.body.idSubject == "") throw "subject id is required"

            let todayDate = new Date().toISOString().slice(0, 10);
            let object = {
                id_auteur: req.body.idAuthor,
                date_commentaires: todayDate,
                contenu_commentaires: req.body.contained,
                id_sujet_forum: req.body.idSubject
            }

            con.query(`INSERT INTO commentaires SET ?`, object, (err, result) => {
                if (err) throw err;
                res.status(200).send("New commentary added")
            })

        } catch (error) {
            res.status(403).send(error)
        }
    });

    // DELETE A COMMENTARY
    await router.delete("/subject/:id_auteur/:idCommentary", (req, res) => {
        try {
            if (!req.params.id_auteur || req.params.id_auteur == "") throw "id_author is required"
            if (!req.params.idCommentary || req.params.idCommentary == "") throw "idCommentary is required"
            let object = {
                id_auteur: req.params.id_auteur
            }
            let objectTwo = {
                id: req.params.idCommentary
            }

            con.query(`DELETE FROM commentaires WHERE ? AND ?`, [object, objectTwo], (err, result) => {
                if (err) throw err;
                if (result.affectedRows == 1) {
                    res.status(200).send("USER COMMENTARY DELETED");
                } else {
                    res.status(403).send("THIS COMMENTARY DOES NOT EXIST")
                }

            });
        } catch (error) {
            res.status(403).send(error)
        }
    });

}

module.exports = forumRoutes;




