import { Request, Response } from "express";
import uploadLecturemodel from "../models/uploadLecturemodel";

const getLectureStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const lecture = await uploadLecturemodel.findById(id);

        if (!lecture) {
            return res.status(404).json({ message: "Lecture not found" });
        }

        res.json(lecture);
    } catch (error) {
        console.error("Get Lecture Error:", error);
        res.status(500).json({ error: "Failed to fetch lecture status" });
    }
};

export default { getLectureStatus };
