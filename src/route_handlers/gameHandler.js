import { GameService } from "../services/gameService.js";

export class GameHandler {
    gameService;
    constructor() {
        this.gameService = new GameService();
    }

    async getGameDataGetHandler(req, res) {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({error: 'Email is required'});
        } 
        try {
            const result = await this.gameService.getGameDataGetHandler(email);
            if (result.success == true) {
                return res.status(200).json({message: result.message, result: result.result});
            }
        }
        catch (err) {
            return res.status(500).json({error: 'Internal server error'});
        }
    }
    

    async updateGameDataPutHandler(req, res) {
        const { email, level, exp, currency } = req.body;
        if (!email || !level || !exp || !currency ) {
            return res.status(400).json({error: 'Email and data is required'});
        } 
        try {
            const result = await this.gameService.getNameGetHandler(email);
            if (result.success == true) {
                return res.status(200).json({message: result.message});
            }
            else {
                return res.status(400).json({error: result.error});
            }
        }
        catch (err) {
            return res.status(500).json({error: 'Internal server error'});
        }   
    }
}
