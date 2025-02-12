import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Mainpage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1008/viewAdmin")
      .then((response) => {
        console.log("API Response:", response.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !image) {
      alert("Please enter both name and email.");
      return;
    }
    const response = await axios.post("http://localhost:1008/addadmin", {
      name,
      email,
      image
    });

    // Update the data list with the new entry
    setData([...data, response.data]);

    // Clear form fields
    setName("");
    setEmail("");
    setImage("")
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-4xl p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Admin List
          </h1>
          <form onSubmit={handlesubmit} className="mb-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              className="w-full p-2 border border-gray-300 rounded mb-3"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="w-full p-2 border border-gray-300 rounded mb-3"
            />
            <input
              type="file"
              onChange={(e) => {
                const reader = new FileReader()
                reader.readAsDataURL(e.target.files[0])
                reader.onload = () => {
                  console.log(reader.result)
                  setImage(reader.result)
                }
              }}
              placeholder="Enter Image"
              className="w-full p-2 border border-gray-300 rounded mb-3"
              accept="image/*"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Add Data
            </button>
          </form>
          <div className="grid md:grid-cols-2 gap-6">
            {data.map((e, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
              >
                <label className="font-semibold">Name:</label>
                <p className="text-lg text-gray-700">{e.name}</p>
                <label className="font-semibold">Email:</label>
                <p className="text-gray-500">{e.email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
