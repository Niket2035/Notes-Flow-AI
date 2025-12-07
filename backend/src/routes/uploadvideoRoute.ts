import { Router } from "express";
import uploadVideoController from "../controllers/uploadvideocontroller";
import { upload } from "../middlewares/uploadvideo";

const router = Router();

router.post("/api/upload", upload.single("video"), uploadVideoController.uploadVideo);
router.get("/api/lecture/:id", uploadVideoController.getLecture);
router.post("/api/uploadlink", uploadVideoController.uploadLink);

export default router;