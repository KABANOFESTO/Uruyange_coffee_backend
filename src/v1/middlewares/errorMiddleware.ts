import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
    status?: number;
}

module.exports = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
};