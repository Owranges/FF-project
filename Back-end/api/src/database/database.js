const mysql = require("mysql2");
// require("dotenv").config();

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "finalproject",
    port: 3306,
    multipleStatements: true
});

// FUNCTION TO CREATE TABLE IF NOT EXISTS
function createTableUser() {
    const myTable = `CREATE TABLE IF NOT EXISTS utilisateurs(
        id int PRIMARY KEY auto_increment,
        email VARCHAR(255)NOT NULL,
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
        id_catégories_sujet INT NOT NULL,
        FOREIGN KEY (id_catégories_sujet) REFERENCES catégories_sujet(id)
    )`;

    connection.query(myTable, (err, results, fields) => {
        if (err) throw err;

    });
}
function createTableCategorySubject() {

    const myTable = `CREATE TABLE IF NOT EXISTS catégories_sujet(
        id INT PRIMARY KEY AUTO_INCREMENT,
        nom VARCHAR(255) NOT NULL
    )`;
    connection.query(myTable, (err, results, fields) => {
        if (err) throw err;

    });
}
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
    createTableCategorySubject();
    createTableCommentaries();
    createTableArticlesAdmin();
    createTableImageArticles();
});

module.exports = connection
