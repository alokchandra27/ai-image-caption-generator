import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;

        const token = localStorage.getItem("token");

        const res = await axios.get(`${API}/post`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // const res = await axios.get(`${API}/post`, {
        //   withCredentials: true,
        // }); for cookies wali API

        setPosts(res.data.posts);
        toast.success("All Post Fetched");
      } catch (err) {
        toast.error("Failed to fetch posts , Please Login First");
      }
    };
    fetchPosts();
  }, []);

  return (
    // 1. Root container (Relative rakhna zaroori hai)
    <div className="relative min-h-screen text-white">
      {/* 2. Fixed Background (Yeh kabhi scroll nahi hoga) */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('/photo-1518803194621-27188ba362c9.avif')",
        }}
      ></div>

      {/* 3. Scrollable Content Wrapper */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="h-[60vh] flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase">
            AI Captions
          </h1>
          <p className="mt-4 text-gray-300">
            Transform your moments into stories.
          </p>
          <button
            onClick={() => navigate("/generateCaption")}
            className="cursor-pointer mt-8 border border-white px-8 py-3 hover:bg-white hover:text-black transition uppercase tracking-widest font-bold"
          >
            Generate New
          </button>
        </div>

        {/* Gallery Section */}
        <div className="max-w-7xl mx-auto p-8 bg-black/20 backdrop-blur-md rounded-t-3xl">
          <h3 className="text-2xl font-bold mb-8 uppercase tracking-widest text-amber-50">
            Recently Created
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post._id}
                className="group relative overflow-hidden rounded-xl border border-gray-800 transition-all duration-300"
              >
                <img
                  src={post.image}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  alt="post"
                />

                {/* Gradient Overlay - Default state */}
                <div className="absolute bottom-0 p-6 bg-linear-to-t from-black via-black/70 to-transparent w-full transition-all duration-300 group-hover:h-full group-hover:bg-black/80 flex flex-col justify-end">
                  {/* User Info */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                      {post.user?.username?.charAt(0).toUpperCase()}
                    </div>
                    <p className="text-xs text-emerald-400 font-semibold">
                      @{post.user?.username}
                    </p>
                  </div>

                  {/* Caption - Hover pe pura dikhega */}
                  <p className="text-sm text-gray-200 leading-relaxed overflow-y-auto max-h-40 scrollbar-hide">
                    {post.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
