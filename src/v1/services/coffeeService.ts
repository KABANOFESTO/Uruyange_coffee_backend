import { PrismaClient } from '@prisma/client';
import CoffeeDTO from '../DTOs/coffeeDTO';

const prismaClient = new PrismaClient();

const coffeeService = {
    createCoffee: async (coffeeData: any): Promise<ReturnType<typeof CoffeeDTO.getCoffeeDTO>> => {
        const coffee = await prismaClient.coffee.create({ data: coffeeData });
        return CoffeeDTO.getCoffeeDTO(coffee);
    },

    getCoffees: async (): Promise<ReturnType<typeof CoffeeDTO.getCoffeeDTO>[]> => {
        const coffees = await prismaClient.coffee.findMany();
        return coffees.map(CoffeeDTO.getCoffeeDTO);
    },

    getCoffeeById: async (id: string): Promise<ReturnType<typeof CoffeeDTO.getCoffeeDTO> | null> => {
        const coffee = await prismaClient.coffee.findUnique({
            where: { id }
        });
        return coffee ? CoffeeDTO.getCoffeeDTO(coffee) : null;
    },

    deleteCoffee: async (id: string): Promise<void> => {
        await prismaClient.coffee.delete({ where: { id } });
    },

    updateCoffee: async (id: string, coffeeData: any): Promise<ReturnType<typeof CoffeeDTO.getCoffeeDTO>> => {
        const updatedCoffee = await prismaClient.coffee.update({
            where: { id },
            data: coffeeData
        });
        return CoffeeDTO.getCoffeeDTO(updatedCoffee);
    }
};

export default coffeeService;