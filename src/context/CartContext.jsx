import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const addToCart = (product, quantity, size) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        item => item.id === product.id && item.size === size
      );

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCart, { ...product, quantity, size }];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId, size) => {
    setCart(prevCart => 
      prevCart.filter(item => !(item.id === productId && item.size === size))
    );
  };

  const updateQuantity = (productId, size, newQuantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price.min * item.quantity,
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
              {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div
                        key={`${item.id}-${item.size}`}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex gap-4 border-b pb-4"
                      >
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-20 h-20 object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">Size: {item.size}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, Math.max(0, item.quantity - 1))}
                              className="w-6 h-6 border flex items-center justify-center"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                              className="w-6 h-6 border flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <p>${(item.price.min * item.quantity).toFixed(2)}</p>
                          <button
                            onClick={() => removeFromCart(item.id, item.size)}
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