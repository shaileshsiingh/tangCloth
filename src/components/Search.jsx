import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_URL = "/api";

function Search({ onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.length > 2) {
      setLoading(true);
      
      const fetchSearchResults = async () => {
        try {
          // const response = await fetch(`http://91.203.135.152:2001/api/product/list?search=${encodeURIComponent(searchQuery)}`);
          const response = await fetch(`${API_URL}/product/list?search=${encodeURIComponent(searchQuery)}`);
          if (!response.ok) {
            throw new Error('Failed to fetch search results');
          }
          
          const data = await response.json();
          
          if (data && data.data && Array.isArray(data.data.products)) {
            setSearchResults(data.data.products);
          } else {
            setSearchResults([]);
          }
        } catch (error) {
          console.error('Search API error:', error);
        } finally {
          setLoading(false);
        }
      };

      // Use debounce to avoid excessive API calls
      const timeoutId = setTimeout(() => {
        fetchSearchResults();
      }, 300);
      
      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Handle search input focus - make sure results show immediately
  const handleFocus = () => {
    // No need to call setIsOpen since we'll always show results when available
  };

  // Handle clicking a search result
  const handleResultClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product: product } });
    setSearchQuery('');
    onClose();
  };

  return (
    <div ref={searchRef} className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 z-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white w-full max-w-2xl rounded-lg shadow-xl overflow-hidden"
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-lg">Search Products</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-black">
              <X size={24} />
            </button>
          </div>
          
          <div className="relative mt-6 w-64" >
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="mx-auto bg-gray-100 border-solid border border-gray-300 rounded-full py-2 px-4 block w-40 appearance-none leading-normal focus:outline-none focus:ring-2 focus:ring-black"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : (
            searchResults.length > 0 && (
              <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto">
                {searchResults.map((product) => (
                  <div
                    key={product._id}
                    className="flex gap-4 cursor-pointer hover:bg-gray-50 p-3 rounded-md transition-colors"
                    onClick={() => handleResultClick(product)}
                  >
                    <img
                      src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/400'}
                      alt={product.product_name}
                      className="w-20 h-20 object-cover rounded-md"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400';
                      }}
                    />
                    <div>
                      <h4 className="font-medium">{product.product_name}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        ₹{product.price}
                      </p>
                      {product.description && (
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
          
          {searchQuery.length > 2 && !loading && searchResults.length === 0 && (
            <div className="py-6 text-center text-gray-500">
              No products found matching "{searchQuery}"
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Search;