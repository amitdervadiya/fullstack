import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

export default function MSignuppage() {
    const [managerName, setManagerName] = useState('');
    const [managerEmail, setManagerEmail] = useState('');
    const [managerPassword, setManagerPassword] = useState('');
    const [managerPhone, setManagerPhone] = useState('');
    const [gender, setGender] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token"); 
    
        if (!token) {
            console.log("No token found, please login.");
            return;
        }
    
        axios.get('http://localhost:2005/AdminProfile', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            console.log("Admin Data:", response.data);
        })
        .catch((error) => {
            console.error("Error fetching admin:", error);
        });
    }, []); 
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem("token"); 
    
        if (!managerPassword) {
            alert("Password is required!");
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('managerName', managerName);
            formData.append('managerEmail', managerEmail);
            formData.append('managerPassword', managerPassword);
            formData.append('managerPhone', managerPhone);
            formData.append('gender', gender);
            formData.append('image', image);
    
            console.log("Sending FormData:", Object.fromEntries(formData));
    
            let response = await axios.post('http://localhost:2005/manager/Register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}` 
                },
            });
    
            if (response) {
                navigate('/mlogin');
            }
            console.log(response.data);
    
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };
    const login = ()=>{
        navigate('/mlogin');
    }
    


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
                encType='multipart/form-data'
            >
                <h2 className="text-2xl font-bold text-white text-center mb-5">Manager Signup</h2>

                <input
                    type="text"
                    onChange={(e) => setManagerName(e.target.value)}
                    placeholder="Name"
                    name='managerName'
                    className="w-full p-3 mb-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="email"
                    name='Email'
                    onChange={(e) => setManagerEmail(e.target.value)}
                    placeholder="managerEmail"
                    className="w-full p-3 mb-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="password"
                    name='managerPassword'
                    onChange={(e) => setManagerPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-3 mb-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="tel"
                    name='managerPhone'
                    onChange={(e) => setManagerPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full p-3 mb-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <select
                    onChange={(e) => setGender(e.target.value)}
                    name='gender'
                    className="w-full p-3 mb-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <input
                    type="file"
                    name='image'
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/*"
                    className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    className="w-full p-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition duration-300 active:scale-95"
                >
                    Sign Up
                </button>
                <button onClick={login}>
                    alredy have account
                </button>
            </form>
        </div>
    );
}
