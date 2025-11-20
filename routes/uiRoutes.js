import express from "express";
import { renderDashboard, renderStats } from "../controllers/uiController.js";

const router = express.Router();

router.get("/", renderDashboard);
router.get("/stats/:code", renderStats);

export default router;
