import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function CartItem({name, price, quantity, image, product_id}){
  const [count, setCount] = useState(quantity)
  const incrementQuantity = () => {
    setCount(count + 1)
  }

  const decrementQuantity = () => {
    setCount(count - 1)
  }
  const removeFromCart = () => {

  }
  return (
    <div className="flex justify-between items-center border-b border-gray-300 p-4 w-full bg-white rounded-lg shadow-md mb-4" key={product_id}>
      <div className="flex flex-col space-y-2">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-700">Price: ${price}</p>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => decrementQuantity(product_id)} 
            className="w-8 h-8 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
          >
            -
          </button>
          <p className="text-gray-700">{count}</p>
          <button 
            onClick={() => incrementQuantity(product_id)} 
            className="w-8 h-8 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <img src={'http://localhost:8000/media/' + image} width={60} alt={name} className="rounded-lg" />
        <button 
          onClick={() => removeFromCart(product_id)} 
          className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
}


export default function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() =>{
    async function fetch(){
      const response = await axios.get('http://localhost:8000/cart', {
        params:{uname: sessionStorage.getItem('uname')}
      })
      const data = response.data
      console.log(response.data.products.length)
      setCartItems(data['products'])
      setLoading(false)
    }
    fetch()
  }, [])

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
      toast.error('Cart is Empty')
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

