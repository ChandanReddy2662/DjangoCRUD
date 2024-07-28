import React, { useState } from 'react'
import axios from 'axios'
import { getCsrfToken } from './utils/csrf';
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [formData, setFormData] = useState({
        uname:'',
        pass:'',
    })
    const navigate = useNavigate()

    async function handleSubmit(event){
        event.preventDefault();
        console.log("Form submitted")
        const csrfToken = getCsrfToken();
        const form = new FormData(event.target)
        const response = await axios.post("http://localhost:8000/login/", form, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            withCredentials: true,
        })
        const data = response.data   
        console.log(data['signin'] === 'true')
        if(data['signin'] === 'true'){
            sessionStorage.setItem('uname', formData.uname)
            data['status'] === 'U'? navigate('/home'):navigate('/admin')
        }
            
    }
    
    function handleChange(event){
        const {name,value} = event.target
        setFormData({
            ...formData,
            [name]:value
        })
    }

    return (
        <div className='w-full h-screen flex justify-center items-center bg-gray-100'>
            <div className='max-w-md mx-auto mt-10 p-8 border border-gray-300 rounded-lg shadow-lg bg-white'>
            <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
            <form method="post" className="space-y-4" onSubmit={handleSubmit}>
                <div>
                <label htmlFor="name" className='block text-gray-700'>Username</label>
                <input 
                    type="text" 
                    name="uname" 
                    id="name" 
                    placeholder='Enter username' 
                    required 
                    onChange={handleChange} 
                    className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                />
                </div>
                <div>
                <label htmlFor="pass" className='block text-gray-700'>Password</label>
                <input 
                    type="password" 
                    name="pass" 
                    id="pass" 
                    placeholder='Enter password' 
                    required 
                    onChange={handleChange} 
                    className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                />
                </div>
                <button 
                type="submit" 
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Login
                </button>
                <p className='text-center text-gray-600'>Don't have an account? 
                <a href='/signup' className='underline text-blue-500 hover:text-blue-700 transition-colors'> SignUp</a>
                </p>
            </form>
            </div>
        </div>
    );
}
