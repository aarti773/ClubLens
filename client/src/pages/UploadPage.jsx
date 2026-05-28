import { useState } from "react";
import MainLayout from "../layouts/MainLayout";

function UploadPage() {
  const [files, setFiles] = useState([]);

  function handleFileChange(event) {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  }

  return (
    <MainLayout>
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-bold">Upload Media</h1>

        <p className="mt-3 text-slate-400">
          Upload photos and videos for your club events.
        </p>

        <div className="mt-10 rounded-3xl border-2 border-dashed border-white/10 bg-white/5 p-12 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-3xl">
            ↑
          </div>

          <h2 className="mt-6 text-2xl font-semibold">Drag & Drop Media</h2>

          <p className="mt-3 text-slate-400">
            Upload event photos and videos securely.
          </p>

          <label className="mt-6 inline-block cursor-pointer rounded-xl bg-white px-6 py-3 font-medium text-slate-900">
            Choose Files
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {files.length > 0 && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-semibold">Selected files</h2>

            <div className="mt-4 space-y-3">
              {files.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center gap-4 rounded-xl bg-slate-900 p-4"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="h-20 w-20 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-medium">{file.name}</p>

                    <p className="mt-1 text-sm text-slate-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </MainLayout>
  );
}

export default UploadPage;
