/**
 * Configurações para habilitar Swagger no projeto.
 */
const swaggerDefinition = {
  info: {
    title: "Swagger API",
    description: "Shows how to configure a Node.js application with expressjs, swagger-ui-express to generate the Swagger UI and swagger-jsdoc to specify the endpoints implemented with expressjs via JSDoc comments."
  },
  servers: ["http://localhost:3000"]
}

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./routes/*.js"]
};

/**
  
 * @param {express} app
 */
const setup = app => app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

module.exports = setup;