"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CoffeeDTO = {
    createCoffeeDTO: (coffee) => ({
        image: coffee.image,
        title: coffee.title,
        description: coffee.description,
        price: coffee.price,
        userId: coffee.userId,
    }),
    getCoffeeDTO: (coffee) => ({
        id: coffee.id,
        image: coffee.image,
        title: coffee.title,
        description: coffee.description,
        price: coffee.price,
        createdAt: coffee.createdAt,
    }),
};
exports.default = CoffeeDTO;
//# sourceMappingURL=coffeeDTO.js.map