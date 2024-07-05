import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan'; 
import cors from 'cors'; 
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import authRoutes from './routes/authRoutes';import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json()); 
app.use(morgan('dev')); 
app.use(cors()); 


const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'My API',
        version: '1.0.0',
      },
    },
    apis: ['./routes/*.js'], // Replace with the path to your API routes
  };
  
  const specs = swaggerJsdoc(options);


// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes); 
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    //console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 3049;
app.listen(PORT, () => {
    console.log(`Med Blog Server is running on http://localhost:${PORT}`);
});
