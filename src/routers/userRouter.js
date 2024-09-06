import express from 'express';
import { UserHandler } from '../route_handlers/userHandler.js';
const router = express.Router();
const userHandler = new UserHandler();

router.post('/createAccount', async (req, res) => await userHandler.createUserPostHandler(req,res));

router.put('/login', async (req, res) => await userHandler.userLoginPutHandler(req,res));

router.delete('/deleteAccount', async (req, res) => await userHandler.deleteUserDeleteHandler(req,res));

router.put('/changePassword', async (req, res) => await userHandler.changePasswordPutHandler(req,res));

router.put('/updateName', async (req, res) => await userHandler.updateNamePutHandler(req,res));

router.get('/getName', async (req, res) => await userHandler.getNameGetHandler(req,res));

export default router;