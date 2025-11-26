"use client";
import { useState } from "react";
import SummaryBox from "@/app/component/summeryBox";
import { UploadCloud, Loader2 } from "lucide-react";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [summary, setSummary] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    setIsUploading(true);

    const form = new FormData();
    form.append("video", file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/upload`, {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      console.log("File uploaded successfully");
    }

    const data = await res.json();
    setSummary(data.summary || "Summary is being generated...");

    console.log("Flow started:", data);

    // Simulate delay for demo
    // setTimeout(() => {
    //   setIsUploading(false);
    //   setSummary("This is a simulated summary.");
    // }, 2000);
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
    <div className="w-full max-w-3xl bg-black/40 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/10">
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

      <div className="flex justify-center mt-8">
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

      {summary && (
        <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-1 bg-indigo-500 rounded-full" />
            <h2 className="text-2xl font-bold text-gray-100">Summary</h2>
          </div>
          <SummaryBox summary={summary} />
        </div>
      )}
    </div>
  );
}
