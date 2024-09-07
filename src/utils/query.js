const QUERY = {
    EMAIL_EXISTS: `SELECT EXISTS(SELECT * FROM users WHERE users.email=?)`,
    PASSWORD_MATCH: `SELECT password FROM users WHERE email=?`,
    GET_GAME_DATA: `SELECT level, exp, currency FROM gameData WHERE email=?`,
    UPDATE_GAME_DATA: `UPDATE gameData SET level=?, exp=?, currency=? WHERE email=?`,
    CREATE_USER: `INSERT INTO users (email, password, name, accountCreationDate) VALUES (?, ?, ?, NOW())`,
    LOGIN: `UPDATE gameData SET lastLogin = NOW() WHERE email=?`,
    DELETE_USER: 'DELETE FROM users WHERE email=?',
    CHANGE_PASSWORD: `UPDATE users SET password=? WHERE email=?`,
    UPDATE_NAME: `UPDATE users SET name=? WHERE email=?`,
    GET_NAME: `SELECT name FROM users WHERE email=?`
};

export default QUERY;