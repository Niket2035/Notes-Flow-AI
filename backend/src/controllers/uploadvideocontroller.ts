import { Request, Response } from "express";
import uploadLecturemodel from "../models/uploadLecturemodel";

const uploadVideo = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const videoUrl = (req.file as any).path;

    const lecture = await uploadLecturemodel.create({
      videoUrl,
    });

    res.json({
      message: "Video uploaded successfully",
      videoUrl,
      lectureId: lecture._id,
    });
  } catch (error) {
    console.error("Upload Controller Error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
};

export default { uploadVideo };
