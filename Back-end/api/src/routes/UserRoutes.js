const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const verif_token = require("../middleware/token");
const config = require("../modules/config")
// const adminSql = require('../requestSql/RequestSql')
const userRoutes = async function (router, con) {
    //USERS ROUTES

    // GET USER INFO 
    await router.get("/user/:id", (req, res) => {
        try {
            if (!req.params.id || req.params.id == "") throw "id is required"
            let object = {
                id: req.params.id
            }
            con.query(`SELECT * FROM utilisateurs WHERE ? `, object, (err, result) => {
                if (err) throw err
                if (!result.length) {
                    throw "This user Id doesn't exist"
                } else {
                    res.status(200).send(result)
                }
            })
        } catch (error) {
            res.status(403).send(error)
        }
    });

    // ADD AN USER SIGNUP
    await router.post("/user/sign-up", (req, res) => {
        try {
            if (!req.body.email || req.body.email == "") throw "email is required"
            if (!req.body.prenom || req.body.prenom == "") throw "prenom is required"
            if (!req.body.pseudo || req.body.pseudo == "") throw "pseudo is required"
            if (!req.body.password || req.body.password == "") throw "password is required"
            if (!req.body.avatar || req.body.avatar == "") throw "avatar is required"

            let objectEmail = {
                email: req.body.email
            }
            con.query(`SELECT email FROM utilisateurs WHERE ?`, objectEmail, (err, result) => {
                if (err) throw err;
                if (result.length) {
                    res.status(403).send("This email is already in use");
                } else {
                    con.query(`SELECT pseudo FROM utilisateurs WHERE ?`, objectPseudo, (err, result) => {
                        if (err) throw err;
                        if (result.length) {
                            res.status(403).send("This pseudo is already in use");
                        } else {
                            bcrypt.hash(req.body.password, saltRounds).then((hashPassword) => {

                                let object = {
                                    email: req.body.email,
                                    prenom: req.body.prenom,
                                    pseudo: req.body.pseudo,
                                    password: hashPassword,
                                    avatar: req.body.avatar,
                                    administ: 0
                                }

                                con.query(`INSERT INTO utilisateurs SET ?`, object, (err, result) => {
                                    if (err) throw err;
                                    res.status(200).send("users well inserted");
                                });
                            });
                        }
                    })
                }
            });
        }
        catch (error) {
            res.status(403).send(error)
        }
    });

    // LOGIN USER
    await router.post("/user/sign-in", (req, res) => {
        try {
            if (!req.body.password || req.body.password === "") throw "Password is required"
            if (!req.body.email || req.body.email === "") throw "Email is required"

            let objectEmail = {
                email: req.body.email
            }

            con.query(`SELECT * FROM utilisateurs WHERE ?`, objectEmail, (err, result) => {
                if (err) throw err;

                if (!result.length) {
                    res.status(403).send("Email  is incorrect");
                } else {
                    let token = jwt.sign(
                        {
                            id: result[0].id,
                            email: result[0].email,
                            password: result[0].password,
                            admin: result[0].administ,
                            pseudo: result[0].pseudo
                        },
                        config.secret
                    );

                    bcrypt.compare(req.body.password, result[0].password).then((resp) => {
                        if (resp === true) {
                            res.status(200).send({ token, auth: true });
                        } else {
                            res.status(403).send("Password is incorrect");
                        }
                    });
                }
            });
        } catch (error) {
            res.status(403).send(error)
        }
    });

    // EDIT PROFIL USER
    await router.put("/user/edit", verif_token, (req, res) => {
        try {
            if (!req.body.prenom || req.body.prenom == "") throw "please provide prenom"
            if (!req.body.email || req.body.email == "") throw "please provide a email"
            if (!req.body.password || req.body.password == "") throw "please provide a password"
            if (!req.body.avatar || req.body.avatar == "") throw "please provide a avatar"
            if (!req.body.pseudo || req.body.pseudo == "") throw "please provide a pseudo"

            let objectId = {
                id: req.body.id
            }
            con.query(`SELECT id FROM utilisateurs WHERE ?`, objectId, (err, result) => {
                if (err) throw err;
                if (!result.length) {
                    throw "This profil doesn't exist"
                } else {

                    bcrypt.hash(req.body.password, saltRounds).then((hashPassword) => {
                        let object = {
                            email: req.body.email,
                            prenom: req.body.prenom,
                            pseudo: req.body.pseudo,
                            password: hashPassword,
                            avatar: req.body.avatar,
                        }
                        con.query(`UPDATE utilisateurs SET ? WHERE ?`, [object, objectId], (err, result) => {
                            if (err) throw err;
                            else {
                                res.status(201).send("ALL OK");
                            }
                        });
                    });
                }
            });
        }
        catch (error) {
            res.status(403).send(error)
        }
    });

    // DELETE USER ACCOUNT
    await router.delete("/user/:id", verif_token, (req, res) => {
        try {
            if (!req.params.id || req.params.id == "") throw "id is required"
            let object = {
                id: req.params.id
            }
            con.query(`DELETE FROM utilisateurs WHERE ?`, object, (err, result) => {
                if (err) throw err;
                else {
                    res.status(200).send("USER ACCOUNT DELETED");
                }
            });
        } catch (error) {
            res.status(403).send(error)
        }
    })

};

module.exports = userRoutes