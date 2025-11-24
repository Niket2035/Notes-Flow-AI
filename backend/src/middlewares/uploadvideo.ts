import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
    params: async (req, file) => {
        return {
            folder: "videos",
            resource_type: "video",
        };
    },
});

export const upload = multer({ storage });
