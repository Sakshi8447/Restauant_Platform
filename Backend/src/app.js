import express, { urlencoded } from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();


// middlewares
app.use(express.json());
app.use(urlencoded({ extended: true }));


export { app };