import axios from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCsrfToken } from '../../utils/csrf';
import AddProduct from '../../components/AddProduct';
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
    <AddProduct handleChange={handleChange} handleImageChange={handleImageChange} handleSubmit={handleSubmit} item={item} />
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
