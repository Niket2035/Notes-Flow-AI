import { Request, Response } from "express";
import uploadLecturemodel from "../models/uploadLecturemodel";

const receiveSummary = async (req: Request, res: Response) => {
  try {
    const {
      lectureId,
      transcript,
      summary,
      bullet_points,
      important_points,
      chapters,
    } = req.body;

    await uploadLecturemodel.findByIdAndUpdate(lectureId, {
      transcript,
      summary,
      bulletPoints: bullet_points,
      importantPoints: important_points,
      chapters,
    });

    res.json({ message: "Summary saved successfully" });
  } catch (error) {
    console.error("Webhook Error:", error);
    res.status(500).json({ error: "Webhook failure" });
  }
};

export default { receiveSummary };
