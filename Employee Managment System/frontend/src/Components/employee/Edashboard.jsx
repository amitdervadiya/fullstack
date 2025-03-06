import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Edashboard() {

  const [data, setData] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem("employeetoken");

    if (!token) {
      console.log("No token found, please login.");
      return;
    }

    axios.get('http://localhost:2005/EmployeeList', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching manager:", error);
      });
  }, []);


  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Empolyee Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="#" className="text-gray-300 hover:text-white">Manage tasks</a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-gray-300 hover:text-white">Settings</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
