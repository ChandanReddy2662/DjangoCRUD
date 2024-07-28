import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getCsrfToken } from './utils/csrf'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Product({name, price, quantity, image, product_id}){

  async function addToCart(){
    if(quantity > 0){
        const form = new FormData()
        form.append('username', sessionStorage.getItem('uname'))
        form.append('product_id', product_id)
        const csrfToken = getCsrfToken();
        const response = await axios.post('http://localhost:8000/cart/', form, {
          headers:{
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': csrfToken
          }
        })
        if(response.data['saved'] === "true")
          toast.success("Item Added To Cart")
        else
          toast.warn("Failed to Add To Cart")
    }
    else{
      toast.warn('Item Out Of Stock')
    }
  }

  return (
    <div className="flex justify-between items-center border-b border-zinc-300 p-4 w-full bg-white rounded-lg shadow-md" key={product_id}>
      <div className="flex flex-col space-y-2">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-700">Price: ${price}</p>
        <p className="text-gray-700">{quantity > 0 ? `Quantity: ${quantity}` : 'Out Of Stock'}</p>
        <button 
          onClick={addToCart} 
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          disabled={quantity <= 0} // Disable button if out of stock
        >
          {quantity > 0 ? 'Add To Cart' : 'Out of Stock'}
        </button>
      </div>
      <div className="ml-4">
        <img src={'http://localhost:8000/media/' + image} width={60} alt={name} className="rounded-lg" />
      </div>
    </div>
  );
}


export default function Home() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetch(){
      if(sessionStorage.getItem('uname')){
        const response = await axios.get('http://localhost:8000/products')
        setProducts(response.data)
        console.log(response)
        setLoading(false)
      }
      else{
        navigate('/')
      }
    }
    const intervalId = setInterval(() => {
      fetch()
    }, 1000)
    return () => clearInterval(intervalId)

  }, [])

  const handleCart = () => {
    navigate('/cart')
  }

  const handleLogout = async () => {
    const response = await axios.get('http://localhost:8000/logout',{
      params:{'username': sessionStorage.getItem('uname')}
    })

    const data = response.data
    if(data['logout'] === 'true'){
      sessionStorage.clear();
      navigate('/')
    } 
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md fixed w-full">
        <h1 className="text-center font-bold text-3xl fice">ACR EC</h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center p-10">
        <div className="w-full max-w-4xl flex flex-col sm:flex-row justify-between items-start space-y-6 sm:space-y-0 sm:space-x-6">
          {/* Products List */}
          <div className="w-full sm:w-3/4 bg-white p-6 rounded-lg shadow-lg flex flex-col space-y-4 mt-10">
            {loading || products.length === 0
              ? "Loading...."
              : products.map((value) => (
                  <Product
                    key={value.product_id}
                    name={value.name}
                    price={value.price}
                    quantity={value.quantity}
                    product_id={value.product_id}
                    image={value.image}
                  />
                ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col space-y-4 mt-20 z-50">
            <button
              onClick={handleCart}
              className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Cart
            </button>
            <button
              onClick={handleLogout}
              className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
