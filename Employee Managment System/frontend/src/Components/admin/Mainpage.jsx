import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Mainpage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editid, setEditid] = useState("");
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:1008/viewAdmin")
  //     .then((res) => {
  //       console.log("API :", res.data);
  //       setData(res.data.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching :", error);
  //     });
  // }, []);
  
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please enter both name and email.");
    }

    if (editid) {
      try {
        const res = await axios.put(`http://localhost:1008/updateAdmin/${editid}`, { name, email, password });
        console.log("Update Response:", res.data);
        setData(data.map(item =>
          item._id === editid ? { ...item, name, email, password } : item
        ));
        setEditid("");
      } catch (error) {
        console.error("Update error:", error.response ? error.response.data : error);
      }
    } else {
      const res = await axios.post("http://localhost:1008/addAdmin", { name, email, password });
      setData([...data, res.data]);
    }

    setName("");
    setEmail("");
    setPassword('');
  };

  const handledelete = async (id) => {
    console.log("Deleting ID:", id);
    try {
      const response = await axios.delete(`http://localhost:1008/deleteAdmin/${id}`);
      console.log("Delete Res:", response.data);
      setData(data.filter(item => item._id !== id));
    } catch (error) {
      console.error("Delete error:", error.response ? error.response.data : error);
    }
  };

  const handleedit = (id, admin) => {
    setName(admin.name);
    setEmail(admin.email);
    setPassword(admin.password);
    setEditid(id);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="#" className="text-gray-300 hover:text-white">Manage Admins</a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-gray-300 hover:text-white">Settings</a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin List</h1>
        
        {/* Admin Form */}
        <form onSubmit={handlesubmit} className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-3 border border-gray-300 rounded mb-6"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            {editid ? "Update Admin" : "Add Admin"}
          </button>
        </form>

        {/* Admin Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((e, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
            >
              <label className="font-semibold text-lg">Name:</label>
              <p className="text-lg text-gray-700">{e.name}</p>
              <label className="font-semibold text-lg">Email:</label>
              <p className="text-gray-500">{e.email}</p>
              <label className="font-semibold text-lg">Password:</label>
              <p className="text-gray-500">.....</p>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handledelete(e._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleedit(e._id, e)}
                  className="ml-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
