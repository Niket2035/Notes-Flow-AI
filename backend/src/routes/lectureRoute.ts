import { Router } from "express";
import lectureController from "../controllers/lectureController";

const router = Router();

router.get("/api/lecture/:id", lectureController.getLectureStatus);

export default router;
