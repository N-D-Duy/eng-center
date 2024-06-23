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
        url: process.env.NODE_ENV === 'production' ? 'http://165.232.161.56:8000' : 'http://localhost:8000',
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Local server',
      },
    ],
  },
  apis: ['./server/config/router/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;
