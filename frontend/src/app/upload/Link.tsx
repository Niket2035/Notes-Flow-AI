"use client";
import React, { useState } from "react";
import { Loader2, Link as LinkIcon } from "lucide-react";
import SummaryBox from "@/app/component/box/summeryBox";

export default function LinkUpload() {
    const [link, setLink] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [lectureData, setLectureData] = useState<any | null>(null);

    const handleUpload = async () => {
        if (!link) return alert("Please enter a video link!");

        setIsUploading(true);

        const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

        try {
            const res = await fetch(`${apiUrl}/api/upload`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ videoUrl: link.trim() }),
            });

            if (res.ok) {
                console.log("Link submitted successfully");
            }

            const data = await res.json();

            if (data.lectureId) {
                setLectureData("generating Notes... This may take a few minutes.");
                pollForNotes(data.lectureId);
            } else {
                setLectureData(data);
                setIsUploading(false);
            }

            console.log("Flow started:", data);
        } catch (error) {
            console.error("Error uploading link:", error);
            setIsUploading(false);
            alert("Failed to submit link.");
        }
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

    return (
        <div className="w-full">
            <div className="flex flex-col items-center justify-center w-full p-12 border-2 border-dashed border-gray-700 rounded-2xl bg-gray-800/20">
                <p className="text-gray-400 text-lg">Paste your video link here</p>
                <input
                    type="text"
                    placeholder="https://..."
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="mt-4 w-full max-w-md px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
            </div>

            <div className="flex justify-center mt-8 mb-8">
                <button
                    onClick={handleUpload}
                    disabled={isUploading || !link}
                    className={`
            px-8 py-4 rounded-xl flex items-center gap-3 font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-indigo-500/20
            ${isUploading || !link
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
                            <LinkIcon className="w-6 h-6" />
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
