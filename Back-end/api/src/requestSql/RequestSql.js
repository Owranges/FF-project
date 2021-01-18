class adminSql {
    // Static allow to access to properties/method without instance them
    static getUserInfo(id) {
        return `SELECT * FROM utilisateurs WHERE id = '${id}';`;
    }
    // static signIn(name) {
    //     return `SELECT * FROM admin where name ='${name}';`;
    // }
    // static createAdmins = `INSERT Ignore INTO admin (id, name, is_super_admin, password, email, url) VALUES (?)`
    // static updateEmail(email, specify) {
    //     return `UPDATE admin SET email = "${specify}"  WHERE email = "${email}"
    //     `
    // }
}
module.exports = adminSql;