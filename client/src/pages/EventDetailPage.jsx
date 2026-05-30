import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {
  getEventById,
  getEventMedia,
  uploadEventMedia,
  deleteEventMedia,
  toggleMediaLike,
  addMediaComment,
  toggleMediaFavourite,
} from "../services/authService";

import { useAuth } from "../context/AuthContext";

function EventDetailPage() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [media, setMedia] = useState([]);
  const [error, setError] = useState("");

  const [selectedImages, setSelectedImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [caption, setCaption] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [tags, setTags] = useState("");
  const [taggedUsers, setTaggedUsers] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [commentInputs, setCommentInputs] = useState({});
  const [copiedMediaId, setCopiedMediaId] = useState(null);
  const { isLoggedIn, user } = useAuth();
  const currentUserId = user?._id || user?.id;
  useEffect(() => {
    async function loadEventDetails() {
      try {
        const eventData = await getEventById(id);
        const mediaData = await getEventMedia(id);

        setEvent(eventData.event);
        setMedia(mediaData);
      } catch (error) {
        setError(error.message);
      }
    }

    loadEventDetails();
  }, [id]);

  async function handleUpload() {
    try {
      if (selectedImages.length === 0) {
        setError("Please select at least one image");
        return;
      }
      const token = localStorage.getItem("token");

      setUploading(true);

      const uploadedItems = [];

      for (const image of selectedImages) {
        const formData = new FormData();

        formData.append("image", image);
        formData.append("caption", caption);
        formData.append("event", id);
        formData.append("visibility", visibility);
        formData.append("tags", tags);
        formData.append("taggedUsers", taggedUsers);

        const uploadedMedia = await uploadEventMedia(formData, token);

        uploadedItems.push(uploadedMedia);
      }

      setMedia((prevMedia) => [...uploadedItems, ...prevMedia]);

      setSelectedImages([]);
      setFileInputKey(Date.now());
      setCaption("");
      setTags("");
      setTaggedUsers("");
      setVisibility("public");
      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(event.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );

    setSelectedImages(droppedFiles);
  }

  async function handleDelete(mediaId) {
    try {
      const token = localStorage.getItem("token");

      await deleteEventMedia(mediaId, token);

      setMedia((prevMedia) => prevMedia.filter((item) => item._id !== mediaId));
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleLike(mediaId) {
    try {
      const token = localStorage.getItem("token");

      const response = await toggleMediaLike(mediaId, token);

      setMedia((prevMedia) =>
        prevMedia.map((item) =>
          item._id === mediaId
            ? {
                ...item,
                likes: response.likes,
              }
            : item,
        ),
      );
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleFavourite(mediaId) {
    try {
      const token = localStorage.getItem("token");

      const response = await toggleMediaFavourite(mediaId, token);

      setMedia((prevMedia) =>
        prevMedia.map((item) =>
          item._id === mediaId
            ? {
                ...item,
                favourites: response.favourites,
              }
            : item,
        ),
      );
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleComment(mediaId) {
    try {
      const token = localStorage.getItem("token");

      const text = commentInputs[mediaId];

      if (!text?.trim()) {
        return;
      }

      const updatedMedia = await addMediaComment(mediaId, text, token);

      setMedia((prevMedia) =>
        prevMedia.map((item) => (item._id === mediaId ? updatedMedia : item)),
      );

      setCommentInputs((prev) => ({
        ...prev,
        [mediaId]: "",
      }));
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <MainLayout>
      <section className="mx-auto max-w-6xl px-6 py-12">
        {error && (
          <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        {!event && !error && <p className="text-slate-400">Loading event...</p>}

        {event && (
          <>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-300">
                {event.category}
              </span>

              <h1 className="mt-5 text-4xl font-bold">{event.title}</h1>

              <p className="mt-4 max-w-2xl text-slate-400">
                {event.description}
              </p>

              <div className="mt-6 flex gap-4 text-sm text-slate-400">
                <span>{new Date(event.date).toDateString()}</span>
                <span>•</span>
                <span>{media.length} media uploads</span>
              </div>
            </div>

            <div className="mt-10">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Event Gallery</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Photos uploaded by club members
                  </p>
                </div>
              </div>

              {isLoggedIn && (
                <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h3 className="font-semibold">Upload a photo</h3>

                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <label
                      onDragOver={(event) => {
                        event.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      className={`cursor-pointer rounded-xl border border-dashed px-4 py-6 text-center text-sm transition ${
                        isDragging
                          ? "border-white bg-white/10 text-white"
                          : "border-white/10 bg-slate-900 text-slate-400"
                      }`}
                    >
                      <input
                        key={fileInputKey}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(event) =>
                          setSelectedImages(Array.from(event.target.files))
                        }
                        className="hidden"
                      />

                      {selectedImages.length > 0 ? (
                        <div className="space-y-3">
                          <p className="font-medium text-white">
                            {selectedImages.length} image(s) selected
                          </p>

                          <div className="grid grid-cols-3 gap-2">
                            {selectedImages.map((image, index) => (
                              <img
                                key={index}
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                className="h-20 w-full rounded-lg object-cover"
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        "Drag & drop images or click to select"
                      )}
                    </label>

                    <input
                      type="text"
                      placeholder="Caption"
                      value={caption}
                      onChange={(event) => setCaption(event.target.value)}
                      className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none"
                    />
                    <select
                      value={visibility}
                      onChange={(event) => setVisibility(event.target.value)}
                      className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Tags: workshop, crowd, cultural"
                      value={tags}
                      onChange={(event) => setTags(event.target.value)}
                      className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Tag users by email: aarti@gmail.com, rahul@gmail.com"
                      value={taggedUsers}
                      onChange={(event) => setTaggedUsers(event.target.value)}
                      className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none"
                    />

                    <button
                      onClick={handleUpload}
                      disabled={uploading}
                      className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60"
                    >
                      {uploading ? "Uploading..." : "Upload Photo"}
                    </button>
                  </div>
                </div>
              )}

              {media.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 text-center">
                  <p className="text-slate-300">No media uploaded yet.</p>
                  <p className="mt-2 text-sm text-slate-500">
                    Uploaded photos will appear here.
                  </p>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {media.map((item) => (
                    <div
                      key={item._id}
                      className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.caption || event.title}
                        className="h-52 w-full object-cover"
                      />

                      <div className="p-4">
                        <h3 className="font-medium">
                          {item.caption || "Event photo"}
                        </h3>

                        <p className="mt-2 text-sm text-slate-400">
                          Uploaded by {item.uploadedBy?.name || "member"}
                        </p>

                        {item.tags?.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.taggedUsers?.length > 0 && (
                          <div className="mt-3">
                            <p className="mb-2 text-xs text-slate-400">
                              Tagged Users
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {item.taggedUsers.map((user) => (
                                <span
                                  key={user._id}
                                  className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-300"
                                >
                                  @{user.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="mt-4 flex items-center gap-3">
                          <button
                            onClick={() => handleLike(item._id)}
                            className="rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/10"
                          >
                            Like ({item.likes?.length || 0})
                          </button>
                          <button
                            onClick={() => handleFavourite(item._id)}
                            className="rounded-lg border border-yellow-500/30 px-3 py-2 text-xs text-yellow-300 hover:bg-yellow-500/10"
                          >
                            Favourite ({item.favourites?.length || 0})
                          </button>
                          <a
                            href={item.imageUrl.replace(
                              "/upload/",
                              "/upload/fl_attachment/",
                            )}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg border border-green-500/30 px-3 py-2 text-xs text-green-300 hover:bg-green-500/10"
                          >
                            Download
                          </a>

                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(item.imageUrl);

                              setCopiedMediaId(item._id);

                              setTimeout(() => {
                                setCopiedMediaId(null);
                              }, 2000);
                            }}
                            className="rounded-lg border border-blue-500/30 px-3 py-2 text-xs text-blue-300 hover:bg-blue-500/10"
                          >
                            {copiedMediaId === item._id ? "✓ Copied" : "Share"}
                          </button>

                          <span className="text-xs text-slate-500">
                            {item.comments?.length || 0} comments
                          </span>
                        </div>

                        <div className="mt-4 space-y-2">
                          {item.comments?.slice(-2).map((comment) => (
                            <p
                              key={comment._id}
                              className="rounded-lg bg-slate-900 px-3 py-2 text-xs text-slate-300"
                            >
                              <span className="font-medium text-white">
                                {comment.user?.name || "User"}:
                              </span>{" "}
                              {comment.text}
                            </p>
                          ))}
                        </div>

                        {isLoggedIn && (
                          <div className="mt-4 flex gap-2">
                            <input
                              type="text"
                              placeholder="Add comment..."
                              value={commentInputs[item._id] || ""}
                              onChange={(event) =>
                                setCommentInputs((prev) => ({
                                  ...prev,
                                  [item._id]: event.target.value,
                                }))
                              }
                              className="min-w-0 flex-1 rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-xs outline-none"
                            />

                            <button
                              onClick={() => handleComment(item._id)}
                              className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-slate-950"
                            >
                              Post
                            </button>
                          </div>
                        )}
                        {isLoggedIn &&
                          (item.uploadedBy?._id === currentUserId ||
                            item.uploadedBy === currentUserId) && (
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="mt-4 rounded-lg border border-red-500/30 px-3 py-2 text-xs font-medium text-red-300 hover:bg-red-500/10"
                            >
                              Delete Photo
                            </button>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </MainLayout>
  );
}

export default EventDetailPage;
