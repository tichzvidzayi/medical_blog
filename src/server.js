const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const { poolConnection } = require('./utils/database');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerdocs/swagger.json');

dotenv.config();
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(morgan('dev')); // HTTP request logger
app.use(cors()); // Enable CORS
// Routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/posts', postRoutes); // Post routes
app.use('/api/auth', authRoutes); // Authentication routes

// Serve the Swagger UI at the '/docs' endpoint
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
poolConnection
    .query('SELECT 1')
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error(error.stack);
        // res.status(500).json({ error: 'Internal server error' });
    });
