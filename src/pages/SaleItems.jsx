import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SaleItems = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [priceRange, setPriceRange] = useState([0, 18000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [pageSize, setPageSize] = useState(12);
  const API_URL = "/api";
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const itemsPerPage = pageSize;

  // Category mappings
  const categories = {
    all: 'All',
    men: 'Men',
    women: 'Women',
    kids: 'Kids',
  };

  const categoryIds = {
    'men': '67c82a32ac6e3964ca7755f7',
    'women': '67c08f837f61f5f03104ec4b',
    'kids': '67c9b33fb372a96364d09e3b'
  };

  // Colors for filtering
  const popularColors = [
    'Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 
    'Brown', 'Gray', 'Pink', 'Orange', 'Beige', 'Navy', 'Olive'
  ];

  // Sizes for filtering
  const sizes = ['S', 'M', 'L', 'XL'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/product/list`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        
        // Filter products that have a discounted_price
        const saleProducts = data.data.products.filter(product => 
          product.discount_price || 
          (product.estimated_price && product.price < product.estimated_price)
        );
        
        setProducts(saleProducts);
        setFilteredProducts(saleProducts);
        setTotalProducts(saleProducts.length);
        setTotalPages(Math.ceil(saleProducts.length / itemsPerPage));
        setDisplayedProducts(saleProducts.slice(0, itemsPerPage));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load sale items. Please try again later.');
        setLoading(false);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await fetch(`${API_URL}/brand/list`);
        if (!response.ok) {
          throw new Error('Failed to fetch brands');
        }
        const data = await response.json();
        setBrands(data.data.brands || []);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchProducts();
    fetchBrands();
  }, []);

  // Apply filters and update displayed products
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      const categoryId = categoryIds[selectedCategory];
      filtered = filtered.filter(product => product.category_id === categoryId);
    }

    // Apply brand filter
    if (selectedBrand) {
      filtered = filtered.filter(product => 
        product.brand_id === selectedBrand || 
        product.brand?._id === selectedBrand ||
        (product.brand && product.brand.toString() === selectedBrand)
      );
    }

    // Apply size filter
    if (selectedSize) {
      filtered = filtered.filter(product => 
        product.size === selectedSize || 
        (product.sizes && product.sizes.includes(selectedSize))
      );
    }

    // Apply color filter
    if (selectedColor) {
      filtered = filtered.filter(product => 
        product.color === selectedColor || 
        (product.colors && product.colors.includes(selectedColor))
      );
    }

    // Apply price range filter
    filtered = filtered.filter(product => {
      const price = product.discount_price || product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Apply sorting
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => (a.discount_price || a.price) - (b.discount_price || b.price));
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => (b.discount_price || b.price) - (a.discount_price || a.price));
    }

    setFilteredProducts(filtered);
    setTotalProducts(filtered.length);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
    setDisplayedProducts(filtered.slice(0, itemsPerPage));
  }, [products, searchTerm, selectedCategory, selectedBrand, selectedSize, selectedColor, priceRange, sortBy]);

  // Update displayed products when page changes
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedProducts(filteredProducts.slice(startIndex, endIndex));
  }, [currentPage, filteredProducts]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    const getPageNumbers = () => {
      const pageNumbers = [];
      const maxVisiblePages = 5;
      
      if (totalPages <= maxVisiblePages) {
        return [...Array(totalPages)].map((_, i) => i + 1);
      }
      
      // Always show first page
      pageNumbers.push(1);
      
      // Calculate start and end of visible pages
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're near the start
      if (currentPage <= 3) {
        end = 4;
      }
      
      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }
      
      // Add ellipsis and page numbers
      if (start > 2) {
        pageNumbers.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      
      if (end < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
      
      return pageNumbers;
    };
    
    return (
      <div className="flex flex-col items-center gap-4 mt-8">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-200 rounded px-2 py-1 text-sm"
          >
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={36}>36</option>
            <option value={48}>48</option>
          </select>
          <span className="text-sm text-gray-600">per page</span>
        </div>
        
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded transition-colors ${
              currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            <ChevronLeft size={16} />
          </button>
          
          {getPageNumbers().map((pageNumber, index) => (
            pageNumber === '...' ? (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-3 py-1 rounded transition-colors ${
                  currentPage === pageNumber
                    ? 'bg-black text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                {pageNumber}
              </button>
            )
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded transition-colors ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="text-sm text-gray-600">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalProducts)} - {Math.min(currentPage * itemsPerPage, totalProducts)} of {totalProducts} products
        </div>
      </div>
    );
  };

  return (
    <div ref={ref} className="container mx-auto px-4 py-12" style={{backgroundColor:'#FAF9F6'}}>
      <section className="mb-16">
        <div className="flex justify-center items-center mb-12 mt-4">
          <motion.h2 
            className="text-5xl font-bold text-center relative inline-block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-red-600 to-yellow-500 text-transparent bg-clip-text">
              SALE ITEMS
            </span>
            <motion.div 
              className="absolute -top-4 -right-10 bg-red-600 text-white text-xs font-bold rounded-full w-10 h-10 flex items-center justify-center transform rotate-12"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              SALE
            </motion.div>
          </motion.h2>
        </div>

        {/* Filters Section */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Sort */}
            <select
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">PRICE RANGE</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            {/* Category */}
            <select
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {Object.entries(categories).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>

            {/* Brand */}
            <select
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>{brand.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {/* Size */}
            <select
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="">All Sizes</option>
              {sizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>

            {/* Color */}
            <select
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option value="">All Colors</option>
              {popularColors.map((color) => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>

            {/* Price Range */}
            {/* <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-1/2 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                className="w-1/2 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              />
            </div> */}
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-8">{error}</div>
        ) : displayedProducts.length === 0 ? (
          <div className="text-center text-gray-600 py-8">No sale items available at the moment.</div>
        ) : (
          <>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: -50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            >
              {displayedProducts.map((product) => (
                <motion.div
                  key={product._id}
                  className="w-full bg-[#fafafa] border border-gray-100 rounded-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden cursor-pointer group relative"
                  whileHover={{ scale: 1.02 }}
                  style={{backgroundColor:'white'}}
                  onClick={() => handleProductClick(product)}
                >
                  <div className="relative aspect-square w-full">
                    <img
                      src={product.images?.[0] || 'https://via.placeholder.com/300x300'}
                      alt={product.product_name}
                      className="absolute top-0 left-0 w-full h-full object-contain p-4"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300';
                      }}
                    />
                    {/* Sale Badge */}
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      SALE
                    </div>
                    {product.condition && (
                      <span className="absolute top-3 left-3 bg-black bg-opacity-80 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-sm">
                        {product.condition.replace(/_/g, ' ').toUpperCase()}
                      </span>
                    )}
                    
                    {/* Brand Logo/Badge */}
                    {(product.brand || (product.brandDetails && product.brandDetails.length > 0)) && (
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm shadow-sm rounded-sm px-2.5 py-1.5 text-xs font-medium tracking-wide">
                        {(typeof product.brand === 'string' ? product.brand : 
                         (product.brandDetails && product.brandDetails[0]?.name) || 
                         (product.brand?.name || 'Brand')).toUpperCase()}
                      </div>
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
            {renderPagination()}
          </>
        )}
      </section>
    </div>
  );
};

export default SaleItems; 