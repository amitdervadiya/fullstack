import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MSignuppage() {
  const [managerName, setManagerName] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [managerPassword, setManagerPassword] = useState("");
  const [managerPhone, setManagerPhone] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState(null);
  const [adminId, setAdminId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:2005/AdminProfile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setAdminId(response.data._id); // Auto-set adminId
      })
      .catch((error) => {
        console.error("Error fetching admin:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!managerPassword) {
      alert("Password is required!");
      return;
    }

    const formData = new FormData();
    formData.append("managerName", managerName);
    formData.append("managerEmail", managerEmail);
    formData.append("managerPassword", managerPassword);
    formData.append("managerPhone", managerPhone);
    formData.append("gender", gender);
    formData.append("image", image);
    formData.append("adminId", adminId);

    axios.post("http://localhost:2005/manager/Register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/mlogin");
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };
  const mlogin = ()=>{
    navigate("/mlogin");
  }
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-700"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Manager Signup
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            onChange={(e) => setManagerName(e.target.value)}
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            required
          />
          <input
            type="email"
            onChange={(e) => setManagerEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            required
          />
          <input
            type="password"
            onChange={(e) => setManagerPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            required
          />
          <input
            type="tel"
            onChange={(e) => setManagerPhone(e.target.value)}
            placeholder="Phone Number"
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            required
          />

          <select
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 p-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition duration-300 active:scale-95 shadow-md"
        >
          Sign Up
        </button>
        <button
          onClick={mlogin}
          className="w-full mt-2 p-3 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-700 transition duration-300 active:scale-95"
        >
          Already have an account?
        </button>
      </form>
    </div>
  );
}
