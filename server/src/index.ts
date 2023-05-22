import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './db/conn.js';
import { host, port } from './config.js';
import { userRouter } from './routes/user.router.js';
import cors from 'cors';

dotenv.config();

const app: Express = express();

app.use(cors())

app.use('/user', userRouter)



app.get('/', async (req: Request, res: Response) => {
    res.send("Server is alive and healthy");
});

app.listen(port, async () => {
    console.log(`⚡️[server]: Server is running at ${host}:${port}`);
    console.log("connecting to database...");
    try {
        await connectToDatabase();
        console.log("connected to database");
    }
    catch (err) {
        console.log("error connecting to database");
        console.log(err);
    }
});