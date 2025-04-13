import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function LoadingScreen() {
  const [isLoaded, setIsLoaded] = useState(false);
  const text = "Tangerine Luxury";
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Container variants
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: isLoaded ? 0 : 1,
      transition: {
        staggerChildren: 0.12, // Faster stagger between letters
        when: "beforeChildren",
        staggerDirection: 1,
        ease: "easeInOut",
        duration: 0.3, // Faster transition
        delay: isLoaded ? 0.3 : 0
      }
    }
  };

  // Letter variants
  const letterVariants = {
    hidden: { 
      opacity: 0,
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 10, // Lower damping for faster spring
        stiffness: 150 // Higher stiffness for faster movement
      }
    }
  };

  // Dot variants for the ellipsis
  const dotVariants = {
    hidden: { 
      opacity: 0,
      scale: 0 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 8,
        stiffness: 150,
        delay: 1.2 // Show dots sooner
      }
    }
  };

  // Dot animation
  const pulseAnimation = {
    scale: [1, 1.2, 1],
    opacity: [1, 0.7, 1],
    transition: {
      duration: 0.8, // Faster pulse
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoaded ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 flex items-center justify-center bg-white z-50"
      style={{ pointerEvents: isLoaded ? "none" : "auto" }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center px-4"
      >
        {text.split('').map((letter, index) => (
          <motion.span
            key={`letter-${index}`}
            variants={letterVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold inline-block tracking-wider"
            style={{ 
              color: '#000000',
              fontFamily: "'Playfair Display', serif",
              letterSpacing: '0.05em'
            }}
          >
            {letter}
          </motion.span>
        ))}
        
        <div className="flex ml-1 items-end">
          {[0, 1, 2].map((dot, index) => (
            <motion.span
              key={`dot-${index}`}
              variants={dotVariants}
              animate={pulseAnimation}
              className="inline-block text-3xl sm:text-4xl md:text-5xl font-bold mx-0.5"
              style={{ 
                color: '#000000',
                fontFamily: "'Playfair Display', serif",
                animationDelay: `${index * 0.15}s` // Faster delay between dots
              }}
            >
              .
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default LoadingScreen;