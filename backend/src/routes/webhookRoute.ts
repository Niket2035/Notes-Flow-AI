import { Router } from "express";
import webhookcontroller from "../controllers/webhookcontroller";

const router = Router();

router.post("/api/webhook", webhookcontroller.receiveSummary);

export default router;
