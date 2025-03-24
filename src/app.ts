import express, { NextFunction, Request, Response } from 'express';

import { config } from 'dotenv';
import route from './v1/routes';
import { connectToDB, disconnectFromDB } from './v1/config/database';
import cors from 'cors';

config();
const PORT = process.env.PORT || 7000;
const app = express();
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello World');
});

app.use(cors());
app.use((req, res, next) => {
    if (req.originalUrl === "/api/v1/webhook") {
      next();
    } else {
      express.json()(req, res, next);
    }
  });
app.use('/api/v1', route);



const startServer = async () => {
    try {
        await connectToDB();
        app.listen(PORT, () => {
            console.log("server started");
        });
    } catch (error) {
        console.log("failed to start server", error);
        process.exit(1);
    }

}
startServer().catch(console.error);

process.on('SIGINT', async () => {
    try {
        await disconnectFromDB();
        process.exit(0);
    } catch (error) {
        console.log("failed to disconnect from db", error);
        process.exit(1);
    }
});
export default app;




