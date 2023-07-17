import config from '@/config';
import routes from '@/routes';
// const errorHandler = require('@/middlewares/error-handler')
import express from 'express';

const bodyParser = require('body-parser');
// const multer = require('multer');
// const cors = require('cors');
// const helmet = require('helmet');

const app = express();

/**
 * Security
 */
// app.use(cors());
// app.use(helmet());

/**
 * Request middleware's
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(multer({ dest: 'uploads/' }).any());

/**
 * Routing
 */
app.use('/api', routes);
// app.use(errorHandler.handleNotFound);
// app.use(errorHandler.handleError);

/**
 * Export
 */
export const start = () => {
	app.listen(config.port, async (err?: Error) => {
		if (err) {
			console.error(`Error : ${err}`);
			process.exit(-1);
		}

		console.log(`${config.app} is running on ${config.port}`);
	});
};

export default app;
