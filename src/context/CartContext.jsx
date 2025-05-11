import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CartContext = createContext();
const API_URL = "/api";
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const fetchCartItems = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/cart/get-item`, {
      // const response = await fetch(`http://91.203.135.152:2001/api/cart/get-item`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }

      const data = await response.json();
      setCart(data.data.map(item => ({
        _id: item._id,
        selectedSize: item.size,
        quantity: item.quantity,
        price: item.price,
        name: item.product.product_name,
        image: item.product.images[0],
      })));
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/cart/add-item`, {
      // const response = await fetch(`http://91.203.135.152:2001/api/cart/add-item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product._id,
          size_id: product.selectedSize,
          quantity: product.quantity,
          price: product.price,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }
  
      const result = await response.json();
      console.log('Item added to cart:', result);
  
      // Update cart state immediately
      setCart(prevCart => {
        const existingItemIndex = prevCart.findIndex(
          item => item._id === product._id && item.selectedSize === product.selectedSize
        );
  
        if (existingItemIndex !== -1) {
          // Update quantity if item already exists
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex].quantity += product.quantity;
          return updatedCart;
        }
  
        // Add new item to cart
        return [
          ...prevCart,
          {
            _id: product._id,
            selectedSize: product.selectedSize,
            quantity: product.quantity,
            price: product.price,
            name: product.name,
            image: product.image,
          }
        ];
      });
  
      // Optionally fetch updated cart items
      await fetchCartItems();
      setIsCartOpen(true);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const removeFromCart = async (productId, selectedSize) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/cart/remove-item/${productId}`, {
      // const response = await fetch(`http://91.203.135.152:2001/api/cart/remove-item/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }

      // Update cart state after successful removal
      setCart(prevCart => 
        prevCart.filter(item => !(item._id === productId && item.selectedSize === selectedSize))
      );
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateQuantity = (productId, selectedSize, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity: newQuantity, totalPrice: item.price * newQuantity }
          : item
      )
    );
  };

  const cartTotal = cart.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        fetchCartItems,
      }}
    >
      {children}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 overflow-hidden"
            style={{backgroundColor:'#FAF9F6'}}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-gray-900">Shopping Cart</h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                    <p className="text-gray-400 text-sm mt-2">Add items to start shopping</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <motion.div
                        key={`${item?._id}-${item.selectedSize}`}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex gap-4 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="relative w-24 h-24 flex-shrink-0">
                          <img
                            src={item?.image}
                            alt={item?.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                          <div className="absolute -top-2 -right-2 bg-red-200 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">{item?.name}</h3>
                          <p className="text-sm text-gray-500">Size: {item?.selectedSize}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item?._id, item?.selectedSize, Math.max(0, item?.quantity - 1))}
                              className="w-8 h-8 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item?._id, item?.selectedSize, item?.quantity + 1)}
                              className="w-8 h-8 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                          <p className="font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                          <button
                            onClick={() => removeFromCart(item._id, item.selectedSize)}
                            className="text-sm text-red-500 hover:text-red-700 transition-colors duration-200"
                          >
                            Remove
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="border-t border-gray-200 p-6 bg-white">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Total:</span>
                    <span className="text-2xl font-semibold text-gray-900">₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/checkout');
                    }}
                    className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
} 