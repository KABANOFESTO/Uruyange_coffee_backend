"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const coffeeDTO_1 = __importDefault(require("../DTOs/coffeeDTO"));
const prismaClient = new client_1.PrismaClient();
const coffeeService = {
    createCoffee: async (coffeeData) => {
        const coffee = await prismaClient.coffee.create({ data: coffeeData });
        return coffeeDTO_1.default.getCoffeeDTO(coffee);
    },
    getCoffees: async () => {
        const coffees = await prismaClient.coffee.findMany();
        return coffees.map(coffeeDTO_1.default.getCoffeeDTO);
    },
    getCoffeeById: async (id) => {
        const coffee = await prismaClient.coffee.findUnique({
            where: { id }
        });
        return coffee ? coffeeDTO_1.default.getCoffeeDTO(coffee) : null;
    },
    deleteCoffee: async (id) => {
        await prismaClient.coffee.delete({ where: { id } });
    },
    updateCoffee: async (id, coffeeData) => {
        const updatedCoffee = await prismaClient.coffee.update({
            where: { id },
            data: coffeeData
        });
        return coffeeDTO_1.default.getCoffeeDTO(updatedCoffee);
    }
};
exports.default = coffeeService;
//# sourceMappingURL=coffeeService.js.map