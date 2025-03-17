import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

// const API_URL = process.env.REACT_APP_API_URL || "https://91.203.135.152:2001/api";
const API_URL = "http://91.203.135.152:2001/api";

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
      
      // Create URL with URLSearchParams for proper query string handling
      const baseUrl = `${API_URL}/product/list`;
      const params = new URLSearchParams();
      params.append('page', page);
      
      if (search && search.trim() !== '') {
        params.append('search', search.trim());
      }
      
      const url = `${baseUrl}?${params.toString()}`;
      console.log('Fetching products from:', url);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch products');
      }
      
      setProducts(data.data.products || []);
      
      // Force the currentPage to match our requested page regardless of what the API returns
      setCurrentPage(page);
      setTotalPages(data.data.pagination.totalPages);
      setTotalProducts(data.data.pagination.totalProducts);

      console.log('API Response:', data);
      console.log('Forcing display of page:', page);
      console.log('Total Pages:', data.data.pagination.totalPages);
      console.log('Total Products:', data.data.pagination.totalProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchProducts(1, '');
  }, [fetchProducts]);

  useEffect(() => {
    // Debounce search input
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    const timeoutId = setTimeout(() => {
      // Reset to first page when searching
      fetchProducts(1, searchTerm);
    }, 500); // 500ms debounce delay
    
    setSearchTimeout(timeoutId);
    
    return () => {
      clearTimeout(timeoutId);
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
      
      // Scroll to top of the product list
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [fetchProducts, totalPages, searchTerm]);

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error && products.length === 0) {
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

  // Calculate the start and end product numbers for the current page
  // Use items per page as the actual number of returned products
  const itemsPerPage = products.length || 1; // Avoid division by zero
  const startProduct = (currentPage - 1) * itemsPerPage + 1;
  const endProduct = Math.min(startProduct + products.length - 1, totalProducts);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <p className="text-gray-600">
          {totalProducts > 0 ? (
            `Showing ${startProduct}-${endProduct} of ${totalProducts} ${totalProducts === 1 ? 'product' : 'products'}`
          ) : (
            'No products found'
          )}
        </p>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full md:w-64 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            value={searchTerm}
            onChange={handleSearchChange}
            aria-label="Search products"
          />
          <select
            className="w-full md:w-auto border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-black"
            value={sortBy}
            onChange={handleSortChange}
            aria-label="Sort products"
          >
            <option value="default">Default sorting</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {loading && products.length > 0 && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
        </div>
      )}

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {sortedProducts.map((product) => (
          <motion.div
            key={product._id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer relative group"
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
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end justify-center"
              >
                <motion.button
                  className="bg-black text-white px-8 py-3 border border-white hover:bg-white hover:text-black transition-colors duration-300 opacity-0 group-hover:opacity-100 mb-4"
                  whileHover={{ scale: 1.1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product);
                  }}
                >
                  Select Option
                </motion.button>
              </motion.div>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 line-clamp-2">{product.product_name}</h2>
              <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold">${product.price}</p>
                {product.sizes && product.sizes.reduce((total, size) => total + size.quantity, 0) > 0 ? (
                  <span className="text-green-600 text-sm">In Stock</span>
                ) : (
                  <span className="text-red-600 text-sm">Out of Stock</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {sortedProducts.length === 0 && !loading && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600">No products found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1 || loading}
            className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="First page"
          >
            &laquo;
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            &lsaquo;
          </button>
          
          {/* Page number buttons */}
          <div className="flex space-x-1">
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              // Show limited page numbers with ellipsis for better UX
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    disabled={loading}
                    className={`w-10 h-10 flex items-center justify-center rounded
                      ${currentPage === pageNumber 
                        ? 'bg-black text-white' 
                        : 'border hover:bg-gray-100'}`}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (
                pageNumber === currentPage - 2 ||
                pageNumber === currentPage + 2
              ) {
                return <span key={pageNumber} className="px-2 self-end">...</span>;
              }
              return null;
            })}
          </div>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            &rsaquo;
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages || loading}
            className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Last page"
          >
            &raquo;
          </button>
        </div>
      )}
      
      {/* Direct Page Navigation */}
      {totalPages > 2 && (
        <div className="mt-4 flex justify-center items-center">
          <span className="text-gray-600 mr-2">Jump to:</span>
          <div className="flex flex-wrap justify-center gap-2 max-w-md">
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  disabled={loading || currentPage === pageNumber}
                  className={`w-8 h-8 flex items-center justify-center text-sm
                    ${currentPage === pageNumber 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                      : 'border hover:bg-gray-100'}`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;