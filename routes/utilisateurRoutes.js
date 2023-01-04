import express from "express";
import {
  incriptionProprietaire,
  authentification,
} from "../controllers/utilisateurController.js";
const router = express.Router();

router.route("/login").post(authentification);
router.route("/").post(incriptionProprietaire);

export default router;
