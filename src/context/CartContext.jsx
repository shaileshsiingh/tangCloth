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
            className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Shopping Cart ({cartCount})</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-500 hover:text-black"
                >
                  ✕
                </button>
              </div>
              {console.log(cart)}

              {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div
                        key={`${item?._id}-${item.selectedSize}`}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex gap-4 border-b pb-4"
                      >
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className="w-20 h-20 object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item?.name}</h3>
                          <p className="text-sm text-gray-500">Size: {item?.selectedSize}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item?._id, item?.selectedSize, Math.max(0, item?.quantity - 1))}
                              className="w-6 h-6 border flex items-center justify-center"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item?._id, item?.selectedSize, item?.quantity + 1)}
                              className="w-6 h-6 border flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <p>${(item.price * item.quantity).toFixed(2)}</p>
                          <button
                            onClick={() => removeFromCart(item._id, item.selectedSize)}
                            className="text-sm text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-4 border-t pt-4">
                    <div className="flex justify-between mb-4">
                      <span>Total:</span>
                      <span className="font-medium">${cartTotal.toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate('/checkout');
                      }}
                      className="w-full bg-black text-white py-3 hover:bg-gray-900"
                    >
                      Checkout
                    </button>
                  </div>
                </>
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