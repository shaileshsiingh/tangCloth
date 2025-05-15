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
        // const response = await fetch(`http://91.203.135.152:2001/api/product/list`)
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
        return 'bg-gray-200';
      case 'new':
        return 'bg-gray-200';
      case 'sale':
        return 'bg-gray-200';
      case 'used':
        return 'bg-gray-200';
      case 'refurbished':
        return 'bg-gray-200';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div ref={ref} className="container mx-auto px-4 py-12"  style={{backgroundColor:'#FAF9F6'}}>
      <section >
        <div className="flex justify-center items-center mb-12 mt-0">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-center relative inline-block my-12"
              animate={{ 
                scale: [1, 1.02, 1],
              }}
              transition={{ 
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <span className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-transparent bg-clip-text animate-gradient-x">
                SALE IS LIVE
              </span>
            </motion.h2>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 blur-3xl -z-10"
              animate={{ 
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
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
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              whileHover={{ y: -5 }}
              style={{backgroundColor:'white'}}
              onClick={() => handleProductClick(product)}
            >
              <div className="relative pb-[120%] w-full">
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10" />
                <img 
                  src={product.images?.[0] || 'https://via.placeholder.com/400'}
                  alt={product.product_name}
                  className={`absolute top-0 left-0 w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105 ${
                    (!product.sizes || product.sizes.length === 0 || product.sizes.every(size => size.quantity < 1)) 
                      ? 'filter blur-[1px]' 
                      : ''
                  }`}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400'; }}
                />
                {(!product.sizes || product.sizes.length === 0 || product.sizes.every(size => size.quantity < 1)) && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
                    <span className="text-white text-xl font-bold tracking-wider">SOLD OUT</span>
                  </div>
                )}
                {product.condition && (
                  <span className={`absolute top-3 left-3 ${getConditionBadgeColor(product.condition)} text-black text-xs font-medium px-3 py-1.5 rounded-full shadow-sm`}>
                    {product.condition.toUpperCase()}
                  </span>
                )}
                {(product.brand || (product.brandDetails && product.brandDetails.length > 0)) && (
                  <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-black text-xs px-3 py-1.5 rounded-full shadow-sm">
                    {(product.brand || (product.brandDetails && product.brandDetails[0]?.name)).toUpperCase()}
                  </span>
                )}
                <motion.div 
                  className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm transition-all duration-300"
                  whileHover={{ 
                    scale: 1.1,
                    borderRadius: "4px"
                  }}
                >
                  SALE
                </motion.div>
              </div>
              <div className="p-4 md:p-5">
                <h2 className="text-base font-medium mb-2 truncate tracking-wide group-hover:text-red-600 transition-colors duration-300">
                  {product.product_name.toUpperCase()}
                </h2>
                <div className="mt-3 space-y-1.5">
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-sm">
                      Estimated Retail Price: <span className="line-through">₹{product.estimated_price.toLocaleString()}</span>
                    </span>
                    <div className="flex flex-col gap-1 mt-1">
                       {product.discount_price > 0 && (
                          <span className="text-gray-900 font-medium">
                            Our Price:<span className="line-through"> ₹{product.price?.toLocaleString() || 'N/A'}</span>
                          </span>
                          )}
                      {product.discount_price > 0 && (
                        <span className="text-red-600 font-bold">
                          Sale Price: ₹{product.discount_price.toLocaleString()}
                        </span>
                      )}
                      {product.estimated_price > (product.discount_price || product.price) && (
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full font-medium w-fit">
                          {Math.round((1 - (product.discount_price || product.price) / product.estimated_price) * 100)}% OFF
                        </span>
                      )}
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
            className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-medium px-8 py-3 rounded-full shadow-md transition-all duration-300 flex items-center"
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
              <p className="text-sm text-gray-800">₹12599</p>
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