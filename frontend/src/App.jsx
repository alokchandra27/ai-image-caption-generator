import React from "react";
import { ToastContainer } from "react-toastify";
import { Routes , Route } from "react-router-dom"
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreatePost from "./pages/GenerateCaption";
import GenerateCaption from "./pages/GenerateCaption";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div >
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <Navbar />


     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/generateCaption" element={<GenerateCaption/>} />
     </Routes>
    </div>
  );
};

export default App;
