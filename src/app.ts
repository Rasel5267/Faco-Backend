import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import { MONGO_URI } from "./config";
import { AdminRoute, VendorRoute } from './routes';

const app = express();
app.use(express.json());

const URL = process.env.MONGODB_URL;
mongoose.connect(MONGO_URI).then(result => {
	if(result){
		console.log('DB Connected')
	}
}).catch(err => console.log('error' + err));


app.use('/admin', AdminRoute);
app.use('/vendor', VendorRoute);



app.listen( process.env.PORT || 8000, () => {
	console.log(`App is listening on port ${process.env.PORT}`);
})
