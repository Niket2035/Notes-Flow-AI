import { model, Schema } from "mongoose";

const UploadLectureSchema = new Schema(
  {
    videoUrl: { type: String },
    transcript: { type: String },
    summary: { type: String },
    bulletPoints: [String],
    importantPoints: [String],
    chapters: { type: Array },
  },
  { timestamps: true }
);

export default model("UploadLecture", UploadLectureSchema);
