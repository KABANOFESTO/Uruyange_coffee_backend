"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userService_1 = require("../services/userService");
const apiResponse_1 = require("../utils/apiResponse");
exports.userController = {
    createUser: async (req, res) => {
        const userData = req.body;
        try {
            const user = await userService_1.userService.createUser(userData);
            apiResponse_1.apiResponse.success(res, user, 201);
        }
        catch (error) {
            apiResponse_1.apiResponse.error(res, error.message, 400);
        }
    },
    getUser: async (req, res) => {
        const userId = req.params.id;
        try {
            const user = await userService_1.userService.getUserById(userId);
            if (!user) {
                apiResponse_1.apiResponse.error(res, 'User not found', 404);
                return;
            }
            apiResponse_1.apiResponse.success(res, user);
        }
        catch (error) {
            apiResponse_1.apiResponse.error(res, error.message, 400);
        }
    },
    getAllUsers: async (_req, res) => {
        try {
            const users = await userService_1.userService.getAllUsers();
            apiResponse_1.apiResponse.success(res, users);
        }
        catch (error) {
            apiResponse_1.apiResponse.error(res, error.message, 400);
        }
    },
    loginUser: async (req, res) => {
        const { email, password } = req.body;
        try {
            const { user, token } = await userService_1.userService.loginUser(email, password);
            apiResponse_1.apiResponse.success(res, { user, token });
        }
        catch (error) {
            apiResponse_1.apiResponse.error(res, error.message, 401);
        }
    },
};
//# sourceMappingURL=userController.js.map