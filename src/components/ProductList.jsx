import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext'; // Import the WishlistContext

// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = "/api";
const CACHE_KEY = 'productListCache';
const CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour

function ProductList() {
  const navigate = useNavigate();
  const { addToWishlist } = useWishlist(); // Use the addToWishlist function
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 180000]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  const [searchTimeout, setSearchTimeout] = useState(null);

  const itemsPerPage = 12; // Set items per page

  const categories = {
    all: 'All',
    men: 'Men',
    women: 'Women',
    kids: 'Kids',
  };

  const subcategories = {
    men: ['Shirts', 'Pants', 'Shoes'],
    women: ['Dresses', 'Tops', 'Shoes'],
    kids: ['Toys', 'Clothing', 'Shoes'],
  };

  const colors = ['Red', 'Blue', 'Green'];
  const sizes = ['S', 'M', 'L', 'XL'];
  const brands = ['Brand A', 'Brand B', 'Brand C'];

  const categoryIds = {
    men: "67c82a32ac6e3964ca7755f7",
    kids: "67c9b33fb372a96364d09e3b",
    women: "67c08f837f61f5f03104ec4b"
  };

  const [categoryList, setCategoryList] = useState([]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      // Check for cached data
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
          setProducts(data);
          setLoading(false);
          return;
        }
      }

      // const baseUrl = 'http://91.203.135.152:2001/api/product/list';
      const baseUrl = `${API_URL}/product/list`;
      const params = new URLSearchParams();
        
      if (searchTerm && searchTerm.trim() !== '') {
        params.append('search', searchTerm.trim());
      }
      
      if (sortBy === 'price-asc') {
        params.append('sort', 'price');
        params.append('order', 'asc');
      } else if (sortBy === 'price-desc') {
        params.append('sort', 'price');
        params.append('order', 'desc');
      }
      
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      
      // Add category_id filter if your API supports it
      // if (selectedCategory !== 'all') {
      //   params.append('category_id', getCategoryId(selectedCategory));
      // }
      
      // Color filter
      if (selectedColor) {
        params.append('color', selectedColor);
      }
      
      // Brand filter - assuming the API accepts brand_id
      if (selectedBrand) {
        params.append('brand_id', selectedBrand);
      }
      
      // Price range filter
      params.append('min_price', priceRange[0]);
      params.append('max_price', priceRange[1]);
      
      // Size filter - this might need special handling depending on API
      if (selectedSize) {
        params.append('size', selectedSize);
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
      
      const allProducts = data.data.products || [];
      setProducts(allProducts);
      
      // Set filtered products - we'll apply client-side filtering for any filters not supported by API
      setFilteredProducts(allProducts);
      setTotalProducts(allProducts.length);
      setTotalPages(Math.ceil(allProducts.length / itemsPerPage));
      
      // Cache the data
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data: allProducts, timestamp: Date.now() }));
      
      console.log('API Response:', data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      
      // If API fails, we can use mock data for testing
      const mockProducts = [
        {
          "_id": "67dc4cdb095d30b5d3d169a7",
          "product_name": "h&m sweatshirt",
          "color": "Red",
          "price": 4999,
          "sizes": [
            {
              "size": "M",
              "quantity": 3,
              "_id": "67dc4cdb095d30b5d3d169a8"
            },
            {
              "size": "S",
              "quantity": 6,
              "_id": "67dc4cdb095d30b5d3d169a9"
            },
            {
              "size": "L",
              "quantity": 5,
              "_id": "67dc4cdb095d30b5d3d169aa"
            }
          ],
          "images": [
            "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          ],
          "description": "h&m sweatshirt red",
          "category_id": "67c9b33fb372a96364d09e3b",
          "sub_category_id": "67d828ed03c676492cbbeb4d",
          "brand_id": "67d8454223fd32371a042167",
          "isActive": true,
          "isSold": false,
          "ratings": [],
          "averageRating": null
        }
      ];
      
      // Uncomment this to use mock data for testing if the API fails
      // setProducts(mockProducts);
      // setFilteredProducts(mockProducts);
      // setTotalProducts(mockProducts.length);
      // setTotalPages(Math.ceil(mockProducts.length / itemsPerPage));
    } finally {
      setLoading(false);
    }
  }, [searchTerm, sortBy, selectedCategory, selectedColor, selectedSize, selectedBrand, priceRange]);
  
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/category/getAllCategory`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategoryList(data.data.category);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);
  
  // Debounce search input
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    const timeout = setTimeout(() => {
      setCurrentPage(1); // Reset to first page when search changes
      fetchProducts();
    }, 500);
    
    setSearchTimeout(timeout);
    
    return () => {
      clearTimeout(timeout);
    };
  }, [searchTerm, fetchProducts]);
  
  // Apply additional client-side filtering if needed
  useEffect(() => {
    let filtered = [...products];
    
    // Client-side filtering as a fallback or supplement to API filtering
    filtered = filtered.filter((product) => {
      // Check if product matches all selected filters
      
      // Price filter
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      // Color filter
      const matchesColor = selectedColor ? product.color === selectedColor : true;
      
      // Size filter - check if product has the selected size
      const matchesSize = selectedSize 
        ? product.sizes && product.sizes.some(sizeObj => sizeObj.size === selectedSize)
        : true;
      
      // Brand filter
      const matchesBrand = selectedBrand ? product.brand_id === selectedBrand : true;
      
      // Category filter - simplified, would need mapping between category names and IDs
      const matchesCategory = selectedCategory === 'all' ? true : 
                             product.category_id === categoryIds[selectedCategory];
      
      // Product name search - if not already handled by API
      const matchesSearch = !searchTerm || 
                           product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesPrice && matchesColor && matchesSize && matchesBrand && matchesCategory && matchesSearch;
    });
    
    // Apply client-side sorting if needed
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    }
    
    setFilteredProducts(filtered);
    setTotalProducts(filtered.length);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    
  }, [products, priceRange, selectedColor, selectedSize, selectedBrand, selectedCategory, searchTerm, sortBy]);
  
  // Update displayed products when page or filtered products change
  useEffect(() => {
    updateDisplayedProducts(filteredProducts);
  }, [currentPage, filteredProducts]);
  
  const updateDisplayedProducts = (productsArray) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedProducts(productsArray.slice(startIndex, endIndex));
  };
  
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1); // Reset pagination when sort changes
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset pagination when filter changes
  };
  
  const handleColorChange = (color) => {
    setSelectedColor(color === selectedColor ? '' : color); // Toggle selection
    setCurrentPage(1);
  };
  
  const handleSizeChange = (size) => {
    setSelectedSize(size === selectedSize ? '' : size); // Toggle selection
    setCurrentPage(1);
  };
  
  const handleBrandChange = (brand) => {
    setSelectedBrand(brand === selectedBrand ? '' : brand); // Toggle selection
    setCurrentPage(1);
  };
  
  const handlePriceChange = (value) => {
    setPriceRange([100, parseInt(value)]);
    setCurrentPage(1);
  };
  
  const handleResetFilters = () => {
    setSearchTerm('');
    setSortBy('default');
    setSelectedCategory('all');
    setPriceRange([5000, 1800000]);
    setSelectedColor('');
    setSelectedSize('');
    setSelectedBrand('');
    setCurrentPage(1);
  };

  // Format price from cents to dollars with proper formatting
  const formatPrice = (price) => {
    // If price is in cents (as in your example), convert to dollars
    return (price / 100).toFixed(2);
  };

  // Check if a product has a specific size
  const hasSize = (product, size) => {
    return product.sizes && product.sizes.some(sizeObj => sizeObj.size === size);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    const showEllipsis = totalPages > 5;
    
    if (showEllipsis) {
      // Always show first page
      pageNumbers.push(1);
      
      // Show ellipsis if not in first few pages
      if (currentPage > 3) {
        pageNumbers.push('...');
      }
      
      // Show pages surrounding current page
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pageNumbers.push(i);
      }
      
      // Show ellipsis if not in last few pages
      if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
      }
      
      // Always show last page
      pageNumbers.push(totalPages);
    } else {
      // Show all pages if total pages <= 5
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    }

    return (
      <div className="flex items-center justify-center mt-8 space-x-1">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        {pageNumbers.map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-4 py-2">...</span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => goToPage(page)}
              className={`px-4 py-2 rounded-md ${
                currentPage === page 
                  ? 'bg-black text-white' 
                  : 'border border-gray-300 hover:bg-gray-100'
              }`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          )
        ))}
        
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
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
            onClick={() => fetchProducts()}
            className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-1/4 pr-0 md:pr-4 mb-6 md:mb-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">FILTERS</h2>
            <button 
              onClick={handleResetFilters}
              className="text-sm text-gray-600 hover:text-black"
            >
              Reset All
            </button>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">PRICE</h3>
            <input
              type="range"
              min="0"
              max="180000"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(e.target.value)}
              className="w-full"
            />
            <div className="flex justify-between text-sm">
              <span>₹0</span>
              <span>₹{priceRange[1] / 100}</span>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">CATEGORIES</h3>
            <ul>
              {categoryList.map(category => (
                <li key={category._id} className="mb-1">
                  <button
                    className={`text-left w-full ${selectedCategory === category.name.toLowerCase() ? 'font-bold' : ''}`}
                    onClick={() => handleCategoryChange(category.name.toLowerCase())}
                  >
                    {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">COLOR</h3>
            <ul>
              {colors.map((color) => (
                <li key={color} className="mb-1">
                  <button
                    className={`text-left w-full ${selectedColor === color ? 'font-bold' : ''}`}
                    onClick={() => handleColorChange(color)}
                  >
                    {color}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">SIZE</h3>
            <ul>
              {sizes.map((size) => (
                <li key={size} className="mb-1">
                  <button
                    className={`text-left w-full ${selectedSize === size ? 'font-bold' : ''}`}
                    onClick={() => handleSizeChange(size)}
                  >
                    {size}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">BRANDS</h3>
            <ul>
              {brands.map((brand) => (
                <li key={brand} className="mb-1">
                  <button
                    className={`text-left w-full ${selectedBrand === brand ? 'font-bold' : ''}`}
                    onClick={() => handleBrandChange(brand)}
                  >
                    {brand}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <main className="w-full md:w-3/4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <p className="text-gray-600 text-sm">
              {totalProducts > 0 ? (
                `Showing ${Math.min((currentPage - 1) * itemsPerPage + 1, totalProducts)} - ${Math.min(currentPage * itemsPerPage, totalProducts)} of ${totalProducts} products`
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
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {displayedProducts.map((product) => (
              <motion.div
                key={product._id}
                className="overflow-hidden cursor-pointer group relative"
                whileHover={{ y: -5 }}
                onClick={() => handleProductClick(product)}
              >
                <div className="relative pb-[100%] bg-gray-200">
                  <img
                    src={product.images?.[0] || 'https://via.placeholder.com/300x300'}
                    alt={product.product_name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x300';
                    }}
                  />
                  {!product.isSoldOut && (
                    <span className="absolute top-2 left-2 bg-black text-white text-xs font-semibold px-2 py-1">SALE</span>
                  )}
                  {product.isSoldOut && (
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
                    <button 
                      className="bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add quick view logic here
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
                        className={`w-4 h-4 ${star <= (product.averageRating || 3) ? 'text-black-500' : 'text-gray-300'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="flex gap-2 justify-center">
                    {/* Display available sizes */}
                    {product.sizes && (
                      <div className="flex gap-1">
                        {product.sizes.map(sizeObj => (
                          <span 
                            key={sizeObj._id} 
                            className="text-xs border px-1 rounded"
                            title={`${sizeObj.quantity} in stock`}
                          >
                            {sizeObj.size}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-gray-800 mt-1">₹{(product.price / 100).toFixed(2)}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && !loading && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-600">No products found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
            </div>
          )}

          {/* Pagination Component */}
          {renderPagination()}
        </main>
      </div>
    </div>
  );
}

export default ProductList;