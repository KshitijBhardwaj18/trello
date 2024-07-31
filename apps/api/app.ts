import express, { Request, Response } from 'express';
import connectDB from './config/db';
import cors from 'cors';
import dotenv from 'dotenv';



dotenv.config();

const app = express();

connectDB();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ msg: 'Server is running' });
});



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
