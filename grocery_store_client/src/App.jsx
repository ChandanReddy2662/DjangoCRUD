import './App.css';
import Login from './pages/clients/Login';
import {  BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Admin from './pages/admin/Admin';
import Home from './pages/clients/Home'
import Cart from './pages/clients/Cart';
import SignUp from './pages/clients/SignUp';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <div>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
    />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
