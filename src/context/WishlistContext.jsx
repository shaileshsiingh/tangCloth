import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WishlistContext = createContext();
const API_URL = "/api";

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const navigate = useNavigate();

  const fetchWishlistItems = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/wishlist/list`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch wishlist items');
      }

      const data = await response.json();
      console.log('Wishlist API Response:', data);

      // Map the wishlist items from the response
      setWishlist(data.data.wishlists.map(item => ({
        _id: item.productDetails._id,
        name: item.productDetails.product_name,
        image: item.productDetails.images[0],
        price: item.productDetails.price,
        sizes: item.productDetails.sizes,
        description: item.productDetails.description,
      })));
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    }
  }, []);

  useEffect(() => {
    fetchWishlistItems();
  }, [fetchWishlistItems]);

  const addToWishlist = async (product) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/product/wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: localStorage.getItem('userId'),
          product_id: product._id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to wishlist');
      }

      const result = await response.json();
      console.log('Item added to wishlist:', result);

      // Update wishlist state immediately
      setWishlist(prevWishlist => [...prevWishlist, {
        _id: product._id,
        name: product.product_name,
        image: product.images[0],
        price: product.price,
      }]);

      setIsWishlistOpen(true);
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/product/wishlist`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: localStorage.getItem('userId'),
          product_id: productId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from wishlist');
      }

      // Update wishlist state after successful removal
      setWishlist(prevWishlist => prevWishlist.filter(item => item._id !== productId));
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  const handleWishlistItemClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        fetchWishlistItems,
      }}
    >
      {children}
      <AnimatePresence>
        {isWishlistOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Wishlist</h2>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="text-gray-500 hover:text-black"
                >
                  ✕
                </button>
              </div>

              {wishlist.length === 0 ? (
                <p className="text-gray-500">Your wishlist is empty</p>
              ) : (
                <div className="space-y-4">
                  {wishlist.map((item) => (
                    <motion.div
                      key={item._id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-4 border-b pb-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => removeFromWishlist(item._id)}
                        className="text-sm text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
} 