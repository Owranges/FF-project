// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const express = require("express");
// const con = require("../database/database");
// let router = express.Router();
// const saltRounds = 10;
// const verif_token = require("../middleware/token");
// const config = require("../modules/config")

// //USERS ROUTES
// // GET USER INFO 

// router.get("/user/:id", (req, res) => {
//   try {
//     let id = req.params.id
//     let sql = `SELECT * FROM utilisateurs WHERE id = '${id}';`;
//     con.query(sql, (err, result) => {
//       if (err) throw err
//       if (!result.length) {
//         throw "This user Id doesn't exist"
//       } else {
//         res.status(200).send(result)
//       }
//     })
//   } catch (error) {
//     res.status(203).send(error)
//   }
// })
// // ADD AN USER SIGNUP
// router.post("/user/sign-up", (req, res) => {
//   try {
//     let admin = 0;
//     let verif = `SELECT email FROM utilisateurs WHERE email = '${req.body.email}';`;
//     con.query(verif, (err, result) => {
//       if (err) throw err;
//       if (result.length) {
//         res.status(200).send("This email is already in use");
//       } else {
//         bcrypt.hash(req.body.password, saltRounds).then((hashPassword) => {
//           let sql = `INSERT INTO utilisateurs (email, prenom, pseudo, password, avatar, administ) VALUES('${req.body.email}','${req.body.prenom}','${req.body.pseudo}','${hashPassword}','${req.body.avatar}','${admin}');`;
//           con.query(sql, (err, result) => {
//             if (err) throw err;
//             res.status(200).send("users well inserted");
//           });
//         });
//       }
//     });
//   }
//   catch (error) {
//     res.status(203).send(error)
//   }
// });

// // LOGIN USER
// router.post("/user/sign-in", (req, res) => {
//   try {
//     let password = req.body.password
//     let sql = `SELECT * FROM utilisateurs WHERE email = '${req.body.email}';`;
//     con.query(sql, (err, result) => {
//       if (err) throw err;

//       if (!result.length) {
//         res.status(200).send("Email or Password is incorrect");
//       } else {
//         let token = jwt.sign(
//           {
//             id: result[0].id,
//             email: result[0].email,
//             password: result[0].password,
//           },
//           config.secret
//         );

//         bcrypt.compare(password, result[0].password).then((resp) => {
//           if (resp === true) {
//             res.status(200).send({ token, auth: true });
//           } else {
//             res.status(200).send("Email or Password is incorrect");
//           }
//         });
//       }
//     });
//   } catch (error) {
//     res.status(203).send(error)
//   }
// });

// // EDIT PROFIL USER
// router.put("/user/edit", verif_token, (req, res) => {
//   try {
//     let prenom = req.body.prenom;
//     let email = req.body.email;
//     let password = req.body.password;
//     let avatar = req.body.avatar;
//     let pseudo = req.body.pseudo;
//     let id = req.body.id;

//     if (!req.body.prenom || req.body.email == "") throw "please provide prenom"
//     if (!req.body.email || req.body.email == "") throw "please provide a email"
//     if (!req.body.password || req.body.password == "") throw "please provide a password"
//     if (!req.body.avatar || req.body.avatar == "") throw "please provide a avatar"
//     if (!req.body.pseudo || req.body.pseudo == "") throw "please provide a pseudo"
//     console.log('a');
//     let check = `SELECT id FROM utilisateurs WHERE id = '${id}';`;
//     con.query(check, (err, result) => {
//       if (err) throw err;
//       if (!result.length) {
//         throw "This profil doesn't exist"
//       } else {
//         bcrypt.hash(password, saltRounds).then((hash) => {
//           let verif = `UPDATE utilisateurs SET prenom = '${prenom}',email = '${email}', password = '${hash}', avatar = '${avatar}', pseudo = '${pseudo}' WHERE utilisateurs.id = '${id}'`;
//           con.query(verif, (err, result) => {
//             if (err) throw err;
//             else {
//               res.status(200).send("ALL OK");
//             }
//           });
//         });
//       }
//     });
//   }
//   catch (error) {
//     res.status(203).send(error)
//   }
// });

// // DELETE USER ACCOUNT
// router.delete("/user/:id", verif_token, (req, res) => {
//   try {
//     let id = req.params.id;

//     let sql = `DELETE FROM utilisateurs WHERE utilisateurs.id = '${id}'`;
//     con.query(sql, (err, result) => {
//       if (err) throw err;
//       else {
//         res.status(200).send("USER ACCOUNT DELETED");
//       }

//     });
//   } catch (error) {
//     res.status(203).send(error)
//   }
// })

// // CREATE SUBJECT
// router.post("/subject/create", verif_token, (req, res) => {
//   try {
//     let id = req.body.id;
//     let contained = req.body.contained;
//     let idSubject = req.body.idCategorySubject;

//     let sql = `INSERT INTO sujet_forum (id_utilisateur, date, contenu, id_catégories_sujet) VALUES('${id}',NOW(),'${contained}','${idSubject}');`;
//     con.query(sql, (err, result) => {
//       if (err) throw err;
//       res.status(200).send("Subject well inserted");
//     });
//   } catch (error) {
//     res.status(203).send(error)
//   }
// });
// //CREATE CATEGORY SUBJECT
// router.post("/subject/category", verif_token, (req, res) => {
//   try {
//     if (!req.body.idAdmin) throw "please provide idAdmin"
//     if (!req.body.nom || req.body.nom == "") throw "please provide a nom"
//     let id = req.body.idAdmin;
//     let checkAdmin = `SELECT id,administ FROM utilisateurs WHERE id = '${id}';`;
//     con.query(checkAdmin, (err, result) => {
//       if (err) throw err;
//       else if (result[0].administ == 1) {
//         let sql = `INSERT INTO catégories_sujet (nom) VALUES('${req.body.nom}')`;

//         con.query(sql, (err, results) => {
//           if (err) throw err;
//           res.status(200).send("New category added")
//         })
//       } else {
//         res.status(200).send("Ur not an admin user")
//       }
//     })
//   } catch (error) {
//     res.status(203).send(error)
//   }
// });

// // CREATE A COMMENTARY
// router.post("/subject/commentaries", (req, res) => {
//   try {
//     let idAuthor = req.body.idAuthor;
//     let contained = req.body.contained;
//     let idSubject = req.body.idSubject;
//     // let idCategory = req.body.idCategory;

//     let sql = `INSERT INTO commentaires (id_auteur, date_commentaires, contenu_commentaires, id_sujet_forum) VALUES('${idAuthor}',NOW(),'${contained}','${idSubject}')`;
//     con.query(sql, (err, result) => {
//       if (err) throw err;
//       res.status(200).send("New commentary added")
//     })

//   } catch (error) {
//     res.status(203).send(error)
//   }
// });

// // DELETE A COMMENTARY
// router.delete("/subject/:id/:idCommentary", (req, res) => {
//   try {
//     let id = req.params.id;
//     let idCommentary = req.params.idCommentary;
//     let sql = `DELETE FROM commentaires WHERE commentaires.id_auteur = '${id}' AND id = '${idCommentary}'`;

//     con.query(sql, (err, result) => {
//       if (err) throw err;
//       if (result.length) {
//         res.status(200).send("USER COMMENTARY DELETED");
//       } else {
//         res.status(200).send("THIS COMMENTARY DOES NOT EXIST")
//       }

//     });
//   } catch (error) {
//     res.status(203).send(error)
//   }
// });

// module.exports = router;

