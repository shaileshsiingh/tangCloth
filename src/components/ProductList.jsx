import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

// const API_URL = process.env.REACT_APP_API_URL ;
const API_URL = "/api";

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

  const itemsPerPage = 12; // Set items per page to 12

  const fetchProducts = useCallback(async (page, search = '', sort = 'default') => {
    try {
      setLoading(true);
      const baseUrl = `${API_URL}/product/list`;
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', itemsPerPage);
      
      if (search && search.trim() !== '') {
        params.append('search', search.trim());
      }
      
      // Add sort parameter to the API request
      if (sort === 'price-asc') {
        params.append('sort', 'price');
        params.append('order', 'asc');
      } else if (sort === 'price-desc') {
        params.append('sort', 'price');
        params.append('order', 'desc');
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
      setCurrentPage(page);
      setTotalPages(data.data.pagination.totalPages);
      setTotalProducts(data.data.pagination.totalProducts);
      
      console.log('API Response:', data);
      console.log('Showing page:', page);
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
    fetchProducts(1, '', sortBy);
  }, [fetchProducts, sortBy]);

  useEffect(() => {
    // Debounce search input
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    const timeoutId = setTimeout(() => {
      // Reset to first page when searching
      fetchProducts(1, searchTerm, sortBy);
    }, 500); // 500ms debounce delay
    
    setSearchTimeout(timeoutId);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm, fetchProducts, sortBy]);

  const handlePageChange = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchProducts(newPage, searchTerm, sortBy);
      
      // Scroll to top of the product list
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [fetchProducts, totalPages, searchTerm, sortBy]);

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    // This will trigger a refetch due to the useEffect dependency on sortBy
  };

  const addToWishlist = (product) => {
    // Implement add to wishlist logic here
    console.log('Add to wishlist:', product._id);
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
            onClick={() => fetchProducts(currentPage, searchTerm, sortBy)}
            className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Calculate the start and end product numbers for the current page
  const startProduct = (currentPage - 1) * itemsPerPage + 1;
  const endProduct = Math.min(startProduct + products.length - 1, totalProducts);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">My Shop</h1>
      <nav className="text-sm mb-6">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link to="/" className="text-gray-500 hover:text-black">Home</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-800">My Shop</li>
        </ol>
      </nav>
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
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {products.map((product) => (
          <motion.div
            key={product._id}
            className="overflow-hidden cursor-pointer group relative"
            whileHover={{ y: -5 }}
            onClick={() => handleProductClick(product)}
          >
            <div className="relative pb-[100%] bg-cyan-600">
              <img
                src={product.images?.[0] || 'https://via.placeholder.com/300x300'}
                alt={product.product_name}
                className="absolute top-0 left-0 w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x300';
                }}
              />
              {product.isSale && (
                <span className="absolute top-2 left-2 bg-black text-white text-xs font-semibold px-2 py-1">SALE</span>
              )}
              {product.isNew && (
                <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1">NEW</span>
              )}
              <div className="absolute right-2 top-2 flex flex-col gap-2">
                <button 
                  className="bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishlist(product);
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
                </button>
                <button className="bg-white rounded-full p-1 shadow-md hover:bg-gray-100">
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
                </button>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-0 transform transition-all duration-300 group-hover:bg-opacity-70 flex items-center justify-center h-16 opacity-0 group-hover:opacity-100">
              <button 
                className="bg-black text-white border border-white px-6 py-2 text-sm font-medium hover:bg-white hover:text-black transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleProductClick(product);
                }}
              >
                SELECT OPTIONS
              </button>
            </div>
            <div className="pt-4 pb-2 text-center">
              <h2 className="text-base font-medium mb-1">{product.product_name}</h2>
              <div className="flex justify-center mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star} 
                    className={`w-4 h-4 ${star <= (product.rating || 3) ? 'text-black-500' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-800">${product.price.toFixed(2)}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {products.length === 0 && !loading && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600">No products found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
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
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  disabled={loading}
                  className={`w-8 h-8 flex items-center justify-center
                    ${currentPage === pageNumber 
                      ? 'bg-black text-white' 
                      : 'border hover:bg-gray-100'}`}
                >
                  {pageNumber}
                </button>
              );
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
        </div>
      )}
    </div>
  );
}

export default ProductList;