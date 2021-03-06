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
                id: req.params.id
            }
            con.query('SELECT *FROM sujet_forum WHERE ?', object, (err, result) => {
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
            con.query(`SELECT sujet_forum.id, sujet_forum.date, sujet_forum.id_utilisateur, title_subject, utilisateurs.administ, utilisateurs.pseudo 
            FROM sujet_forum 
            INNER JOIN utilisateurs 
            ON sujet_forum.id_utilisateur  = utilisateurs.id
            WHERE sujet_forum.id_utilisateur = utilisateurs.id `, (err, result) => {
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
    await router.post("/subject/create", verif_token, (req, res) => {
        try {
            if (!req.body.id || req.body.id == "") throw "id_utilisateur is required"
            if (!req.body.contained || req.body.contained == "") throw "contained is required"
            if (!req.body.title_subject || req.body.title_subject == "") throw "title is required"
            if (!req.body.idCategorySubject || req.body.idCategorySubject == "") throw "subject category id is required"



            let object = {
                id_utilisateur: req.body.id,
                date: req.body.date,
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
    await router.post("/subject/commentaries", verif_token, (req, res) => {
        try {
            if (!req.body.id_auteur || req.body.id_auteur == "") throw "_auteur id is required"
            if (!req.body.contained || req.body.contained == "") throw "contained is required"
            if (!req.body.id_sujet_forum || req.body.id_sujet_forum == "") throw "subject id is required"


            let object = {
                id_auteur: req.body.id_auteur,
                date_commentaires: req.body.date_commentaires,
                contenu_commentaires: req.body.contained,
                id_sujet_forum: req.body.id_sujet_forum
            }

            con.query(`INSERT INTO commentaires SET ?`, object, (err, result) => {

                if (err) throw err;
                res.status(200).send("New commentary added")
            })

        } catch (error) {
            res.status(403).send(error)
        }
    });


    // GET COMMENTARY OF A SUBJECT 

    await router.get("/subject/:id/commentaries", (req, res) => {
        try {
            con.query(`SELECT commentaires.id,contenu_commentaires, date_commentaires, id_auteur, avatar, pseudo
            FROM commentaires
            INNER JOIN sujet_forum
            ON commentaires.id_sujet_forum = sujet_forum.id
            INNER JOIN utilisateurs
            ON utilisateurs.id = id_auteur
            WHERE commentaires.id_sujet_forum = ?
            `, req.params.id, (err, result) => {
                if (err) throw err;
                res.status(200).send(result)
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




