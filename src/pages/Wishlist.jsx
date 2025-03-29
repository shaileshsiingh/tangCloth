import React, { useEffect, useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { Link, useNavigate } from 'react-router-dom';
import { StarIcon, HeartIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

function Wishlist() {
  const { wishlist, fetchWishlistItems, removeFromWishlist } = useWishlist();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        setLoading(true);
        await fetchWishlistItems();
      } catch (err) {
        setError('Failed to load wishlist');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, [fetchWishlistItems]);

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromWishlist(productId);
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const navigateToProduct = (item) => {
    navigate(`/product/${item._id}`, { 
      state: { 
        product: {
          _id: item._id,
          product_name: item.name,
          price: item.price,
          images: [item.image],
          description: item.description || '',
          sizes: item.sizes || []
        } 
      } 
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-center">
          <p className="text-xl font-semibold mb-2">Error Loading Wishlist</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Your Wishlist</h1>
      
      {wishlist.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <HeartIcon className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-medium text-gray-700 mb-3">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">Items added to your wishlist will appear here.</p>
          <button 
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        </motion.div>
      ) : (
        <>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {wishlist.map((item) => (
              <motion.div 
                key={item._id} 
                variants={itemVariants}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="relative">
                  <div 
                    className="cursor-pointer overflow-hidden"
                    onClick={() => navigateToProduct(item)}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400?text=Product+Image';
                      }}
                    />
                  </div>
                  
                  <button 
                    onClick={() => handleRemoveItem(item._id)}
                    className="absolute top-3 right-3 bg-white text-red-500 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove from wishlist"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="p-5">
                  <h2 
                    className="text-lg font-semibold mb-2 truncate cursor-pointer hover:text-gray-700"
                    onClick={() => navigateToProduct(item)}
                  >
                    {item.name}
                  </h2>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon 
                          key={i} 
                          className={`h-4 w-4 ${i < (item.rating || 4) ? 'text-black' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-bold">₹{item.price}</p>
                    
                    <button 
                      onClick={() => navigateToProduct(item)}
                      className="bg-black text-white px-4 py-2 rounded-sm hover:bg-gray-800 transition-colors text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/shop')}
              className="px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
          
        </>
      )}
      
    </div>
  );
}

export default Wishlist; 