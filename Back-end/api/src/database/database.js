const mysql = require("mysql2");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: process.env.REACT_APP_DB_PWD,
    database: process.env.REACT_APP_DB_NAME,
    port: 3306,
    multipleStatements: true
});

// FUNCTION TO CREATE TABLE IF NOT EXISTS
function createTableUser() {
    const myTable = `CREATE TABLE IF NOT EXISTS utilisateurs(
        id int PRIMARY KEY auto_increment,
        email VARCHAR(50)UNIQUE NOT NULL,
        prenom VARCHAR(255)NOT NULL,
        pseudo VARCHAR(255)NOT NULL,
        password VARCHAR(255)NOT NULL,
        avatar VARCHAR(255)NOT NULL,
        administ BOOLEAN
    )`;

    connection.query(myTable, (err, results, fields) => {
        if (err) throw err;

    });
}
function createTableSubjetForum() {
    const myTable = `CREATE TABLE IF NOT EXISTS sujet_forum(
        id INT PRIMARY KEY AUTO_INCREMENT,
        id_utilisateur INT NOT NULL,
        FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id),
        date DATE NOT NULL,
        contenu TEXT(1000),
        title_subject VARCHAR(50),
        id_catégories_sujet INT NOT NULL,
        FOREIGN KEY (id_catégories_sujet) REFERENCES catégories_sujet(id)
    )`;

    connection.query(myTable, (err, results, fields) => {
        if (err) throw err;

    });
}
// function createTableCategorySubject() {

//     const myTable = `CREATE TABLE IF NOT EXISTS catégories_sujet(
//         id INT PRIMARY KEY AUTO_INCREMENT,
//         nom VARCHAR(255) NOT NULL
//     )`;
//     connection.query(myTable, (err, results, fields) => {
//         if (err) throw err;

//     });
// }
function createTableCommentaries() {
    const myTable = `CREATE TABLE IF NOT EXISTS commentaires(
        id INT PRIMARY KEY AUTO_INCREMENT,
        id_auteur INT NOT NULL,
        FOREIGN KEY (id_auteur) REFERENCES utilisateurs(id),
        date_commentaires DATE NOT NULL,
        contenu_commentaires TEXT(1000),
        id_sujet_forum INT NOT NULL,
        FOREIGN KEY (id_sujet_forum) REFERENCES sujet_forum(id)
    )`;

    connection.query(myTable, (err, results, fields) => {
        if (err) throw err;

    });
}
function createTableArticlesAdmin() {

    const myTable = `CREATE TABLE IF NOT EXISTS articles_admin(
        id INT PRIMARY KEY AUTO_INCREMENT,
        date_article DATE NOT NULL,
        contenu_article TEXT(5000)
    )`;

    connection.query(myTable, (err, results, fields) => {
        if (err) throw err;

    });
}
function createTableImageArticles() {

    const myTable = `CREATE TABLE IF NOT EXISTS image_articles(
        id INT PRIMARY KEY AUTO_INCREMENT,
        id_article_admin INT,
        FOREIGN KEY (id_article_admin) REFERENCES articles_admin(id),
        image VARCHAR(250) NOT NULL
    )`;

    connection.query(myTable, (err, results, fields) => {
        if (err) throw err;

    });
}
connection.connect((err) => {
    if (err) throw err;
    console.log("Well connected");
    createTableUser();
    createTableSubjetForum();
    // createTableCategorySubject();
    createTableCommentaries();
    createTableArticlesAdmin();
    createTableImageArticles();
});

//Create Admin
let password = process.env.REACT_APP_ADMIN_PASSWORD
let email = process.env.REACT_APP_ADMIN_EMAIL
let prenom = process.env.REACT_APP_ADMIN_PRENOM
let pseudo = process.env.REACT_APP_ADMIN_PSEUDO

let avatar = process.env.REACT_APP_ADMIN_AVATAR
let administ = 1


bcrypt.hash(password, saltRounds).then((hashPassword) => {

    password = hashPassword

    connection.query(`INSERT IGNORE INTO utilisateurs (email, prenom, pseudo, password, avatar, administ) VALUES ('${email}','${prenom}','${pseudo}','${password}','${avatar}','${administ}')`, (err, result) => {
        console.log('admin not created');
        if (err) throw err;
    });
});

module.exports = connection


