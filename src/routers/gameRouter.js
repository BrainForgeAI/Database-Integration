import express from 'express';
import { GameHandler } from '../route_handlers/gameHandler.js';
const router = express.Router();
const gameHandler = new GameHandler();

router.get('/getData', async (req, res) => await gameHandler.getGameDataGetHandler(req,res));

router.put('/updateData', async (req, res) => await gameHandler.updateGameDataPutHandler(req,res));

export default router;