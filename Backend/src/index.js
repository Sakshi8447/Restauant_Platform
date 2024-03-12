// create an express server
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./db/index.js";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

// Connect the DB 
connectDB();

// testing the home route
app.get('/', (req, res) => {
    res.status(200).send("Successfully connected");
})

app.listen(port, () => {
    console.log(`Server is Listening on port ${port}`);
})