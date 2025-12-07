import ytdl from "@distube/ytdl-core";
import cloudinary from "../config/cloudinary";

const extractYoutubeAudio = async (youtubeUrl: string): Promise<string> => {

  const audioStream = ytdl(youtubeUrl, {
    filter: "audioonly",
    quality: "highestaudio",
  });

  return new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "video",
        folder: "youtube-audio",
        format: "mp3",
      },
      (error, result) => {
        if (error) return reject(error);

        if (!result || !result.secure_url) {
          return reject(new Error("Cloudinary upload failed"));
        }

        resolve(result.secure_url);
      }
    );

    // CRITICAL: Handle errors on the source stream to prevent uncaught exceptions crashing the process
    audioStream.on('error', (err: any) => {
      reject(new Error(`YTDL Error: ${err.message}`));
    });

    audioStream.pipe(uploadStream);
  });
};

export default extractYoutubeAudio;
