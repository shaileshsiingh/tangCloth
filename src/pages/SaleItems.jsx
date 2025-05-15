import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Percent, Tag, ShoppingBag } from 'lucide-react';

const HERO_IMAGES = [
  {
    src: "https://wamani.vercel.app/wp-content/uploads/2023/06/Home-6-Slider-2.png",
    alt: "Sale Hero 1"
  },
  {
    src: "https://wamani.vercel.app/wp-content/uploads/2023/06/Home-6-Slider-1.png",
    alt: "Sale Hero 2"
  },
  {
    src: "https://wamani.vercel.app/wp-content/uploads/2023/06/Home-6-Slider-4.png",
    alt: "Sale Hero 3"
  }
];

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
  const [selectedCondition, setSelectedCondition] = useState('');
  const [priceRange, setPriceRange] = useState([0, 18000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [pageSize, setPageSize] = useState(12);
  const [selectedHero, setSelectedHero] = useState(0);
  const productListRef = React.useRef(null);
  const API_URL = "/api";
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const itemsPerPage = pageSize;

  // Auto-rotate banner images
  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedHero((prev) => 
        prev === HERO_IMAGES.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    
    return () => clearInterval(timer);
  }, [HERO_IMAGES.length]);

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
        
        // Filter products that have a discount_price
        const saleProducts = data.data.products.filter(product => 
          product.discount_price && product.discount_price > 0
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

    // Apply condition filter
    if (selectedCondition) {
      filtered = filtered.filter(product => product.condition === selectedCondition);
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
  }, [products, searchTerm, selectedCategory, selectedBrand, selectedSize, selectedColor, selectedCondition, priceRange, sortBy]);

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

  const handleBannerClick = (category) => {
    setSelectedCategory(category);
  };

  const handleScrollToProducts = () => {
    if (productListRef.current) {
      productListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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

  // Sale Benefits Section
  const renderSaleBenefits = () => {
    const benefits = [
      { icon: <Tag className="w-6 h-6" />, title: "MASSIVE DISCOUNTS", description: "Up to 70% off retail prices" },
      { icon: <ShoppingBag className="w-6 h-6" />, title: "FREE SHIPPING", description: "On all orders above ₹999" },
      { icon: <Percent className="w-6 h-6" />, title: "EXTRA 10% OFF", description: "On your first purchase" }
    ];

    return (
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {benefits.map((benefit, index) => (
          <motion.div 
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm flex items-center space-x-4 border-l-4 border-red-600"
            whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-red-100 p-3 rounded-full text-red-600">
              {benefit.icon}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{benefit.title}</h3>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#FAF9F6'}}>
      {/* Custom Hero Section */}
      <div className="w-full flex flex-col md:flex-row items-stretch gap-0 bg-gray-50 min-h-screen mb-12 overflow-hidden">
      {/* Left: Heading + Thumbnails + Button */}
      <motion.div 
        className="w-full md:w-1/2 flex flex-col justify-center items-start px-6 md:pl-16 md:pr-8 py-8"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-full max-w-lg mb-8 md:mb-12">
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold text-black mb-4 leading-tight tracking-tight"
            style={{letterSpacing: '-0.03em'}}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Sale Items
          </motion.h1>
          
          <motion.p 
            className="text-base md:text-lg text-gray-600 mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Discover the best deals on trending fashion. Limited time offers, exclusive discounts, and more!
          </motion.p>
          
          {/* Horizontal Thumbnails */}
          <motion.div 
            className="flex flex-row gap-4 overflow-x-auto pb-2 mb-12 w-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-2"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {HERO_IMAGES.map((img, idx) => (
              <motion.img
                key={img.src}
                src={img.src}
                alt={img.alt}
                onClick={() => setSelectedHero(idx)}
                className={`w-28 h-28 md:w-32 md:h-32 object-cover rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  idx === selectedHero ? 'border-black scale-105 shadow-lg' : 'border-gray-200 opacity-70 hover:opacity-100'
                }`}
                style={{ boxShadow: idx === selectedHero ? '0 4px 24px 0 rgba(0,0,0,0.10)' : undefined }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + idx * 0.1 }}
              />
            ))}
          </motion.div>
          
          <motion.button
            className="bg-black text-white px-8 py-4 rounded-md font-semibold text-lg shadow hover:bg-gray-900 transition"
            onClick={handleScrollToProducts}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Collection
          </motion.button>
        </div>
      </motion.div>
      
      {/* Right: Main Image */}
      <motion.div 
        className="w-full md:w-1/2 flex items-center justify-center bg-white py-8 md:py-0"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="relative w-full max-w-lg md:w-full md:max-w-xl h-96 md:h-full flex items-center justify-center rounded-lg overflow-hidden shadow-xl border border-gray-100"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <motion.img
            key={selectedHero}
            src={HERO_IMAGES[selectedHero].src}
            alt={HERO_IMAGES[selectedHero].alt}
            className="w-full h-full object-cover object-center"
            style={{ aspectRatio: '3/4' }}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </motion.div>
    </div>

      <div ref={productListRef} className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <div className="flex justify-center items-center mb-12">
            {/* <motion.h2 
              className="text-5xl font-bold text-center relative inline-block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-gradient-to-r from-red-600 to-black text-transparent bg-clip-text">
                SALE ITEMS
              </span>
              <motion.div 
                className="absolute -top-4 -right-10 bg-red-600 text-white text-xs font-bold rounded-full w-10 h-10 flex items-center justify-center transform rotate-12"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [12, 20, 12]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                SALE
              </motion.div>
            </motion.h2> */}
          </div>

          {/* Sale Benefits */}
          {/* {renderSaleBenefits()} */}

          {/* Filters Section */}
          <motion.div 
            className="mb-8 bg-white p-6 rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
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

              {/* Condition */}
              <select
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50"
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
              >
                <option value="">All Conditions</option>
                <option value="pristine">Pristine Condition</option>
                <option value="good">Good Condition</option>
                <option value="new_with_tags">New with tags</option>
                <option value="new_without_tags">New without tags</option>
                <option value="gently_used">Gently used</option>
                <option value="used_fairly_well">Used fairly well</option>
              </select>
            </div>
          </motion.div>
          
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
              >
                {displayedProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    className="w-full bg-white border border-gray-100 rounded-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden cursor-pointer group relative"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="relative aspect-square w-full overflow-hidden">
                      <img
                        src={product.images?.[0] || 'https://via.placeholder.com/300x300'}
                        alt={product.product_name}
                        className={`absolute top-0 left-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700 ${
                          (!product.sizes || product.sizes.length === 0 || product.sizes.every(size => size.quantity < 1)) 
                            ? 'filter blur-[1px]' 
                            : ''
                        }`}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x300';
                        }}
                      />
                      {/* Sold Out Overlay */}
                      {(!product.sizes || product.sizes.length === 0 || product.sizes.every(size => size.quantity < 1)) && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
                          <span className="text-white text-xl font-bold tracking-wider">SOLD OUT</span>
                        </div>
                      )}
                      {/* Sale Badge */}
                      <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                        SALE
                      </div>
                      {product.condition && (
                        <span className="absolute top-3 left-3 bg-gray-200 bg-opacity-80 backdrop-blur-sm text-black text-xs font-medium px-2 py-1 rounded-sm z-10">
                          {product.condition.replace(/_/g, ' ').toUpperCase()}
                        </span>
                      )}
                      
                      {/* Brand Logo/Badge */}
                      {(product.brand || (product.brandDetails && product.brandDetails.length > 0)) && (
                        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm shadow-sm rounded-sm px-2.5 py-1.5 text-xs font-medium tracking-wide z-10">
                          {(typeof product.brand === 'string' ? product.brand : 
                           (product.brandDetails && product.brandDetails[0]?.name) || 
                           (product.brand?.name || 'Brand')).toUpperCase()}
                        </div>
                      )}
                      
                      {/* Hover overlay with quick action button */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 pointer-events-none flex items-center justify-center">
                        {/* <span className="bg-white text-black rounded-md px-4 py-2 font-medium text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto">
                          View Details
                        </span> */}
                      </div>
                    </div>
                    
                    <div className="p-5 bg-white">
                      <h2 className="text-base font-medium mb-2 truncate tracking-wide">{product.product_name.toUpperCase()}</h2>
                      <div className="mt-3 space-y-1.5">
                        <div className="flex flex-col">
                          <span className="text-gray-500 text-sm">
                            Estimated Retail Price: <span className="line-through">₹{product.estimated_price?.toLocaleString() || 'N/A'}</span>
                          </span>
                          <div className="flex flex-col gap-1 mt-1">
                          {product.discount_price > 0 && (
                          <span className="text-gray-900 font-medium">
                            Our Price:<span className="line-through"> ₹{product.price?.toLocaleString() || 'N/A'}</span>
                          </span>
                          )}
                            {product.discount_price > 0 && (
                              <span className="text-red-600 font-bold">
                                Sale Price: ₹{product.discount_price?.toLocaleString() || 'N/A'}
                              </span>
                            )}
                            {product.estimated_price > product.discount_price && (
                              <span className="text-xs px-1.5 py-0.5 bg-black text-white rounded-sm w-fit">
                                {Math.round((1 - product.discount_price / product.estimated_price) * 100)}% OFF
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Limited Time Offers Banner */}
              <motion.div 
                className="my-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-8 text-white text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold mb-3"
                  animate={{ 
                    scale: [1, 1.03, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  LIMITED TIME OFFERS
                </motion.h3>
                {/* <p className="text-lg mb-6">Additional 10% off on all sale items. Use code: <span className="font-bold">SALE10</span></p> */}
                {/* <div className="flex flex-wrap justify-center gap-4">
                  <motion.div
                    className="bg-black bg-opacity-20 backdrop-blur-sm rounded-lg p-4 px-6 inline-flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-center">
                      <span className="block text-3xl font-bold">24</span>
                      <span className="text-xs opacity-80">HOURS</span>
                    </div>
                  </motion.div>
                  <motion.div
                    className="bg-black bg-opacity-20 backdrop-blur-sm rounded-lg p-4 px-6 inline-flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-center">
                      <span className="block text-3xl font-bold">36</span>
                      <span className="text-xs opacity-80">MINUTES</span>
                    </div>
                  </motion.div>
                  <motion.div
                    className="bg-black bg-opacity-20 backdrop-blur-sm rounded-lg p-4 px-6 inline-flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-center">
                      <span className="block text-3xl font-bold">59</span>
                      <span className="text-xs opacity-80">SECONDS</span>
                    </div>
                  </motion.div>
                </div> */}
              </motion.div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default SaleItems;