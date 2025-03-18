import express from "express";
import coffeeController from "../controllers/coffeeController";

const router = express.Router();

router.post('/coffees', coffeeController.createCoffee);
router.get('/coffees', coffeeController.getCoffees);
router.delete('/coffees/:id', coffeeController.deleteCoffee);
router.put('/coffees/:id', coffeeController.updateCoffee);
router.get('/coffees/:id', coffeeController.getCoffeeById); 

export default router;