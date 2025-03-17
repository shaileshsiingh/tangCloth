import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Popup({ isOpen, onClose }) {
  // Handler to prevent event bubbling
  const handlePopupClick = (e) => {
    // Stop click from bubbling to parent elements
    e.stopPropagation();
  };

  // Handle clicks on the overlay
  const handleOverlayClick = () => {
    onClose();
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
          // Add data attribute for easier selection in cleanup
          data-popup-element="true"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 popup-overlay" data-popup-element="true"></div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow-lg rounded-lg flex w-full max-w-4xl mx-4 relative z-50 popup-content"
            onClick={handlePopupClick}
            data-popup-element="true"
          >
            <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(https://wamani.vercel.app/wp-content/uploads/2023/05/Home-1-Slider-1-2.jpg)' }}></div>
            <div className="w-1/2 p-8 relative">
              <motion.h1 
                className="text-4xl font-bold font-serif mb-2" 
                animate={{ x: [0, 10, 0] }} 
                transition={{ repeat: Infinity, duration: 2 }}
              >
                Tangerine..
              </motion.h1>
              <p className="text-lg font-bold mb-4">Always First.</p>
              <div className="flex items-center">
                <input type="email" placeholder="Enter your email" className="border p-2 mr-2 flex-1" />
                <button className="bg-black text-white px-4 py-2">Subscribe</button>
              </div>
              
              <button 
                onClick={onClose} 
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

// Default props to prevent errors if not provided
Popup.defaultProps = {
  isOpen: false,
  onClose: () => console.log('Close function not provided to Popup')
};

export default Popup;