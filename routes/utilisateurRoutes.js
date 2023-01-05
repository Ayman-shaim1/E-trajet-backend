import express from "express";
import {
  authentification,
  incription,
} from "../controllers/utilisateurController.js";
const router = express.Router();

router.route("/").post(incription);
router.route("/login").post(authentification);

export default router;
