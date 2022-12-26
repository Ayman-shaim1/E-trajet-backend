import colors from "colors";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import path from "path";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();

// Init dotenv :
dotenv.config();

// Connect Database :
connectDB();
// Init Middlewares
app.use(express.json({ extended: false }));

// Make the uploads folder as static folder :
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Define Routes :
app.get("/", (req, res) => res.send("API is running..."));

// Init Error Middlewares :
app.use(notFound);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
