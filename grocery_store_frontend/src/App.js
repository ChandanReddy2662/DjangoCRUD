import './App.css';
import Login from './Login';
import {  BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Admin from './Admin';
import Home from './Home';
import Cart from './Cart';
import SignUp from './SignUp';

function App() {
  return (
    <div>
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
