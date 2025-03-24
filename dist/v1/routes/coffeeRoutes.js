"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const coffeeController_1 = __importDefault(require("../controllers/coffeeController"));
const router = express_1.default.Router();
router.post('/coffees', coffeeController_1.default.createCoffee);
router.get('/coffees', coffeeController_1.default.getCoffees);
router.delete('/coffees/:id', coffeeController_1.default.deleteCoffee);
router.put('/coffees/:id', coffeeController_1.default.updateCoffee);
router.get('/coffees/:id', coffeeController_1.default.getCoffeeById);
exports.default = router;
//# sourceMappingURL=coffeeRoutes.js.map