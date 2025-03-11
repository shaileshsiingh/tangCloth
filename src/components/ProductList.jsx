import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const [searchTimeout, setSearchTimeout] = useState(null);

  const fetchProducts = useCallback(async (page, search = '') => {
    try {
        setLoading(true);
        const url = new URL('http://91.203.135.152:2001/api/product/list');
        url.searchParams.append('page', page);
        if (search) {
            url.searchParams.append('search', search);
        }

        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        
        setProducts(data.data.products || []);
        setCurrentPage(data.data.pagination.currentPage);
        setTotalPages(data.data.pagination.totalPages);
        setTotalProducts(data.data.pagination.totalProducts);
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
}, []);

  useEffect(() => {
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
    setSearchTimeout(setTimeout(() => {
        fetchProducts(1, searchTerm);
    }, 500)); // Fetch after 500ms delay

    return () => {
        clearTimeout(searchTimeout);
    };
  }, [searchTerm, fetchProducts]);

  // Memoized sorting
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.price - b.price;
      } else if (sortBy === 'price-desc') {
        return b.price - a.price;
      }
      return 0;
    });
  }, [products, sortBy]);

  const handlePageChange = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchProducts(newPage, searchTerm);
    }
  }, [fetchProducts, totalPages, searchTerm]);

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
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
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <button 
            onClick={() => fetchProducts(currentPage, searchTerm)}
            className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <p className="text-gray-600">
          Showing {sortedProducts.length} of {totalProducts} {totalProducts === 1 ? 'product' : 'products'}
        </p>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full md:w-64 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="w-full md:w-auto border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-black"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default sorting</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {sortedProducts.map((product) => (
          <motion.div
            key={product._id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            whileHover={{ y: -5 }}
            onClick={() => handleProductClick(product)}
          >
            <div className="relative pb-[100%]">
              <img
                src={product.images?.[0] || 'https://via.placeholder.com/400'}
                alt={product.product_name}
                className="absolute top-0 left-0 w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400';
                }}
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 line-clamp-2">{product.product_name}</h2>
              <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold">${product.price}</p>
                {product.sizes.reduce((total, size) => total + size.quantity, 0) > 0 ? (
                  <span className="text-green-600 text-sm">In Stock</span>
                ) : (
                  <span className="text-red-600 text-sm">Out of Stock</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600">No products found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductList;