export interface Coffee {
    id?: string;
    image: string;
    title: string;
    description: string;
    price: number;
    userId?: string;
    createdAt?: Date;
}

const CoffeeDTO = {
    createCoffeeDTO: (coffee: Coffee) => ({
        image: coffee.image,
        title: coffee.title,
        description: coffee.description,
        price: coffee.price,
        userId: coffee.userId,
    }),
    getCoffeeDTO: (coffee: Coffee) => ({
        id: coffee.id,
        image: coffee.image,
        title: coffee.title,
        description: coffee.description,
        price: coffee.price,
        createdAt: coffee.createdAt,
    }),
};

export default CoffeeDTO;