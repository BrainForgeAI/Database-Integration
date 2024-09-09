import dotenv from "dotenv";
import { dbConnect, doesUserExist } from "../utils/commonUtils.js";
import QUERY from "../utils/query.js";

export class GameService {
    db;
    
    constructor() {
        dotenv.config();
        this.db = dbConnect();
    }

    async getGameData(email) {
        try {
            const dataQuery = await this.db.query(QUERY.GET_GAME_DATA, [email]);
            var data = dataQuery[0][0];
            return { success: true, message: `Game data for account ${email}`, result: data};
        }
        catch (err) {
            throw err;
        }
    }

    async updateGameData(email, level=1, exp=0, currency=0) {
        try {
            // Check if email to load 
            if (await doesUserExist(email, this.db) != true) {
                return { success: false, error: 'Account for game data does not exist' };
            }
            else {
                await this.db.query(QUERY.UPDATE_GAME_DATA, [level, exp, currency, email]);
                return { success: true, message: `Game data for account ${email} has successfully been updated` };
            }
            }
        catch (err) {
            throw err;
        }
    }
}