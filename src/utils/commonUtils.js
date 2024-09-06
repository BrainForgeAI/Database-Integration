import mysql from "mysql2";
import bcrypt from "bcrypt";

export function dbConnect() {
        // Create connection to database
        var response = true;
        const db = mysql.createPool({
            host: process.env.HOST,
            port: process.env.PORT_NUMBER,
            user: process.env.USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB,
        }).promise();
        // Test connection to the database
        try {
            this.connection = db.getConnection();
        } catch (err) {
            response = false;
        }
        return db;
}

export async function doesUserExist(email, db) {
    // If email exists, return true else return false
    var response = true;
    const emailQuery = await db.query(`select exists(select * from users where users.email=?)`, [email]);
    const emailExists = Object.entries(emailQuery[0][0])[0][1];
    if (emailExists == 0) {
        response = false;
    }
    return response;
}

export async function passwordMatch(email, password, db) {
    // Check if password matches
    var response = true;
    const query = await db.query(`select password from users where email=?`, email);
    const dbPassword = Object.entries(query[0][0])[0][1];
    const isMatch = await bcrypt.compare(password, dbPassword);
    if (isMatch == false) {
        response = false;
    }
    return response;
}

