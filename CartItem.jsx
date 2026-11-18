import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './App.css';

const parseCost = (cost) => parseFloat(String(cost).substring(1));

function CartItem({ onContinueShopping }) {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () =>
    cart
      .reduce((total, item) => total + item.quantity * parseCost(item.cost), 0)
      .toFixed(2);

  const calculateTotalCost = (item) => (item.quantity * parseCost(item.cost)).toFixed(2);

  const handleIncrement = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => dispatch(removeItem(item.name));

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>

      {cart.length === 0 && <p>Your cart is empty.</p>}

      {cart.map((item) => (
        <div className="cart-item" key={item.name}>
          <img className="cart-item-image" src={item.image} alt={item.name} />
          <div className="cart-item-details">
            <h4>{item.name}</h4>
            <p>Unit price: {item.cost}</p>
            <div className="cart-item-quantity">
              <button onClick={() => handleDecrement(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <p>Subtotal: ${calculateTotalCost(item)}</p>
            <button className="delete-btn" onClick={() => handleRemove(item)}>
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="cart-actions">
        <button onClick={handleContinueShopping}>Continue Shopping</button>
        <button onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
}

export default CartItem;
