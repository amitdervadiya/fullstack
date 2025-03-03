import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Mainpage() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found, please login.");
      return;
    }

    axios.get('http://localhost:2005/ManagerList', {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      console.log(response.data);
      setData(response.data.data)
    })
      .catch((error) => {
        console.error("Error fetching manager:", error);
      });
  }, []);


  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-1/4 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="#" className="text-gray-300 hover:text-white">Manage manager</a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-gray-300 hover:text-white">Settings</a>
            </li>
          </ul>
        </nav>
      </div>

    
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">manager List</h1>
      
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {
          data.map((e, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <label className="font-semibold text-lg">Name:</label>
                <p className="text-lg text-gray-700">{e.managerName}</p>
                <label className="font-semibold text-lg">Email:</label>
                <p className="text-gray-500">{e.managerEmail}</p>
                <label className="font-semibold text-lg">Password:</label>
                <p className="text-gray-500">.....</p>
              </div>
            ))
          }

        </div>
      </div>
    </div>
  );
}
