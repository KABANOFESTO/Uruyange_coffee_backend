"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subscriptionController_1 = __importDefault(require("../controllers/subscriptionController"));
const router = express_1.default.Router();
router.post('/subscriptions', subscriptionController_1.default.createSubscription);
router.get('/subscriptions', subscriptionController_1.default.getSubscriptions);
router.delete('/subscriptions/:id', subscriptionController_1.default.deleteSubscription);
router.put('/subscriptions/:id', subscriptionController_1.default.updateSubscription);
exports.default = router;
//# sourceMappingURL=subscriptionRoutes.js.map