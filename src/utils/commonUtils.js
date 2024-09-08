import mysql from "mysql2";
import bcrypt from "bcrypt";
import QUERY from  "./query.js"

export function dbConnect() {
        // Create connection to database
        const db = mysql.createPool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        }).promise();
        // Test connection to the database
        try {
            this.connection = db.getConnection();
        } catch (err) {
            throw err;
        }
        return db;
}

export async function doesUserExist(email, db) {
    // If email exists, return true else return false
    var response = true;
    const emailQuery = await db.query(QUERY.EMAIL_EXISTS, [email]);
    const emailExists = Object.entries(emailQuery[0][0])[0][1];
    if (emailExists == 0) {
        response = false;
    }
    return response;
}

export async function passwordMatch(email, password, db) {
    // Check if password matches
    var response = true;
    const query = await db.query(QUERY.PASSWORD_MATCH, email);
    const dbPassword = Object.entries(query[0][0])[0][1];
    const isMatch = await bcrypt.compare(password, dbPassword);
    if (isMatch == false) {
        response = false;
    }
    return response;
}

