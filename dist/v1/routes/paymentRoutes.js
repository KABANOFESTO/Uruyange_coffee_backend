"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentController_1 = require("../controllers/paymentController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
router.post('/payments', authMiddleware_1.default, paymentController_1.paymentController.createPayment);
router.get('/payments', authMiddleware_1.default, paymentController_1.paymentController.getPayments);
exports.default = router;
//# sourceMappingURL=paymentRoutes.js.map