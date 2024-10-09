import React, { useState } from 'react';
import axios from 'axios';
import { getCsrfToken } from '../../utils/csrf';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        username: '',
        password: '',
        phoneNumber: '',
        email: '',
        profile_photo: null,
    });
    const navigate = useNavigate();
    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === 'profile_photo') {
            setFormData({
                ...formData,
                [name]: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const submitData = new FormData();
        for (const key in formData) {
            submitData.append(key, formData[key]);
        }
        const csrfToken = getCsrfToken()
        try {
            const response = await axios.post('http://localhost:8000/signup/', submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': csrfToken
                },
            });
            const data = response.data
            if(data['saved'] === 'true')
                navigate('/login')
            else{
                // navigate('/signup')
                toast.warn("Wow so easy!");

            }

        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-md mx-4 sm:mx-auto mt-10 p-8 border border-gray-300 rounded-lg shadow-lg bg-white">
                <h1 className="text-center text-2xl font-bold mb-6">Sign Up Here</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                <div>
                    <label className="block text-gray-700">Name</label>
                    <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Age</label>
                    <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    required
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Gender</label>
                    <select
                    name="gender"
                    required
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700">Username</label>
                    <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Password</label>
                    <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Phone Number</label>
                    <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    required
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Profile Photo</label>
                    <input
                    type="file"
                    name="profile_photo"
                    accept="image/*"
                    required
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Sign Up
                </button>
                </form>
            </div>
        </div>
    );
}