import colors from "colors";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

import utilisateurRoutes from "./routes/utilisateurRoutes.js";
import moyenneDeTransportRoutes from "./routes/moyenneDeTransportRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();

// Init dotenv :
dotenv.config();

// Init Middlewares :
app.use(express.json({ extended: false }));

// Make the public folder as static folder :
const __dirname = path.resolve();
app.use("/public", express.static(path.join(__dirname, "/public")));

// Define Routes :
app.use("/api/utilisateurs", utilisateurRoutes);
app.use("/api/moyennesdetransports", moyenneDeTransportRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => res.send("API is running..."));

// Init Error Middlewares :
app.use(notFound);
app.use(errorHandler);

// Run server :
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
