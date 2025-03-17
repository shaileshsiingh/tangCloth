import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Popup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500); // Show popup after loading screen

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.8 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 ${isOpen ? 'bg-black bg-opacity-50' : ''} overflow-hidden`}
    >
      <div className="bg-white shadow-lg p-8 rounded-lg flex w-full max-w-4xl mx-4">
        <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(https://wamani.vercel.app/wp-content/uploads/2023/05/Home-1-Slider-1-2.jpg)' }}></div>
        <div className="w-1/2 p-4 relative">
          <motion.h1 className="text-4xl font-bold font-serif mb-2" animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>Tangerine..</motion.h1>
          <p className="text-lg font-bold mb-4">Always First.</p>
          <div className="flex items-center">
            <input type="email" placeholder="Enter your email" className="border p-2 mr-2 flex-1" />
            <button className="bg-black text-white px-4 py-2">Subscribe</button>
          </div>
          <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-lg text-gray-500 hover:text-black">✖</button>
        </div>
      </div>
    </motion.div>
  );
}

export default Popup;