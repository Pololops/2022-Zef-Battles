import path from 'path';
import { fileURLToPath } from 'url';
import expressJSDocSwagger from 'express-jsdoc-swagger';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
	info: {
		version: '1.0.0',
		title: "Zef's Battle",
		description: 'Open battles game API',
		license: {
			name: 'MIT',
		},
	},
	description: 'API documentation of the Zef\'s Battle Project',
	security: {
		BearerAuth: {
			type: 'http',
			scheme: 'bearer',
			bearerFormat: 'JWT',
		},
	},
	baseDir: __dirname,
	// Analyse de tous les fichiers du projet pour y parser la JSDoc nécessaire à swagger
	filesPattern: ['../routers/**/*.js', '../errors/*.js', '../models/*.js'],
	// URL où sera disponible la page de documentation Swagger OpenAPI
	swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE,
	// Activation de la documentation à travers une route de l'API
	exposeApiDocs: true,
	apiDocsPath: '/api-docs',

	// You can customize your UI options.
	// you can extend swagger-ui-express config. You can checkout an example of this
	// in the `example/configuration/swaggerOptions.js`
	swaggerUiOptions: {},
};

// Execution de la fonction expressJSDocSwagger qui utilise les paramètres listés au dessus,
// et qui prend en paramètre : 'app' (notre application Express).
/**
 * Swagger middleware factory
 * @param {object} app Express application
 * @returns {object} Express JSDoc Swagger middleware that create web documentation
 */
export default (app) => expressJSDocSwagger(app)(options);
