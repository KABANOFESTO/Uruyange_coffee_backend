import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
    user: {
        role: string;
    };
}

module.exports = (role: string) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};