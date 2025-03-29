import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Popup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const popupRef = useRef(null);

  // Add letters for animation
  const tangerineLetters = "Tangerine Luxury".split("");

  // Use effect to show popup after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      // Disable scrolling when popup opens
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden';
      }
    }, 4000);
    
    return () => {
      clearTimeout(timer);
      // Re-enable scrolling when component unmounts
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'auto';
      }
    };
  }, []);

  // Handler to close the popup
  const handleClose = () => {
    setIsOpen(false);
    // Re-enable scrolling when popup closes
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
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

  // Handle mouse move to track position and determine if cursor is outside popup
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    
    if (popupRef.current) {
      const rect = popupRef.current.getBoundingClientRect();
      
      // Check if mouse is outside the popup boundaries
      const isOutside = 
        e.clientX < rect.left || 
        e.clientX > rect.right || 
        e.clientY < rect.top || 
        e.clientY > rect.bottom;
      
      setShowCloseButton(isOutside);
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
          onMouseMove={handleMouseMove}
          data-popup-element="true"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 popup-overlay" data-popup-element="true"></div>
          
          <motion.div
            ref={popupRef}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow-lg rounded-lg w-full max-w-6xl mx-4 relative z-50 popup-content overflow-hidden"
            style={{ height: "500px" }}
            onClick={handlePopupClick}
            data-popup-element="true"
          >
            {/* Transparent "Subscribe" text overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <h1 className="text-black text-9xl font-bold opacity-10">Subscribe Now</h1>
            </div>
            
            {/* Single div with background image and content overlay */}
            <div 
              className="w-full h-full flex bg-cover bg-center rounded-lg relative"
              style={{ 
                backgroundImage: 'url(https://wamani.vercel.app/wp-content/uploads/2023/06/Newsletter-Bg.png)'
              }}
            >
              {/* Content overlay on the right side */}
              <div className="w-1/2 ml-auto p-8 rounded-r-lg flex flex-col justify-center">
                {/* Animated Tangerine text with letter-by-letter animation */}
                <div className="flex mb-2">
                  {tangerineLetters.map((letter, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.1,
                        ease: "easeOut" 
                      }}
                      className="text-6xl font-cursive"
                      style={{ 
                        fontFamily: "'Pinyon Script', cursive",
                        marginRight: letter === " " ? "0.5rem" : "0" 
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: tangerineLetters.length * 0.1 + 0.2 }}
                    className="text-6xl"
                    style={{ fontFamily: "'Pinyon Script', cursive" }}
                  >
                    ..
                  </motion.span>
                </div>
                
                <motion.p 
                  className="text-2xl font-bold mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: tangerineLetters.length * 0.1 + 0.5 }}
                >
                  Always First.
                </motion.p>
                
                <div className="mb-4">
                  <motion.p 
                    className="text-gray-600 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: tangerineLetters.length * 0.1 + 0.7 }}
                  >
                    Join our newsletter for exclusive offers and updates on latest trends.
                  </motion.p>
                </div>
                
                <motion.div 
                  className="flex flex-col space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: tangerineLetters.length * 0.1 + 0.9 }}
                >
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
                </motion.div>
                {subscribed && <p className="text-green-600 mt-2">Subscribed successfully!</p>}
              </div>
            </div>
          </motion.div>
          
          {/* Cursor-following close button */}
          {showCloseButton && (
            <div 
              className="absolute z-[9999]"
              style={{
                left: `${mousePosition.x - 16}px`,
                top: `${mousePosition.y - 16}px`,
                pointerEvents: 'auto'
              }}
            >
              <button 
                onClick={handleClose} 
                className="w-full h-full flex items-center justify-center hover:opacity-120 transition-opacity cursor-pointer"
              >
                <img 
                  src="https://wamani.vercel.app/wp-content/themes/neytri/assets/images/pop-close.png" 
                  alt="Close" 
                  className="w-full h-full"
                />
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Popup;