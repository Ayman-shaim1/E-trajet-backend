import express from "express";
import { contact } from "../controllers/contactController.js";
const router = express.Router();

router.route("/").post(contact);

export default router;
