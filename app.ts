import 'dotenv/config';
import express from "express";
import App from './services/ExpressApp';
import dbConnection from './services/Database';

const StartServer = async () => {
	const app = express();

	await dbConnection();

	await App(app);

	app.listen( process.env.PORT || 8000, () => {
		console.log(`App is listening on port ${process.env.PORT}`);
	})
}

StartServer();

