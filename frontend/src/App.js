import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // You can fetch user data here if needed
    }
  }, []);

  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductsPage onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} />} />
        <Route path="/order" element={<OrderPage cart={cart} />} />
        {user?.user_type === 'admin' && <Route path="/admin" element={<AdminDashboard />} />}
      </Routes>
    </Router>
  );
}

export default App;
