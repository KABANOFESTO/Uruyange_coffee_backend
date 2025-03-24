"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = __importDefault(require("../controllers/messageController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
// Public route for creating messages
router.post('/messages', messageController_1.default.createMessage);
// Protected routes (require authentication)
router.get('/messages', authMiddleware_1.default, messageController_1.default.getAllMessages);
router.delete('/messages/:id', authMiddleware_1.default, messageController_1.default.deleteMessage);
exports.default = router;
//# sourceMappingURL=messageRoutes.js.map