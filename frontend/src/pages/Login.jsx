import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)

    const formData = new FormData(e.target);

    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    console.log(data.username);
    console.log(data.password);

    try {
      const API = import.meta.env.VITE_API_URL
      const res = await axios.post(`${API}auth/login`, data  , {
        withCredentials:true
      });
    //   console.log(res);
    if(res.status === 200){
       toast.success("User Logged In Successfully")
    }
      navigate("/")

    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
           toast.error("Invalid Username or Password");
        } else {
           toast.error("Something went wrong: " + error.response.data.message);
        }
      } else {
      toast.error("Server not Reachable");
      }
    }
    finally{
        setLoading(false)
    }
  };

  return (
    <div
      className="h-screen w-screen flex justify-center items-center p-4"
      style={{
        backgroundImage: "url('/photo-1518803194621-27188ba362c9.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      <div className="h-auto  md:h-[80%] w-full md:w-[70%] bg-white rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-2xl">
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 h-auto md:h-full p-10 flex flex-col justify-center bg-white">
          <h3 className="text-3xl font-bold text-gray-800">Ah, you again</h3>
          <p className="text-gray-500 mb-6">
            Let’s pretend you typed the right password.
          </p>

          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <input
              type="text"
              name="username"
              required
              placeholder="Enter your username"
              className="p-3 border rounded-lg"
            />
            <input
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              className="p-3 border rounded-lg"
            />
            <button
              disabled={loading}
              className="bg-red-500 text-white p-3 rounded-lg font-bold"
            >
              {loading ? "LoggedIn..." : "Log In"}
            </button>
          </form>
        </div>

        {/* RightSide: Image */}
        <div className="w-full md:w-1/2 h-64 md:h-full bg-amber-50 p-2">
          <div className="bg-emerald-700 h-full rounded-2xl overflow-hidden">
            <img
              className="h-full w-full object-cover "
              src="/76d91f5c1b12b80cfebf7d93f0a0ee15.webp"
              alt="Register Visual"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
