"use client";
import React from "react";

export default function LiveRecord() {
    return (
        <div className="flex flex-col items-center justify-center w-full p-12 border-2 border-dashed border-gray-700 rounded-2xl bg-gray-800/20">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                <div className="w-8 h-8 rounded-full bg-red-500 animate-pulse" />
            </div>
            <p className="text-gray-400 text-lg">Click to start recording</p>
        </div>
    );
}
