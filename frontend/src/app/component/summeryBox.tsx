import {
  Download,
  ExternalLink,
  BookOpen,
  Star,
  List,
  FileText,
} from "lucide-react";

type Chapter = {
  title: string;
  summary: string;
};

type LectureProps = {
  summary: string;
  importantPoints?: string[];
  bulletPoints?: string[];
  chapters?: Chapter[];
};

export default function SummaryBox({
  summary,
  importantPoints = [],
  bulletPoints = [],
  chapters = [],
}: LectureProps) {
  const generateContent = () => {
    let content = "";

    if (chapters.length > 0) {
      content += "CHAPTERS\n\n";
      chapters.forEach((ch) => {
        content += `${ch.title}\n${ch.summary}\n\n`;
      });
      content += "-----------------------------------\n\n";
    }

    if (importantPoints.length > 0) {
      content += "IMPORTANT POINTS\n\n";
      importantPoints.forEach((point) => {
        content += `- ${point}\n`;
      });
      content += "\n-----------------------------------\n\n";
    }

    if (bulletPoints.length > 0) {
      content += "KEY TAKEAWAYS\n\n";
      bulletPoints.forEach((point) => {
        content += `- ${point}\n`;
      });
      content += "\n-----------------------------------\n\n";
    }

    content += "LECTURE SUMMARY\n\n";
    content += summary || "Summary not available yet.";

    return content;
  };

  const handleDownload = () => {
    const content = generateContent();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lecture-notes.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleOpenNewTab = () => {
    const content = generateContent();
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(
        `<html><head><title>Lecture Notes</title></head><body style="margin:0; padding:40px; font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; background-color: #f9fafb;"><pre style="white-space: pre-wrap; font-family: inherit;">${content}</pre></body></html>`
      );
      newWindow.document.close();
    }
  };

  return (
    <div className="relative w-full space-y-12 p-8 md:p-10 rounded-3xl bg-white border border-gray-100 shadow-2xl text-gray-800 overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10 opacity-60 transform translate-x-1/2 -translate-y-1/2"></div>

      <div className="absolute top-6 right-6 flex gap-3">
        <button
          onClick={handleDownload}
          className="group p-2.5 bg-gray-50 hover:bg-indigo-50 rounded-xl text-gray-500 hover:text-indigo-600 transition-all duration-300 border border-gray-200 hover:border-indigo-200 shadow-sm hover:shadow-md"
          title="Download Notes"
        >
          <Download
            size={20}
            className="group-hover:scale-110 transition-transform"
          />
        </button>
        <button
          onClick={handleOpenNewTab}
          className="group p-2.5 bg-gray-50 hover:bg-indigo-50 rounded-xl text-gray-500 hover:text-indigo-600 transition-all duration-300 border border-gray-200 hover:border-indigo-200 shadow-sm hover:shadow-md"
          title="Open in New Tab"
        >
          <ExternalLink
            size={20}
            className="group-hover:scale-110 transition-transform"
          />
        </button>
      </div>

      {chapters.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
              <BookOpen size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Chapters</h3>
          </div>

          <div className="grid gap-6">
            {chapters.map((ch, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-emerald-100 hover:shadow-lg transition-all duration-300"
              >
                <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-700 transition-colors">
                  {ch.title}
                </h4>

                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {ch.summary}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {importantPoints.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <Star size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Important Points
            </h3>
          </div>

          <ul className="grid gap-3">
            {importantPoints.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl bg-purple-50/50 border border-purple-100/50 text-gray-700"
              >
                <span className="mt-1.5 w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {bulletPoints.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <List size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Key Takeaways</h3>
          </div>

          <ul className="grid gap-3">
            {bulletPoints.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/50 border border-blue-100/50 text-gray-700"
              >
                <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="pt-6 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
            <FileText size={24} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Lecture Summary</h2>
        </div>

        <div className="prose prose-lg max-w-none text-gray-600 leading-loose whitespace-pre-line">
          {summary || "Summary not available yet."}
        </div>
      </section>
    </div>
  );
}
