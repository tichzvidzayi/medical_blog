const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Medical Blog API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], // Replace with your route files
};

const specs = swaggerJsdoc(options);

module.exports = specs;