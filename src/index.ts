import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan'; // For HTTP request logging
import cors from 'cors'; // For Cross-Origin Resource Sharing
import dotenv from 'dotenv'; // For loading environment variables
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

// Create Express application
const app: Application = express();

// Middleware
app.use(express.json()); 
app.use(morgan('dev')); 
app.use(cors()); // Enable CORS

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes); 

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    //console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 3049;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
