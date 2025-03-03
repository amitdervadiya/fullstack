import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

export default function MSignuppage() {
    const [employeeName, setEmployeeName] = useState('');
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [employeePassword, setEmployeePassword] = useState('');
    const [employeePhone, setEmployeePhone] = useState('');
    const [gender, setGender] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("mtoken"); 
    
        if (!token) {
            console.log("No token found, please login.");
            return;
        }
    
        axios.get('http://localhost:2005/manager/Profile', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            console.log("manager Data:", response.data);
        })
        .catch((error) => {
            console.error("Error fetching manager:", error);
        });
    }, []); 
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem("mtoken"); 
    
        if (!employeePassword) {
            alert("Password is required!");
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('employeeName', employeeName);
            formData.append('employeeEmail', employeeEmail);
            formData.append('employeePassword', employeePassword);
            formData.append('employeePhone', employeePhone);
            formData.append('gender', gender);
            formData.append('image', image);
    
            console.log("Sending FormData:", Object.fromEntries(formData));
    
            let response = await axios.post('http://localhost:2005/employee/Register', formData, {
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
    


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
                encType='multipart/form-data'
            >
                <h2 className="text-2xl font-bold text-white text-center mb-5">Employee Signup</h2>

                <input
                    type="text"
                    onChange={(e) => setEmployeeName(e.target.value)}
                    placeholder="Name"
                    name='employeeName'
                    className="w-full p-3 mb-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="email"
                    name='employeeEmail'
                    onChange={(e) => setEmployeeEmail(e.target.value)}
                    placeholder="employeeEmail"
                    className="w-full p-3 mb-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="password"
                    name='employeePassword'
                    onChange={(e) => setEmployeePassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-3 mb-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="tel"
                    name='employeePhone'
                    onChange={(e) => setEmployeePhone(e.target.value)}
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
            </form>
        </div>
    );
}
