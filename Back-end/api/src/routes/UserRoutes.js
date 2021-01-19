const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const verif_token = require("../middleware/token");
const config = require("../modules/config")
const adminSql = require('../requestSql/RequestSql')
const userRoutes = async function (router, con) {
    //USERS ROUTES

    // GET USER INFO 
    await router.get("/user/:id", (req, res) => {
        try {
            let id = req.params.id
            // let sql = `SELECT * FROM utilisateurs WHERE id = '${id}';`;
            con.query(adminSql.getUserInfo(id), (err, result) => {
                if (err) throw err
                if (!result.length) {
                    throw "This user Id doesn't exist"
                } else {
                    res.status(200).send(result)
                }
            })
        } catch (error) {
            res.status(203).send(error)
        }
    });

    // ADD AN USER SIGNUP
    await router.post("/user/sign-up", (req, res) => {
        try {
            let admin = 0;
            let verif = `SELECT email FROM utilisateurs WHERE email = '${req.body.email}';`;
            con.query(verif, (err, result) => {
                if (err) throw err;
                if (result.length) {
                    res.status(200).send("This email is already in use");
                } else {
                    bcrypt.hash(req.body.password, saltRounds).then((hashPassword) => {
                        let sql = `INSERT INTO utilisateurs SET email = '${req.body.email}', prenom = '${req.body.prenom}', pseudo = '${req.body.pseudo}', password = '${hashPassword}', avatar = '${req.body.avatar}', administ = '${admin}';`;
                        con.query(sql, (err, result) => {
                            if (err) throw err;
                            res.status(200).send("users well inserted");
                        });
                    });
                }
            });
        }
        catch (error) {
            res.status(203).send(error)
        }
    });

    // LOGIN USER
    await router.post("/user/sign-in", (req, res) => {
        try {
            if (!req.body.password || req.body.password === "") {
                throw "Password is required"
            }
            if (!req.body.email || req.body.email === "") {
                throw "Email is required"

            }
            let password = req.body.password
            let sql = `SELECT * FROM utilisateurs WHERE email = '${req.body.email}';`;

            con.query(sql, (err, result) => {
                if (err) throw err;

                if (!result.length) {
                    res.status(403).send("Email  is incorrect");
                } else {
                    let token = jwt.sign(
                        {
                            id: result[0].id,
                            email: result[0].email,
                            password: result[0].password,
                        },
                        config.secret
                    );

                    bcrypt.compare(password, result[0].password).then((resp) => {
                        if (resp === true) {
                            res.status(200).send({ token, auth: true });
                        } else {
                            res.status(403).send("Password is incorrect");
                        }
                    });
                }
            });
        } catch (error) {
            res.status(203).send(error)
        }
    });

    // EDIT PROFIL USER
    await router.put("/user/edit", verif_token, (req, res) => {
        try {
            let prenom = req.body.prenom;
            let email = req.body.email;
            let password = req.body.password;
            let avatar = req.body.avatar;
            let pseudo = req.body.pseudo;
            let id = req.body.id;

            if (!req.body.prenom || req.body.email == "") throw "please provide prenom"
            if (!req.body.email || req.body.email == "") throw "please provide a email"
            if (!req.body.password || req.body.password == "") throw "please provide a password"
            if (!req.body.avatar || req.body.avatar == "") throw "please provide a avatar"
            if (!req.body.pseudo || req.body.pseudo == "") throw "please provide a pseudo"
            console.log('a');
            let check = `SELECT id FROM utilisateurs WHERE id = '${id}';`;
            con.query(check, (err, result) => {
                if (err) throw err;
                if (!result.length) {
                    throw "This profil doesn't exist"
                } else {
                    bcrypt.hash(password, saltRounds).then((hash) => {
                        let verif = `UPDATE utilisateurs SET prenom = '${prenom}',email = '${email}', password = '${hash}', avatar = '${avatar}', pseudo = '${pseudo}' WHERE utilisateurs.id = '${id}'`;
                        con.query(verif, (err, result) => {
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
            res.status(203).send(error)
        }
    });

    // DELETE USER ACCOUNT
    await router.delete("/user/:id", verif_token, (req, res) => {
        try {
            let id = req.params.id;

            let sql = `DELETE FROM utilisateurs WHERE utilisateurs.id = '${id}'`;
            con.query(sql, (err, result) => {
                if (err) throw err;
                else {
                    res.status(200).send("USER ACCOUNT DELETED");
                }

            });
        } catch (error) {
            res.status(203).send(error)
        }
    })

};

module.exports = userRoutes