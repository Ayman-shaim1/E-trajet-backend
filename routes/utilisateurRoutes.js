import express from "express";
import { incriptionProprietaire } from "../controllers/utilisateurController.js";
const router = express.Router();
router.route("/").post(incriptionProprietaire);
export default router;
