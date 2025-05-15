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
            className="bg-white shadow-lg rounded-lg w-full max-w-sm sm:max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-4 relative z-50 popup-content overflow-hidden"
            style={{ height: "auto", maxHeight: "90vh" }}
            onClick={handlePopupClick}
            data-popup-element="true"
          >
            {/* Transparent "Subscribe" text overlay - hide on mobile */}
            <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none z-10">
              <h1 className="text-black text-5xl md:text-7xl lg:text-9xl font-bold opacity-10">Subscribe Now</h1>
            </div>
            
            {/* Single div with background image and content overlay */}
            <div 
              className="w-full h-full flex flex-col md:flex-row bg-cover bg-center rounded-lg relative"
              style={{ 
                backgroundImage: 'url(https://wamani.vercel.app/wp-content/uploads/2023/06/Newsletter-Bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Image section - visible only on larger screens */}
              <div className="hidden md:block md:w-1/2 h-full min-h-[300px] lg:min-h-[400px] xl:min-h-[500px]">
                {/* This is the image section - it's empty because we're using background image */}
              </div>
              
              {/* Content overlay */}
              <div className="w-full md:w-1/2 p-5 sm:p-6 md:p-8 rounded-lg md:rounded-l-none md:rounded-r-lg flex flex-col justify-center">
                {/* Animated Tangerine text with letter-by-letter animation */}
                <div className="flex flex-wrap mb-2 justify-center md:justify-start">
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
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cursive"
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
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                    style={{ fontFamily: "'Pinyon Script', cursive" }}
                  >
                    ..
                  </motion.span>
                </div>
                
                <motion.p 
                  className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 md:mb-8 text-center md:text-left"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: tangerineLetters.length * 0.1 + 0.5 }}
                >
                  Always First.
                </motion.p>
                
                <div className="mb-4">
                  <motion.p 
                    className="text-gray-600 mb-4 sm:mb-6 text-center md:text-left"
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
                {subscribed && <p className="text-green-600 mt-2 text-center md:text-left">Subscribed successfully!</p>}
              </div>
            </div>
            
            {/* Close button - regular X for mobile, cursor-following on desktop */}
            <button 
              onClick={handleClose}
              className="absolute right-3 top-3 z-50 md:hidden bg-white/80 rounded-full w-8 h-8 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </motion.div>
          
          {/* Cursor-following close button - desktop only */}
          {showCloseButton && (
            <div 
              className="absolute z-[9999] hidden md:block"
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