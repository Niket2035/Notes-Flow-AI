import { Request, Response } from "express";
import ytdl from "@distube/ytdl-core";
import uploadLecturemodel from "../models/uploadLecturemodel";
import axios from "axios";

const uploadVideo = async (req: Request, res: Response) => {
  try {
    let videoUrl: string;

    if (req.file) {
      videoUrl = (req.file as any).path;
    } else {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!process.env.ACTIVEPIECE_WEBHOOK) {
      return res.status(500).json({ message: "Webhook URL missing" });
    }

    const lecture = await uploadLecturemodel.create({
      videoUrl,
    });

    try {
      await axios.post(process.env.ACTIVEPIECE_WEBHOOK, {
        lectureId: lecture._id,
        token: "upload",
        videoUrl: videoUrl,
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

const getLecture = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const lecture = await uploadLecturemodel.findById(id);

    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    res.json(lecture);
  } catch (error: any) {
    console.error("Get Lecture Error:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch lecture", details: error.message });
  }
};

const uploadLink = async (req: Request, res: Response) => {
  const { videoUrl } = req.body;

  if (!videoUrl) {
    return res.status(400).json({ message: "No link provided" });
  }

  const lecture = await uploadLecturemodel.create({
    videoUrl,
  });

  await axios.post(process.env.ACTIVEPIECE_WEBHOOK!, {
    lectureId: lecture._id,
    token: "youtube",
    youtubeUrl: videoUrl,
  });

  res.json({
    message: "YouTube link submitted",
    lectureId: lecture._id,
  });
};

export default { uploadVideo, getLecture, uploadLink };
