import React from "react";
import axios from "axios";

const Register = () => {
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    console.log(formData.get("username"));
    console.log(formData.get("password"));

    try {
      const API = "http://localhost:3000/api/auth/";
      const res = await axios.post(`${API}/register`, formData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="h-screen w-screen flex justify-center items-center"
      style={{
        backgroundImage: "url('/photo-1513002749550-c59d786b8e6c.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="h-[80%] w-[70%] flex items-center justify-center rounded-2xl overflow-hidden">
        <div className="h-full  bg-amber-50 w-1/2">
          <div className="bg-emerald-700 h-[97%] rounded-2xl m-2 overflow-hidden">
            <img
              className="h-full w-full object-cover "
              src="/public/8d91f99cd84e9a4f98e08d64e0ffa77a.jpg"
              alt=""
            />
          </div>
        </div>

        {/* Section 2 */}
        {/* Right Side: Form */}
        <div className="w-1/2 h-full flex flex-col p-10 justify-center bg-white">
          <h3 className="text-3xl font-bold text-gray-800">Welcome Sir/Mam!</h3>
          <p className="text-gray-500 mb-6">
            Enter your details to register as a user
          </p>

          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Username</label>
              <input
                type="text"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Enter your username"
                name="username"
              />
            </div>

            <label className="font-semibold text-gray-700">Password</label>
            <input
              type="text"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter your password"
              name="password"
            />
            <button className="bg-emerald-600 text-white p-3 rounded-lg font-bold mt-4 hover:bg-emerald-700">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
