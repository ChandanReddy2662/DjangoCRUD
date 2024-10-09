import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getCsrfToken } from '../../utils/csrf'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Product from '../../components/Product'

export default function Home() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetch(){
      if(sessionStorage.getItem('uname')){
        const response = await axios.get('http://localhost:8000/products')
        setProducts(response.data)
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

  }, [navigate])

  const handleCart = () => {
    navigate('/cart')
  }

  const handleLogout = async () => {
    const response = await axios.get('http://localhost:8000/logout',{
      params:{'username': sessionStorage.getItem('uname')},
      withCredentials: true
    })

    const data = response.data
    if(data['logout'] === 'true'){
      sessionStorage.clear();
      navigate('/')
    } 
  }

  async function addToCart(quantity, product_id){
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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md fixed w-full">
        <h1 className="text-center font-bold text-3xl fice">ACR EC</h1>
      </header>

      <main className="flex flex-col items-center p-10">
        <div className="w-full max-w-4xl flex flex-col sm:flex-row justify-between items-start space-y-6 sm:space-y-0 sm:space-x-6">
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
                    addToCart={addToCart}
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
