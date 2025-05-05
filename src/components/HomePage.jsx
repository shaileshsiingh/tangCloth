import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useWishlist } from '../context/WishlistContext';

function HomePage() {
  const [showCard, setShowCard] = useState(false);
  const [products, setProducts] = useState([]);
  const [rotate, setRotate] = useState(false);
  const navigate = useNavigate();
  const { addTowishlist } = useWishlist();
  const API_URL = "/api";   
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/product/list`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();

    const interval = setInterval(() => {
      setShowCard(true);
      setTimeout(() => setShowCard(false), 7000);
    }, 15000);

    // Set up the rotation animation interval
    const rotationInterval = setInterval(() => {
      setRotate(prev => !prev);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(rotationInterval);
    };
  }, []);

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  // Helper function to determine badge color based on condition
  const getConditionBadgeColor = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'pristine':
        return 'bg-gray-400';
      case 'new':
        return 'bg-gray-400';
      case 'sale':
        return 'bg-gray-400';
      case 'used':
        return 'bg-gray-400';
      case 'refurbished':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div ref={ref} className="container mx-auto px-4 py-12"  style={{backgroundColor:'#FAF9F6'}}>
      <section >
        <div className="flex justify-center items-center mb-8 mt-0">
          <motion.h2 
            className="text-5xl font-bold text-center relative inline-block"
            animate={{ rotate: rotate ? 360 : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <span className="bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text m-10">SALE IS LIVE</span>
            <motion.div 
              className="absolute -top-4 -right-10 bg-red-600 text-white text-xs font-bold rounded-full w-10 h-10 flex items-center justify-center transform rotate-12"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              SALE
            </motion.div>
          </motion.h2>
        </div>
        
       
        
        {/* <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          {products.slice(0, 4).map((product) => (
            <motion.div
              key={product._id}
              className="w-full bg-[#fafafa] overflow-hidden cursor-pointer group relative rounded-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5 }}
              onClick={() => handleProductClick(product)}
              style={{backgroundColor:'white'}}
            >
              <div className="relative pb-[120%] w-full">
                <img 
                  src={product.images?.[0] || 'https://via.placeholder.com/400'}
                  alt={product.product_name}
                  className="absolute top-0 left-0 w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400'; }}
                />
                {product.condition && (
                  <span className={`absolute top-2 left-2 ${getConditionBadgeColor(product.condition)} text-white text-xs font-semibold px-2 py-1 rounded shadow-md`}>
                    {product.condition.toUpperCase()}
                  </span>
                )}
                {(product.brand || (product.brandDetails && product.brandDetails.length > 0)) && (
                  <span className="absolute top-10 left-2 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded shadow-md">
                    {(product.brand || (product.brandDetails && product.brandDetails[0]?.name)).toUpperCase()}
                  </span>
                )}
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold rounded-full w-10 h-10 flex items-center justify-center transform rotate-12 shadow-md">
                  SALE
                </div>
                <div className="absolute right-2 top-14 flex flex-col gap-2">
                  <motion.button 
                    className="bg-black text-white rounded-full p-2 shadow-md hover:bg-gray-800"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addTowishlist(product);
                    }}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor" 
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </motion.button>
                  <motion.button 
                    className="bg-black text-white rounded-full p-2 shadow-md hover:bg-gray-800"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product);
                    }}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor" 
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                  </motion.button>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-0 transform transition-all duration-300 group-hover:bg-opacity-90 backdrop-blur-sm flex items-center justify-center h-16 opacity-0 group-hover:opacity-100">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 text-white font-medium tracking-wide text-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product);
                  }}
                >
                  SHOP NOW
                </motion.button>
              </div>
              <div className="p-5 bg-white">
                <h3 className="text-base font-medium mb-1 truncate transition-all duration-200 group-hover:text-black group-hover:font-bold">
                  {product.product_name.toUpperCase()}
                </h3>
                <div className="mt-2">
                  {product.estimated_price ? (
                    <div className="flex flex-col items-center">
                      <span className="text-gray-500 text-xs">Estimated Retail Price</span>
                      <span className="text-gray-500 line-through mb-1">₹{product.estimated_price.toLocaleString()}</span>
                      <span className="text-xs text-gray-700">Our Price</span>
                      <span className="text-gray-900 font-medium">
                        ₹{(product.discount_price || product.price).toLocaleString()}
                      </span>
                    </div>
                  ) : (
                    <p className="text-gray-900 font-medium">₹{typeof product.price === 'number' ? product.price.toLocaleString() : product.price?.toFixed(2) || 0}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div> */}
         {/* Show more button */}
         {/* <div className="flex justify-center mb-12 mt-8">
          <motion.button
            className="bg-[#B2FFFF] hover:bg-[#8EEAEA] text-gray-800 font-medium px-8 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              window.scrollTo(0, 0);
              navigate('/shop');
            }}
          >
            Show more
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div> */}
      </section>
      
      {/* Comment out Sale Containers */}
      {/* <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 mt-10 text-center">Sale Items</h2>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          {products.slice(0, 4).map((product) => (
            <motion.div
              key={product._id}
              className="w-full bg-[#fafafa] overflow-hidden cursor-pointer group relative rounded-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5 }}
              onClick={() => handleProductClick(product)}
              style={{backgroundColor:'white'}}
            >
              <div className="relative pb-[120%] w-full">
                <img 
                  src={product.images?.[0] || 'https://via.placeholder.com/400'}
                  alt={product.product_name}
                  className="absolute top-0 left-0 w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400'; }}
                />
                {product.condition && (
                  <span className={`absolute top-2 left-2 ${getConditionBadgeColor(product.condition)} text-white text-xs font-semibold px-2 py-1 rounded shadow-md`}>
                    {product.condition.toUpperCase()}
                  </span>
                )}
                {(product.brand || (product.brandDetails && product.brandDetails.length > 0)) && (
                  <span className="absolute top-10 left-2 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded shadow-md">
                    {(product.brand || (product.brandDetails && product.brandDetails[0]?.name)).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="p-5 bg-white">
                <h2 className="text-base font-medium mb-2 truncate tracking-wide">{product.product_name.toUpperCase()}</h2>
                <div className="mt-3 space-y-1.5">
                  {product.estimated_price ? (
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm">
                        Estimated Retail Price: <span className="line-through">₹{product.estimated_price.toLocaleString()}</span>
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-900 font-medium">
                          Our Price: ₹{(product.discount_price || product.price).toLocaleString()}
                        </span>
                        {product.estimated_price > (product.discount_price || product.price) && (
                          <span className="text-xs px-1.5 py-0.5 bg-black text-white rounded-sm">
                            {Math.round((1 - (product.discount_price || product.price) / product.estimated_price) * 100)}% OFF
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-900 font-medium mt-1">₹{product.price.toLocaleString()}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section> */}

      {/* Trending Apparels Section */}
      <section className="mb-16">
        {/* <h2 className="text-3xl font-bold mb-8 mt-10 text-center">Sale Items</h2> */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          {products
            .filter(product => product.estimated_price && product.discount_price)
            .slice(0, 4)
            .map((product) => (
            <motion.div
              key={product._id}
              className="w-full bg-[#fafafa] overflow-hidden cursor-pointer group relative rounded-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5 }}
              style={{backgroundColor:'white'}}
              onClick={() => handleProductClick(product)}
            >
              <div className="relative pb-[120%] w-full">
                <img 
                  src={product.images?.[0] || 'https://via.placeholder.com/400'}
                  alt={product.product_name}
                  className="absolute top-0 left-0 w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400'; }}
                />
                {product.condition && (
                  <span className={`absolute top-2 left-2 ${getConditionBadgeColor(product.condition)} text-white text-xs font-semibold px-2 py-1 rounded shadow-md`}>
                    {product.condition.toUpperCase()}
                  </span>
                )}
                {(product.brand || (product.brandDetails && product.brandDetails.length > 0)) && (
                  <span className="absolute top-10 left-2 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded shadow-md">
                    {(product.brand || (product.brandDetails && product.brandDetails[0]?.name)).toUpperCase()}
                  </span>
                )}
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold rounded-full w-10 h-10 flex items-center justify-center transform rotate-12 shadow-md">
                  SALE
                </div>
              </div>
              <div className="p-5 bg-white">
                <h2 className="text-base font-medium mb-2 truncate tracking-wide">{product.product_name.toUpperCase()}</h2>
                <div className="mt-3 space-y-1.5">
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-sm">
                      Estimated Retail Price: <span className="line-through">₹{product.estimated_price.toLocaleString()}</span>
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gray-900 font-medium">
                        Our Price: ₹{product.discount_price.toLocaleString()}
                      </span>
                      <span className="text-xs px-1.5 py-0.5 bg-red-600 text-white rounded-sm">
                        {Math.round((1 - product.discount_price / product.estimated_price) * 100)}% OFF
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Show more button */}
      <div className="flex justify-center mb-0 mt-8">
          <motion.button
            className="bg-[#B2FFFF] hover:bg-[#8EEAEA] text-gray-800 font-medium px-8 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              window.scrollTo(0, 0);
              navigate('/sale-items');
            }}
          >
            Show more
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div>

      {showCard && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="fixed bottom-4 left-4 bg-white shadow-lg rounded-lg w-72 z-20 overflow-hidden"
        >
          <div className="flex">
            <div className="w-1/3">
              <img 
                src="https://wamani.vercel.app/wp-content/uploads/2023/05/hots-01.jpg" 
                alt="Product" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="w-2/3 p-3">
              <div className="mb-1">
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Oops! It's Gone.</span>
              </div>
              <h3 className="text-lg font-medium">Coat</h3>
              <p className="text-sm text-gray-800">$99.99</p>
              <div className="flex items-center mt-2">
                <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600">by Anonymous</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default HomePage;