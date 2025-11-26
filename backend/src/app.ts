import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';

dotenv.config();

const app = express();
app.use(cors({
    origin: ["https://notes-flow-ai.vercel.app", "http://localhost:3000"],
    credentials: true
}));
app.use(express.json());

// Middleware to ensure DB is connected before handling requests
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database connection failed in middleware:", error);
        res.status(500).json({ error: "Database connection failed" });
    }
});



export default app;