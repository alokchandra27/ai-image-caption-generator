import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Register = () => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    

    const formData = new FormData(e.target);
    // console.log(formData.get("username"));
    // console.log(formData.get("password"));


    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    if(data.username.length < 4){
      toast.error("Username must be at least 4 characters long!")
      setLoading(false)
      return

    }
    
    

    try {
      const API = "http://localhost:3000/api/auth";
      const res = await axios.post(`${API}/register`, data , {
        withCredentials:true
      });
      console.log(res.data);
      if (res.status === 201) {
        toast.success("User registered successfully");
      }
      e.target.reset();
      navigate("/login")
    } catch (error) {
      // console.log(error.response.status);
      // const errStatus = error.response.data
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("Username Already Exists");
        } else {
          toast.error("Something went wrong: " + error.response.data.message);
        }
      }
      else{
        toast.error("Server not reachable")
      }
    } finally {
      setLoading(false);
    }
  };

return (
    <div
      className="h-screen w-screen flex justify-center items-center p-4"
      style={{
        backgroundImage: "url('/photo-1513002749550-c59d786b8e6c.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* Card Container: Fixed for desktop (80%/70%), Full for mobile */}
      <div className="h-auto md:h-[80%] w-full md:w-[70%] bg-white rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-2xl">
        
        {/* Left Side: Image (Mobile par upar, Desktop par side mein) */}
        <div className="w-full md:w-1/2 h-64 md:h-full bg-amber-50 p-2">
          <div className="bg-emerald-700 h-full rounded-2xl overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src="/8d91f99cd84e9a4f98e08d64e0ffa77a.jpg"
              alt="Register Visual"
            />
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 h-auto md:h-full p-10 flex flex-col justify-center bg-white">
          <h3 className="text-3xl font-bold text-gray-800">Register today!</h3>
          <p className="text-gray-500 mb-6">Our servers are lonely and want your data.</p>

          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <input type="text" name="username" required placeholder="Enter your username" className="p-3 border rounded-lg" />
            <input type="password" name="password" required placeholder="Enter your password" className="p-3 border rounded-lg" />
            <button disabled={loading} className="bg-emerald-600 text-white p-3 rounded-lg font-bold">
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
