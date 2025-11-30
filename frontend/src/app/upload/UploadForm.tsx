"use client";
import { useState } from "react";
import SummaryBox from "@/app/component/box/summeryBox";
import { UploadCloud, Loader2 } from "lucide-react";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [lectureData, setLectureData] = useState<any | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    setIsUploading(true);

    const form = new FormData();
    form.append("video", file);

    const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
    const res = await fetch(`${apiUrl}/api/upload`, {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      console.log("File uploaded successfully");
    }

    const data = await res.json();

    if (data.lectureId) {
      setLectureData("generating Notes... This may take a few minutes.");
      pollForNotes(data.lectureId);
    } else {
      setLectureData(data);
    }

    console.log("Flow started:", data);
  };

  const pollForNotes = async (lectureId: string) => {
    const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
    const intervalId = setInterval(async () => {
      try {
        const res = await fetch(`${apiUrl}/api/lecture/${lectureId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.summary) {
            setLectureData(data);
            setIsUploading(false);
            clearInterval(intervalId);
          }
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    }, 3000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full">
      <label
        className={`flex flex-col items-center justify-center w-full p-12 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 group
            ${isDragging
            ? "border-indigo-500 bg-indigo-500/10 scale-[1.02]"
            : "border-gray-700 hover:border-indigo-500 hover:bg-gray-800/50"
          }
            ${file ? "bg-indigo-500/10 border-indigo-500" : ""}
          `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div
          className={`p-4 rounded-full mb-4 transition-all duration-300 ${file
            ? "bg-indigo-500/20 text-indigo-400"
            : "bg-gray-800 text-gray-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-400"
            }`}
        >
          <UploadCloud className="w-10 h-10" />
        </div>

        <div className="text-center space-y-2">
          <span className="text-xl font-semibold text-gray-200 block">
            {file ? file.name : "Drop your file here"}
          </span>
          <span className="text-sm text-gray-400 block">
            {file ? "Click to change file" : "or click to browse"}
          </span>
        </div>

        <input
          type="file"
          accept="video/*, audio/*"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </label>

      <div className="flex justify-center mt-8 mb-8">
        <button
          onClick={handleUpload}
          disabled={isUploading || !file}
          className={`
            px-8 py-4 rounded-xl flex items-center gap-3 font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-indigo-500/20
            ${isUploading || !file
              ? "bg-gray-800 text-gray-500 cursor-not-allowed shadow-none"
              : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-105 active:scale-95"
            }
          `}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <UploadCloud className="w-6 h-6" />
              <span>Generate Notes</span>
            </>
          )}
        </button>
      </div>

      {lectureData && (
        <SummaryBox
          summary={lectureData.summary}
          importantPoints={lectureData.importantPoints}
          bulletPoints={lectureData.bulletPoints}
          chapters={lectureData.chapters}
        />
      )}
    </div>
  );
}