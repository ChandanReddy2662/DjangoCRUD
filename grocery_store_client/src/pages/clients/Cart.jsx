import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CartItem from './../../components/CartItem'

export default function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetch = async () => {
    const response = await axios.get('http://localhost:8000/cart', {
      params:{uname: sessionStorage.getItem('uname')}
    })
    const data = response.data
    console.log(response.data.products.length)
    setCartItems(data['products'])
    setLoading(false)
  }

  useEffect(() =>{
    fetch()
  }, [])

  const handleDelete = async (product_id) => {
    const response = await axios.delete('http://localhost:8000/cart', {
      params: {username: sessionStorage.getItem('uname')}
    })
    if(response.data['status'] == 'deleted')
      toast.success("Item Deleted")
    else
      toast.warn("Unable to delete Item")
  }

  const handleBuy = async () => {
    if(cartItems.length > 0){
      const response = await axios.get('http://localhost:8000/buy', {
        params:{username: sessionStorage.getItem('uname')}
      })
      if(response.data['orderSuccessful'] === 'true'){
        toast.success("Order Successful")
        navigate('/home')
      }
      else{
        toast.error("Order Failed")
      }
    }
    else{
      toast.warn('Cart is Empty')
      navigate('/home')
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h1 className='text-3xl font-bold text-center mb-6'>Cart</h1>
      <div className='flex flex-col gap-6'>
        {loading || cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          cartItems.map(([prod, quan]) => (
            <CartItem 
              key={prod.product_id} 
              name={prod.name} 
              price={prod.price} 
              quantity={quan} 
              image={prod.image} 
              product_id={prod.product_id}
            />
          ))
        )}
      </div>
      <button 
        onClick={handleBuy}
        className='w-full py-2 px-4 mt-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
      >
        Buy
      </button>
    </div>
  );
};

