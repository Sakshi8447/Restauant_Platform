import express, { urlencoded } from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();


// middlewares
app.use(express.json());
app.use(urlencoded({ extended: true }));


// adding a middleware to provide standard API error message
app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const success = false;
    res.status(statusCode).json(
        {success: false,
        statusCode,
        message,}
    );
    
})


export { app };