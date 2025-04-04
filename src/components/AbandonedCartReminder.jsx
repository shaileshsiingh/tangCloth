import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

function AbandonedCartReminder() {
  const [showReminder, setShowReminder] = useState(false);
  const { cart } = useCart(); // Changed from cartItems to cart to match CartContext
  const navigate = useNavigate();
  
  console.log('AbandonedCartReminder rendered, cart:', cart);
  console.log('Current showReminder state:', showReminder);
  
  useEffect(() => {
    console.log('Effect running, cart:', cart);
    
    // Only show reminder if there are items in the cart
    if (cart && cart.length > 0) {
      console.log('Cart has items, setting timeout');
      
      // Set a timeout to show the reminder after a delay
      const timeoutId = setTimeout(() => {
        console.log('Timeout triggered - showing reminder');
        setShowReminder(true);
      }, 30000); // 1 second for testing
      
      // Add event listener for mouse leaving the page area
      const handleMouseLeave = (e) => {
        // If mouse moves to the top of the page (potentially leaving)
        console.log('Mouse leave event, clientY:', e.clientY);
        if (e.clientY < 10) {
          console.log('Mouse near top of page - showing reminder');
          setShowReminder(true);
        }
      };
      
      document.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        console.log('Cleanup function called');
        clearTimeout(timeoutId);
        document.removeEventListener('mouseleave', handleMouseLeave);
      };
    } else {
      console.log('Cart is empty, not setting timeout');
    }
  }, [cart]); // Changed dependency from cartItems to cart
  
  const handleClose = () => {
    console.log('Close button clicked');
    setShowReminder(false);
    
    // Don't show again for this session
    sessionStorage.setItem('cartReminderDismissed', 'true');
  };
  
  const goToCart = () => {
    console.log('Go to cart button clicked');
    navigate('/checkout');
    setShowReminder(false);
  };
  
  // Check if reminder was dismissed
  const dismissed = sessionStorage.getItem('cartReminderDismissed') === 'true';
  console.log('Cart reminder dismissed in this session:', dismissed);
  
  // Don't show if user has dismissed it already in this session
  if (dismissed) {
    console.log('Not showing reminder because it was dismissed');
    return null;
  }
  
  return (
    <AnimatePresence>
      {showReminder && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-0 right-0 m-4 z-50"
        >
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md border-l-4 border-blue-500">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <ShoppingBagIcon className="h-6 w-6 text-blue-500 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">Your cart is waiting!</h3>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">
              You've left some items in your cart! Don't forget to check out before they're gone!
            </p>
            
            <div className="flex space-x-4">
              <button
                onClick={goToCart}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors flex-grow"
              >
                Go to Cart
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Remind Me Later
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AbandonedCartReminder;