import { UserService } from "../services/userService.js";

export class UserHandler {
    userService;
    constructor() {
        this.userService = new UserService();
    }

    async createUserPostHandler(req, res) {
        const { email, password, name } = req.body;
        if (!email || !password) {
            return res.status(400).json({code: 400, error: 'Email and password are required'});
        }
        try {
            const result = await this.userService.createUser(email, password, name);
            if (result.success == true) {
                return res.status(200).json({code: 200, message: result.message});
            }
            else {
                return res.status(400).json({code: 400, error: result.error});
            }
        } 
        catch (err) {
            return res.status(500).json({code: 500, error: 'Internal server error'});
        }
    }

    async userLoginPutHandler(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({code: 400, error: 'Email and password are required'});
        }
        try {
            const result = await this.userService.userLogin(email, password);
            if (result.success == true) {
                return res.status(200).json({code: 200, message: result.message});
            }
            else {
                return res.status(400).json({code: 400, error: result.error});
            }
        }
        catch (err) {
            return res.status(500).json({code: 500, error: 'Internal server error'});
        }
    }

    async deleteUserDeleteHandler(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({code: 400, error: 'Email and password are required'});
        }
        try {
            const result = await this.userService.deleteUser(email, password);
            if (result.success == true) {
                return res.status(200).json({code: 200, message: result.message});
            }
            else {
                return res.status(400).json({code: 400, error: result.error});
            }
        }
        catch (err) {
            return res.status(500).json({code: 500, error: 'Internal server error'});
        }
    }

    async changePasswordPutHandler(req, res) {
        const { email, oldPassword, newPassword } = req.body;
        if (!email || !oldPassword || !newPassword) {
            return res.status(400).json({code: 400, error: 'Email, old password, and new password are required'});
        }
        try {
            const result = await this.userService.changePassword(email, oldPassword, newPassword);
            if (result.success == true) {
                return res.status(200).json({code: 200, message: result.message});
            }
            else {
                return res.status(400).json({code: 400, error: result.error});
            }
        }
        catch (err) {
            return res.status(500).json({code: 500, error: 'Internal server error'});
        }
    }

    async updateNamePutHandler(req, res) {
        const { email, newName } = req.body;
        if (!email || !newName) {
            return res.status(400).json({code: 400, error: 'Email and new name are required'});
        }
        try {
            const result = await this.userService.updateName(email, newName);
            if (result.success == true) {
                return res.status(200).json({code: 200, message: result.message});
            }
            else {
                return res.status(400).json({code: 400, error: result.error});
            }
        }
        catch (err) {
            return res.status(500).json({code: 500, error: 'Internal server error'});
        }
    }

    async getNameGetHandler(req, res) {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({code: 400, error: 'Email is required'});
        } 
        try {
            const result = await this.userService.getName(email);
            if (result.success == true) {
                return res.status(200).json({code: 200, message: result.message, result: result.result});
            }
            else { 
                return res.status(400).json({code: 400, error: result.error});
            }
        }
        catch (err) {
            return res.status(500).json({code: 500, error: 'Internal server error'});
        }
    }
}