type Props = {
  summary: string;
};

export default function SummaryBox({ summary }: Props) {
  return (
    <div className="w-full p-6 rounded-xl bg-gray-50 border border-gray-300 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Summarized Notes</h2>

      <p className="text-gray-700 leading-relaxed whitespace-pre-line min-h-[120px]">
        {summary || "Your summarized notes will appear here after uploading..."}
      </p>
    
    </div>
  );
}
