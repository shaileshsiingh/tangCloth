import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { allProducts } from '../data/allProducts';

const API_URL =  "/api";

function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.length > 2) {
      const fetchSearchResults = async () => {
        try {
          // const response = await fetch(`${API_URL}/product/list?search=${searchQuery}`);
          const response = await fetch(`http://91.203.135.152:2001/api/product/list?search=${searchQuery}`);
          if (!response.ok) {
            throw new Error('Failed to fetch search results');
          }
          const data = await response.json();
          setSearchResults(data.data.products || []);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search Products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-60 pl-10 pr-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>

      <AnimatePresence>
        {isOpen && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 w-96 bg-white shadow-xl z-50"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Search Results</h3>
                <button onClick={() => setIsOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {searchResults.map((product) => (
                  <div
                    key={product._id}
                    className="flex gap-4 cursor-pointer hover:bg-gray-50 p-2"
                    onClick={() => {
                      navigate(`/product/${product._id}`, { state: { product:product } });
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.product_name}
                      className="w-16 h-16 object-cover"
                    />
                    <div>
                      <h4 className="font-medium">{product.product_name}</h4>
                      <p className="text-sm text-gray-600">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Search; 