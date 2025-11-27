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
  return (
    <div className="w-full space-y-10 p-6 rounded-2xl bg-gray-900 border border-gray-700 shadow-xl text-gray-200">
      {chapters.length > 0 && (
        <section>
          <h3 className="text-2xl font-semibold text-green-400 mb-4">
            Chapters
          </h3>

          <div className="space-y-6">
            {chapters.map((ch, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-gray-700 bg-gray-800/50 shadow-md"
              >
                <h4 className="text-xl font-bold text-indigo-300 mb-2">
                  {ch.title}
                </h4>

                <p className="text-gray-300 whitespace-pre-line">
                  {ch.summary}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {importantPoints.length > 0 && (
        <section>
          <h3 className="text-2xl font-semibold text-purple-400 mb-3">
            Important Points
          </h3>

          <ul className="list-disc ml-6 space-y-2 text-gray-300">
            {importantPoints.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </section>
      )}

      {bulletPoints.length > 0 && (
        <section>
          <h3 className="text-2xl font-semibold text-blue-400 mb-3">
            Key Takeaways
          </h3>

          <ul className="list-disc ml-6 space-y-2 text-gray-300">
            {bulletPoints.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="text-3xl font-bold text-indigo-400 mb-3">
          Lecture Summary
        </h2>

        <p className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
          {summary || "Summary not available yet."}
        </p>
      </section>
    </div>
  );
}
