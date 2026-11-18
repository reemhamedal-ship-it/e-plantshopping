import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import './App.css';

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg', description: 'Produces oxygen at night, improving air quality.', cost: '$15' },
      { name: 'Spider Plant', image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg', description: 'Filters formaldehyde and xylene from the air.', cost: '$12' },
      { name: 'Peace Lily', image: 'https://picsum.photos/seed/peace-lily/300/300', description: 'Removes mold spores and purifies the air.', cost: '$18' },
    ],
  },
  {
    category: 'Aromatic Plants',
    plants: [
      { name: 'Lavender', image: 'https://picsum.photos/seed/lavender/300/300', description: 'Calming scent used in aromatherapy.', cost: '$20' },
      { name: 'Jasmine', image: 'https://picsum.photos/seed/jasmine/300/300', description: 'Sweet fragrance, promotes relaxation.', cost: '$18' },
      { name: 'Rosemary', image: 'https://picsum.photos/seed/rosemary/300/300', description: 'Invigorating scent, also great for cooking.', cost: '$15' },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'Aloe Vera', image: 'https://picsum.photos/seed/aloe-vera/300/300', description: 'Soothing gel for skin, very easy to care for.', cost: '$14' },
      { name: 'Cactus', image: 'https://picsum.photos/seed/cactus/300/300', description: 'Thrives on neglect and bright light.', cost: '$10' },
      { name: 'ZZ Plant', image: 'https://picsum.photos/seed/zz-plant/300/300', description: 'Tolerates low light and irregular watering.', cost: '$25' },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true);
    setShowCart(false);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
    setShowPlants(false);
  };

  const handleContinueShopping = () => {
    setShowCart(false);
    setShowPlants(true);
  };

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      <nav className="navbar">
        <a href="#" className="navbar-brand" onClick={handleHomeClick}>
          <h2>Paradise Nursery</h2>
          <span>Where Green Meets Serenity</span>
        </a>
        <div className="navbar-links">
          <a href="#" onClick={handlePlantsClick}>Plants</a>
          <a href="#" onClick={handleCartClick} className="cart-link">
            🛒 <span className="cart-count">{totalCartItems}</span>
          </a>
        </div>
      </nav>

      {showPlants && !showCart && (
        <div className="product-grid">
          {plantsArray.map((cat) => (
            <div key={cat.category}>
              <h2 className="category-title">{cat.category}</h2>
              <div className="plant-row">
                {cat.plants.map((plant) => (
                  <div className="plant-card" key={plant.name}>
                    <img className="plant-image" src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p className="plant-description">{plant.description}</p>
                    <p className="plant-cost">{plant.cost}</p>
                    <button
                      className="add-btn"
                      disabled={isInCart(plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <AboutUs />
        </div>
      )}

      {showCart && <CartItem onContinueShopping={handleContinueShopping} />}
    </div>
  );
}

export default ProductList;
