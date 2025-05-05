import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function TangerineLuxuryHeader() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const benefitHoverVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`w-full py-8 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}
      style={{
        backgroundColor: '#FAF9F6' // Keeping original background color
      }}
    >
      {/* Logo and Brand Name */}
      <motion.div variants={itemVariants} className="flex flex-col items-center mb-12">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="flex justify-center space-x-4 mb-4"
        >
          <img 
            src="https://tangerineluxury.com/wp-content/uploads/2023/09/Layer-1111111.png" 
            alt="Tangerine" 
            className="transition-all duration-300 hover:brightness-110 max-w-[200px]"
          />
        </motion.div>
      </motion.div>
      
      {/* Introduction Text */}
      <motion.div variants={itemVariants} className="max-w-4xl mx-auto px-6 text-center mb-12">
        <motion.p 
          className="mb-6 text-lg leading-relaxed text-gray-800 font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          An online marketplace like "<span className="font-bold">Tangerine Luxury</span>" allows users to buy and sell pre-loved women's, men's, and children's clothing and accessories.
        </motion.p>
        
        <motion.p 
          className="mb-8 text-lg leading-relaxed text-gray-800 font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          Every single item in our collection was carefully chosen..! You won't need to worry about anything when you shop with us because each and every product meets the highest standards for both quality and style.
        </motion.p>
        
        <Link to='/about'>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-rose-100 px-6 py-3 rounded-full text-black font-medium transition-all duration-300"
          >
            Know More
          </motion.button>
        </Link>
      </motion.div>
      
      {/* Benefits Section */}
      <motion.div 
        variants={itemVariants}
        className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6 mt-16"
      >
        {/* Hassle Free Returns */}
        <motion.div 
          className="flex items-center"
          whileHover={benefitHoverVariants.hover}
        >
          <motion.div 
            className="text-gray-400 mr-4" // Keeping original color
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <rect x="1" y="3" width="15" height="10" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2"></rect>
              <path d="M16 8h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2" fill="none" stroke="currentColor" strokeWidth="2"></path>
              <path d="M4 13h5l2 2h5" fill="none" stroke="currentColor" strokeWidth="2"></path>
            </svg>
          </motion.div>
          <motion.div 
            className="font-bold font-sans tracking-wide"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            HASSLE FREE RETURNS
          </motion.div>
        </motion.div>
        
        {/* Affordable Luxury */}
        <motion.div 
          className="flex items-center"
          whileHover={benefitHoverVariants.hover}
        >
          <motion.div 
            className="text-gray-400 mr-4" // Keeping original color
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </motion.div>
          <motion.div 
            className="font-bold font-sans tracking-wide"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            AFFORDABLE LUXURY
          </motion.div>
        </motion.div>
        
        {/* 100% Guaranteed Authentic */}
        <motion.div 
          className="flex items-center"
          whileHover={benefitHoverVariants.hover}
        >
          <motion.div 
            className="text-gray-400 mr-4" // Keeping original color
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 8l-10 8"></path>
              <path d="M7 8l10 8"></path>
              <circle cx="12" cy="12" r="9"></circle>
              <text x="8" y="14" fontSize="8" fill="currentColor">$</text>
            </svg>
          </motion.div>
          <motion.div 
            className="font-bold font-sans tracking-wide"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            100% GUARANTEED AUTHENTIC
          </motion.div>
        </motion.div>
        
        {/* Worldwide Shipping */}
        <motion.div 
          className="flex items-center"
          whileHover={benefitHoverVariants.hover}
        >
          <motion.div 
            className="text-gray-400 mr-4" // Keeping original color
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M2 12h20"></path>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          </motion.div>
          <motion.div 
            className="font-bold font-sans tracking-wide"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            WORLDWIDE SHIPPING
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default TangerineLuxuryHeader;