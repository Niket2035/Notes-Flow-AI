import { model, Schema } from "mongoose";

const UploadLectureSchema = new Schema(
  {
    fileUrl: String,
    transcript: String,
    summary: String,
    keyPhrases: [String],
  },
  { timestamps: true }
);

export default model("UploadLecture", UploadLectureSchema);
