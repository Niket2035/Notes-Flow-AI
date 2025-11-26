import { Request, Response } from "express";
import uploadLecturemodel from "../models/uploadLecturemodel";
import axios from "axios";

const uploadVideo = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const videoUrl = (req.file as any).path;

    if (!process.env.ACTIVEPIECE_WEBHOOK) {
      console.error("ACTIVEPIECE_WEBHOOK environment variable is missing");
      return res
        .status(500)
        .json({ message: "Server configuration error: Webhook URL missing" });
    }

    const lecture = await uploadLecturemodel.create({
      videoUrl,
    });

    try {
      await axios.post(process.env.ACTIVEPIECE_WEBHOOK, {
        lectureId: lecture._id,
        videoUrl,
      });
    } catch (webhookError: any) {
      console.error(
        "ActivePieces Webhook Failed:",
        webhookError.response?.data || webhookError.message
      );
    }

    res.json({
      message: "Video uploaded and flow started",
      videoUrl,
      lectureId: lecture._id,
    });
  } catch (error: any) {
    console.error("Upload Controller Error:", error);
    res.status(500).json({ error: "Upload failed", details: error.message });
  }
};

export default { uploadVideo };
