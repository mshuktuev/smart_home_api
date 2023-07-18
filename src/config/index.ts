import * as dotenv from 'dotenv';
dotenv.config();

export default {
	port: process.env.PORT,
	app: process.env.APP,
	env: process.env.NODE_ENV,
	secret: process.env.APP_SECRET,
	hostname: process.env.HOSTNAME,
	clientUrl: process.env.CLIENT_URL,
	db: {
		client: process.env.DB_CLIENT,
		database: process.env.DB_DATABASE,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
	},
	transporter: {
		service: process.env.TRANSPORTER_SERVICE,
		email: process.env.TRANSPORTER_EMAIL,
		password: process.env.TRANSPORTER_PASSWORD,
	},
	jwt: {
		access_token_secret: process.env.ACCESS_TOKEN_SECRET || '',
		access_token_expiration: process.env.ACCESS_TOKEN_EXPIRATION,
		refresh_token_secret: process.env.REFRESH_TOKEN_SECRET || '',
		refresh_token_expiration: process.env.REFRESH_TOKEN_EXPIRATION,
	},
};
