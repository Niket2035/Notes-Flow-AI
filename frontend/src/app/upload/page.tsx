"use client";
import { useState } from "react";
import UploadForm from "./UploadForm";
import LinkUpload from "./Link";
import LiveRecord from "./LiveRecord";

export default function UploadPage() {
    const [uploadMode, setUploadMode] = useState<"video" | "link" | "record">("video");

    return (
        <div className="w-full max-w-3xl bg-black/40 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/10">
            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => setUploadMode("video")}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${uploadMode === "video"
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                        : "bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                        }`}
                >
                    Upload Video
                </button>
                <button
                    onClick={() => setUploadMode("link")}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${uploadMode === "link"
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                        : "bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                        }`}
                >
                    Through Link
                </button>
                <button
                    onClick={() => setUploadMode("record")}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${uploadMode === "record"
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                        : "bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                        }`}
                >
                    Live Record
                </button>
            </div>

            <div className="transition-all duration-300 ease-in-out">
                {uploadMode === "video" && <UploadForm />}
                {uploadMode === "link" && <LinkUpload />}
                {uploadMode === "record" && <LiveRecord />}
            </div>
        </div>

    );
}
