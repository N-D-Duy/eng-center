const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API Documentation for the project',
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Local server'
      },
      {
        url: 'http://165.232.161.56:8000',
        description: 'Production server'
      }
    ],
  },
  apis: ['./server/config/router/*.js'], // Đường dẫn đến file chứa các định nghĩa API
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;
