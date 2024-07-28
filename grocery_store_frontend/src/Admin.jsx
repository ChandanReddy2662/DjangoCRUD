import axios from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCsrfToken } from './utils/csrf';
const ProductForm = ({ currentItem, onSubmit }) => {
  const [item, setItem] = useState(currentItem || {
    name: '',
    quantity: '',
    product_id: '',
    price: '',
    description: '',
    category: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setItem({
      ...item,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target)
    const csrfToken = getCsrfToken()
    const response = await axios.post('http://localhost:8000/products/', form, {
      headers:{
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': csrfToken
      }
    })
    console.log(response)
    if(response.data['saved'] === 'true'){
      toast.success('Item submitted successfully!');
      setItem({
        name: '',
        quantity: '',
        product_id: '',
        price: '',
        description: '',
        category: '',
        image: ''
      })
    } else {
      toast.error('Please fill out all fields.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={item.quantity}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">ID:</label>
          <input
            type="text"
            name="product_id"
            value={item.product_id}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price:</label>
          <input
            type="number"
            name="price"
            value={item.price}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            name="description"
            value={item.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category:</label>
          <select
            name="category"
            value={item.category}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="F">Fruits</option>
            <option value="V">Vegetable</option>
            <option value="B">Beverages</option>
            <option value="O">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};


export default function Admin(){
  return(
    <div>
      <h1>Add Product</h1>
      <ProductForm />
    </div>
  )
}
