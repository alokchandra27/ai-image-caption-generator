import React, { useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GenerateCaption = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const generateCaption = async () => {
    if (!file) return toast.error("Please select an image first!");
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:3000/api/post", formData, {
        withCredentials: true,
      });
      setCaption(res.data.post.caption);
      if (res.status === 201) {
        toast.success("Caption Generated for You");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Unauthorized Access, Please Login First");
      } else {
        toast.error("Server Not Reachable");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex justify-center items-center p-4"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1610568781018-995405522539?q=80&w=1170&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Container: Mobile pe full width, Tablet/Desktop pe restricted */}
      <div className="w-full max-w-lg p-6 bg-white rounded-3xl shadow-xl">
        <ToastContainer />
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Generate Caption</h2>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />

        <div
          onClick={() => fileInputRef.current.click()}
          className="border-2 border-dashed border-gray-300 rounded-2xl h-48 w-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 overflow-hidden"
        >
          {preview ? (
            <img src={preview} alt="preview" className="h-full w-full object-cover" />
          ) : (
            <div className="text-center p-4">
              <span className="text-emerald-600 font-bold">Click to select image</span>
              <p className="text-xs text-gray-400">JPG, PNG supported</p>
            </div>
          )}
        </div>

        <button
          onClick={generateCaption}
          disabled={loading || !file}
          className={`w-full mt-6 py-3 rounded-xl font-bold transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 text-white"
          }`}
        >
          {loading ? "AI is generating..." : "Generate Caption"}
        </button>

        {caption && (
          <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <p className="text-gray-700 text-sm leading-relaxed">{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateCaption;