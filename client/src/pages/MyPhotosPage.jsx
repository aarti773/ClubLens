import { useEffect, useState } from "react";
import * as faceapi from "face-api.js";

import MainLayout from "../layouts/MainLayout";
import { searchMedia } from "../services/authService";
function MyPhotosPage() {
  const [selfiePreview, setSelfiePreview] = useState("");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [status, setStatus] = useState("Loading face recognition models...");
  const [matchedPhotos, setMatchedPhotos] = useState([]);
  useEffect(() => {
    async function loadModels() {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
          faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        ]);

        setModelsLoaded(true);
        setStatus("Face recognition models loaded.");
      } catch (error) {
        setStatus("Failed to load face recognition models.");
        console.error(error);
      }
    }

    loadModels();
  }, []);

  function handleSelfieChange(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setSelfiePreview(URL.createObjectURL(file));
  }

  async function handleDetectSelfieFace() {
  if (!selfiePreview || !modelsLoaded) {
    return;
  }

  setStatus("Detecting face in selfie...");

  const selfieImage = await faceapi.fetchImage(selfiePreview);

  const selfieDetection = await faceapi
    .detectSingleFace(
      selfieImage,
      new faceapi.TinyFaceDetectorOptions()
    )
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (!selfieDetection) {
    setStatus("No face detected. Please upload a clearer selfie.");
    return;
  }

  setStatus("Searching your photos...");

  const allMedia = await searchMedia("2026");
  const matches = [];

  for (const item of allMedia) {
    try {
      const mediaImage = await faceapi.fetchImage(item.imageUrl);

      const mediaDetection = await faceapi
        .detectSingleFace(
          mediaImage,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!mediaDetection) {
        continue;
      }

      const distance = faceapi.euclideanDistance(
        selfieDetection.descriptor,
        mediaDetection.descriptor
      );

      if (distance < 0.55) {
        matches.push(item);
      }
    } catch (error) {
      console.error("Failed to process image", item.imageUrl);
    }
  }

  setMatchedPhotos(matches);

  setStatus(
    matches.length > 0
      ? `${matches.length} matching photo(s) found.`
      : "No matching photos found."
  );
}

  return (
    <MainLayout>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-3xl font-bold">My Photos</h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Upload a reference selfie to discover event photos where you appear.
          </p>

          <p className="mt-3 text-sm text-slate-400">{status}</p>

          <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-slate-900 p-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleSelfieChange}
              className="text-sm text-slate-300"
            />

            {selfiePreview && (
              <div className="mt-6">
                <p className="mb-3 text-sm text-slate-400">Reference Selfie</p>

                <img
                  src={selfiePreview}
                  alt="Reference selfie"
                  className="h-48 w-48 rounded-2xl object-cover"
                />

                <button
                  onClick={handleDetectSelfieFace}
                  disabled={!modelsLoaded}
                  className="mt-4 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60"
                >
                  Find My Photos
                </button>
              </div>
            )}
          </div>
        </div>
                  {matchedPhotos.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl font-semibold">
                Matching Photos
              </h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {matchedPhotos.map((photo) => (
                  <div
                    key={photo._id}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                  >
                    <img
                      src={photo.imageUrl}
                      alt={photo.caption || "Matched photo"}
                      className="h-52 w-full object-cover"
                    />

                    <div className="p-4">
                      <h3 className="font-medium">
                        {photo.caption || "Matched photo"}
                      </h3>

                      <p className="mt-2 text-sm text-slate-400">
                        Uploaded by {photo.uploadedBy?.name || "member"}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Event: {photo.event?.title || "Event"}
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

export default MyPhotosPage;
