//express

import express from "express";

//dot env
import dotenv from 'dotenv';

//use .env file
dotenv.config();

//import router
import {router as userRoute} from './routes/user.js'

//create express route
const app = express();

//mongoose
import mongoose from "mongoose";

//connect to db
mongoose.connect(process.env.MONGO_URL, () => {

    console.log('connected to db')
});

//middleware to handle requests with json body
app.use(express.json());

//middleware to use user route
app.use('/', userRoute);


//listening to server
app.listen(3000, () => {

    console.log('Server listening on port 3000...')
})