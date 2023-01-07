import express from "express";
import { getMoyennesDeTransports } from "../controllers/moyenneDeTransportController.js";
import {
  protect,
  passager,
  proprietaire,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, passager, getMoyennesDeTransports);

export default router;
