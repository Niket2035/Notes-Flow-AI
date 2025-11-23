import UploadForm from "./UploadForm";


export default function UploadPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-zinc-900 to-slate-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-6 tracking-tight">
            Notes Flow AI
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Transform your lectures into clear, concise notes instantly.
            Just upload and let AI handle the rest.
          </p>
        </div>

        <UploadForm />
      </div>
    </div>
  );
}
