import { Response } from 'express';

interface SuccessResponse {
    success: true;
    data: any;
}

interface ErrorResponse {
    success: false;
    message: string;
}

export const apiResponse = {
    success: (res: Response, data: any, status: number = 200): Response<SuccessResponse> =>
        res.status(status).json({ success: true, data }),

    error: (res: Response, message: string, status: number = 400): Response<ErrorResponse> =>
        res.status(status).json({ success: false, message }),
};
