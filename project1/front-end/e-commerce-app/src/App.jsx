import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import PrivateRoute from './components/PrivateRoute';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <Router>
            <div className="app-container">
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/cart" element={<CartPage />} />

                  <Route 
                    path="/profile" 
                    element={
                      <PrivateRoute>
                        <ProfilePage />
                      </PrivateRoute>
                    } 
                  />
                  <Route 
                    path="/checkout" 
                    element={
                      <PrivateRoute>
                        <CheckoutPage />
                      </PrivateRoute>
                    } 
                  />
                  <Route 
                    path="/orders" 
                    element={
                      <PrivateRoute>
                        <OrdersPage />
                      </PrivateRoute>
                    } 
                  />
                  <Route 
                    path="/orders/:id" 
                    element={
                      <PrivateRoute>
                        <OrderDetailsPage />
                      </PrivateRoute>
                    } 
                  />

                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
