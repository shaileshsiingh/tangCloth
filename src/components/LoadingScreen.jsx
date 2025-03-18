import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function LoadingScreen() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoaded ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center bg-white z-50"
    >
      <motion.h1
        className="text-4xl font-bold font-serif"
        animate={{ x: [0, 10, 0], y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Tangerine..
      </motion.h1>
    </motion.div>
  );
}

export default LoadingScreen; 