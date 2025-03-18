import { Request, Response } from 'express';
import coffeeService from '../services/coffeeService';

const coffeeController = {
    createCoffee: async (req: Request, res: Response): Promise<void> => {
        try {
            const coffeeData = req.body;
            const coffee = await coffeeService.createCoffee(coffeeData);
            res.status(201).json(coffee);
        } catch (error) {
            res.status(500).json({ message: 'Error creating coffee', error });
        }
    },

    getCoffees: async (req: Request, res: Response): Promise<void> => {
        try {
            const coffees = await coffeeService.getCoffees();
            res.status(200).json(coffees);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving coffees', error });
        }
    },

    getCoffeeById: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const coffee = await coffeeService.getCoffeeById(id);
            if (coffee) {
                res.status(200).json(coffee);
            } else {
                res.status(404).json({ message: 'Coffee not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving coffee', error });
        }
    },

    deleteCoffee: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            await coffeeService.deleteCoffee(id);
            res.status(200).json({ message: 'Coffee deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting coffee', error });
        }
    },

    updateCoffee: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const coffeeData = req.body;
            const updatedCoffee = await coffeeService.updateCoffee(id, coffeeData);
            res.status(200).json(updatedCoffee);
        } catch (error) {
            res.status(500).json({ message: 'Error updating coffee', error });
        }
    }
};

export default coffeeController;