import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';

import Dashboard from './pages/Dashboard';
import Conversations from './pages/Conversations';
import Customers from './pages/Customers';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Payments from './pages/Payments';
import FollowUps from './pages/FollowUps';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';

// We'll replace this with actual auth state later
const isAuthenticated = true;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
        >
          <Route index element={<Dashboard />} />
          <Route path="conversations" element={<Conversations />} />
          <Route path="customers" element={<Customers />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="payments" element={<Payments />} />
          <Route path="follow-ups" element={<FollowUps />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
