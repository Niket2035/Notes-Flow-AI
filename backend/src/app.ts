import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';

dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: ["https://notes-flow-ai.vercel.app", "http://localhost:3000"],
    credentials: true
}));
app.use(express.json());



export default app;