import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  return (
    <div className="app">
      {!showProductList ? (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Welcome To Paradise Nursery</h1>
            <div className="divider" />
            <p>Where Green Meets Serenity</p>
            <button className="get-started-btn" onClick={() => setShowProductList(true)}>
              Get Started
            </button>
          </div>
          <div className="landing-about">
            <AboutUs />
          </div>
        </div>
      ) : (
        <ProductList onHomeClick={() => setShowProductList(false)} />
      )}
    </div>
  );
}

export default App;
