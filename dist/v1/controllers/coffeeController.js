"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coffeeService_1 = __importDefault(require("../services/coffeeService"));
const coffeeController = {
    createCoffee: async (req, res) => {
        try {
            const coffeeData = req.body;
            const coffee = await coffeeService_1.default.createCoffee(coffeeData);
            res.status(201).json(coffee);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating coffee', error });
        }
    },
    getCoffees: async (req, res) => {
        try {
            const coffees = await coffeeService_1.default.getCoffees();
            res.status(200).json(coffees);
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving coffees', error });
        }
    },
    getCoffeeById: async (req, res) => {
        try {
            const { id } = req.params;
            const coffee = await coffeeService_1.default.getCoffeeById(id);
            if (coffee) {
                res.status(200).json(coffee);
            }
            else {
                res.status(404).json({ message: 'Coffee not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving coffee', error });
        }
    },
    deleteCoffee: async (req, res) => {
        try {
            const { id } = req.params;
            await coffeeService_1.default.deleteCoffee(id);
            res.status(200).json({ message: 'Coffee deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ message: 'Error deleting coffee', error });
        }
    },
    updateCoffee: async (req, res) => {
        try {
            const { id } = req.params;
            const coffeeData = req.body;
            const updatedCoffee = await coffeeService_1.default.updateCoffee(id, coffeeData);
            res.status(200).json(updatedCoffee);
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating coffee', error });
        }
    }
};
exports.default = coffeeController;
//# sourceMappingURL=coffeeController.js.map