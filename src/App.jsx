

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import SubCategories from './pages/SubCategories';
import Categories from './pages/Categories';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/:categoryName" element={<Categories />} />
          <Route path="/details" element={<ProductDetails />} />
          <Route path="/details/:productName" element={<ProductDetails />} />
          <Route path="/:categoryName/:subcategoryType/:subcategoryName" element={<SubCategories />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
