import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Popup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Use effect to show popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 4000); // 5000 milliseconds = 5 seconds
    
    // Clean up the timer when component unmounts
    return () => clearTimeout(timer);
  }, []);

  // Handler to close the popup
  const handleClose = () => {
    setIsOpen(false);
  };

  // Handler to prevent event bubbling
  const handlePopupClick = (e) => {
    e.stopPropagation();
  };

  // Handle clicks on the overlay
  const handleOverlayClick = () => {
    handleClose();
  };

  const handleSubscribe = () => {
    if (email.trim() !== '') {
      setSubscribed(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center popup-container"
          style={{ 
            zIndex: 9999,
            pointerEvents: "auto",
            touchAction: "auto"
          }}
          onClick={handleOverlayClick}
          data-popup-element="true"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 popup-overlay" data-popup-element="true"></div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow-lg rounded-lg w-full max-w-5xl mx-4 relative z-50 popup-content"
            style={{ height: "500px" }}
            onClick={handlePopupClick}
            data-popup-element="true"
          >
            {/* Single div with background image and content overlay */}
            <div 
              className="w-full h-full flex bg-cover bg-left rounded-lg relative"
              style={{ 
                backgroundImage: 'url(https://wamani.vercel.app/wp-content/uploads/2023/05/Home-1-Slider-1-2.jpg)'
              }}
            >
              {/* Content overlay on the right side */}
              <div className="w-1/2 ml-auto p-8 bg-white rounded-r-lg flex flex-col justify-center">
                <motion.h1 
                  className="text-4xl font-bold font-serif mb-2" 
                  animate={{ x: [0, 10, 0] }} 
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  Tangerine..
                </motion.h1>
                <p className="text-lg font-bold mb-6">Always First.</p>
                
                <div className="mb-4">
                  <p className="text-gray-600 mb-6">
                    Join our newsletter for exclusive offers and updates.
                  </p>
                </div>
                
                <div className="flex flex-col space-y-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button 
                    className="bg-black text-white px-4 py-3 rounded-md hover:bg-gray-800 transition-colors duration-300 w-full"
                    onClick={handleSubscribe}
                  >
                    Subscribe
                  </button>
                </div>
                {subscribed && <p className="text-green-600 mt-2">Subscribed successfully!</p>}
              </div>
              
              <button 
                onClick={handleClose} 
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 rounded-full"
                style={{ 
                  cursor: "pointer", 
                  zIndex: 9999
                }}
              >
                ✖
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Popup;