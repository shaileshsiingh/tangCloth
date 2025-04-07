import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import axios from 'axios';

// Styled button component for consistent styling across the application
// const StyledButton = ({ children, onClick, className = "", ...props }) => (
//   <motion.button
//     className={`bg-[#B2FFFF] hover:bg-[#8EEAEA] text-gray-800 font-medium px-6 py-2.5 rounded-lg shadow-md transition-all duration-300 flex items-center ${className}`}
//     whileHover={{ scale: 1.05 }}
//     whileTap={{ scale: 0.95 }}
//     onClick={onClick}
//     {...props}
//   >
//     {children}
//   </motion.button>
// );

function ProductList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 18000]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const initialLoadRef = useRef(false);
  const [category_id_state, setCategory_id_state] = useState(null);
  const [sub_category_id_state, setSub_category_id_state] = useState(null);
  const [sub_sub_category_id_state, setSub_sub_category_id_state] = useState(null);
  const [brands, setBrands] = useState([]);
  const [brandsLoading, setBrandsLoading] = useState(true);
  const [selectedCondition, setSelectedCondition] = useState('');

  const itemsPerPage = 12;

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

  // Filter options
  // const colors = ['Red', 'Blue', 'Green', 'Black', 'White'];
  const sizes = ['S', 'M', 'L', 'XL'];
  // const brands = [
  //   { id: '67d8454223fd32371a042167', name: 'H&M' },
  //   { id: '67d8454a23fd32371a04216a', name: 'Zara' },
  //   { id: '67d8455123fd32371a04216d', name: 'Nike' },
  //   { id: '67d8455823fd32371a042170', name: 'Adidas' },
  //   { id: '67d8455f23fd32371a042173', name: 'Gucci' },
  //   { id: '67d8456023fd32371a042174', name: 'JIMMY CHOO' },
  //   { id: '67d8456123fd32371a042175', name: 'GG' },  
  //   { id: '67d8456223fd32371a042176', name: 'roberto cavalli' },
  //   { id: '67d8456323fd32371a042177', name: 'POLO RALPH LAUREN' },
  //   { id: '67d8456423fd32371a042178', name: 'LOUIS VUITTON' }
  // ];

  // Category structure
  const subcategoryStructure = {
    '67c82a32ac6e3964ca7755f7': [ // Men
      { id: '67d8282003c676492cbbeb40', name: 'Clothing' },
      { id: '67d8283003c676492cbbeb44', name: 'Footwear' },
      { id: '67d827fd03c676492cbbeb3c', name: 'Accessories' }
    ],
    '67c08f837f61f5f03104ec4b': [ // Women
      { id: '67d826ef03c676492cbbeb2d', name: 'All Bags' },
      { id: '67d8276703c676492cbbeb33', name: 'Clothing' },
      { id: '67d8276003c676492cbbeb30', name: 'Footwear' },
      { id: '67d8277e03c676492cbbeb39', name: 'Accessories' },
      { id: '67d8277203c676492cbbeb36', name: 'Fine Jewellery' }
    ],
    '67c9b33fb372a96364d09e3b': [ // Kids
      { id: '67d828ed03c676492cbbeb4d', name: 'Clothing' },
      { id: '67d8292603c676492cbbeb65', name: 'Footwear' },
      { id: '67d828d103c676492cbbeb48', name: 'Accessories' }
    ]
  };

  const subSubcategoryStructure = {
    // Women's All Bags
    '67d826ef03c676492cbbeb2d': [
      { id: '67e1a5742328f40a1515b803', name: 'Tote Bags' },
      { id: '67e1a6292328f40a1515b853', name: 'Shoulder Bags' },
      { id: '67e1a6342328f40a1515b858', name: 'Clutch' },
      { id: '67e1a63e2328f40a1515b85d', name: 'Sling Bags' },
      { id: '67e1a6482328f40a1515b862', name: 'Mini Bags' },
      { id: '67e5b3c25eb5e80a2ac15b95', name: 'Satchel Bags' },
      { id: '67e5b3cc5eb5e80a2ac15b9a', name: 'Handbags' },
      { id: '67e5b3d65eb5e80a2ac15b9f', name: 'Beltbags' },
      { id: '67e5b3e05eb5e80a2ac15ba4', name: 'Wristlet' }
    ],
    
    // Women's Clothing
    '67d8276703c676492cbbeb33': [
      { id: '67e5b3f35eb5e80a2ac15ba9', name: 'Dresses & Gowns' },
      { id: '67e5b3fe5eb5e80a2ac15bae', name: 'Skirts & Shorts' },
      { id: '67e5b4085eb5e80a2ac15bb3', name: 'T Shirts & Shirts' },
      { id: '67e5b4125eb5e80a2ac15bb8', name: 'Trousers & Denims' },
      { id: '67e5b41c5eb5e80a2ac15bbd', name: 'Jackets & Outerwear' },
      { id: '67e5b4275eb5e80a2ac15bc2', name: 'Jumpsuits' },
      { id: '67e5b4325eb5e80a2ac15bc7', name: 'Co-Ord Sets Womens' },
      { id: '67e5b43c5eb5e80a2ac15bcc', name: 'Swim Suit' }
    ],
    
    // Women's Footwear
    '67d8276003c676492cbbeb30': [
      { id: '67e5b4465eb5e80a2ac15bd1', name: 'Boots' },
      { id: '67e5b4505eb5e80a2ac15bd6', name: 'Espadrilles & Loafers' },
      { id: '67e5b45c5eb5e80a2ac15bdb', name: 'Flats & Slippers' },
      { id: '67d8290a03c676492cbbeb59', name: 'Heels & Wedges' },
      { id: '67e5b4705eb5e80a2ac15be5', name: 'Peeptoes' },
      { id: '67e5b47a5eb5e80a2ac15bea', name: 'Sneakers' }
    ],
    
    // Women's All Accessories
    '67d8277e03c676492cbbeb39': [
      { id: '67e5b4845eb5e80a2ac15bef', name: 'Belts' },
      { id: '67e5b48f5eb5e80a2ac15bf4', name: 'Watches' },
      { id: '67e5b4995eb5e80a2ac15bf9', name: 'Shawls & Scarves' },
      { id: '67e5b4a35eb5e80a2ac15bfe', name: 'Sunglasses' },
      { id: '67e5b4ae5eb5e80a2ac15c03', name: 'Small Accessories' }
    ],
    
    // Women's Fine Jewellery
    '67d8277203c676492cbbeb36': [
      { id: '67e5b4b85eb5e80a2ac15c08', name: 'Earrings' },
      { id: '67e5b4c25eb5e80a2ac15c0d', name: 'Rings' },
      { id: '67e5b4cd5eb5e80a2ac15c12', name: 'Charms & Bracelets' },
      { id: '67e5b4d75eb5e80a2ac15c17', name: 'Necklaces' }
    ],
    
    // Men's Accessories
    '67d827fd03c676492cbbeb3c': [
      { id: '67e5b4e35eb5e80a2ac15c1c', name: 'Belts' },
      { id: '67e5b4ed5eb5e80a2ac15c21', name: 'Sunglasses' },
      { id: '67e5b4f75eb5e80a2ac15c26', name: 'Scarves' },
      { id: '67e5b5015eb5e80a2ac15c2b', name: 'Caps' }
    ],
    
    // Men's Clothing
    '67d8282003c676492cbbeb40': [
      { id: '67e1a5812328f40a1515b808', name: 'Shirts' },
      { id: '67e1a58e2328f40a1515b80d', name: 'Track Suits' },
      { id: '67e1a5982328f40a1515b812', name: 'T-Shirts' },
      { id: '67e1a5a42328f40a1515b817', name: 'Trousers & Denims' },
      { id: '67e1a5b32328f40a1515b81c', name: 'Jackets & Outerwear' },
      { id: '67e1a5bd2328f40a1515b821', name: 'Shorts' }
    ],
    
    // Men's Footwear
    '67d8283003c676492cbbeb44': [
      { id: '67e1a5c92328f40a1515b826', name: 'Boots' },
      { id: '67e1a5d52328f40a1515b82b', name: 'Espadrilles' },
      { id: '67e1a5e02328f40a1515b830', name: 'Loafers & Moccasins' },
      { id: '67e1a5ec2328f40a1515b835', name: 'Sliders & Slippers' },
      { id: '67e1a5f52328f40a1515b83a', name: 'Sneakers' }
    ],
    
    // Kids' Accessories
    '67d828d103c676492cbbeb48': [
      { id: '67e5b50b5eb5e80a2ac15c30', name: 'Belts' },
      { id: '67e5b5155eb5e80a2ac15c35', name: 'Caps' }
    ],
    
    // Kids' Clothing
    '67d828ed03c676492cbbeb4d': [
      { id: '67e5b51f5eb5e80a2ac15c3a', name: 'T Shirts & Shirts' },
      { id: '67e5b5295eb5e80a2ac15c3f', name: 'Denims & Trousers' },
      { id: '67e5b5335eb5e80a2ac15c44', name: 'Shorts & Skirts' },
      { id: '67e5b53d5eb5e80a2ac15c49', name: 'Playsuit & Jumpsuit' },
      { id: '67e5b5475eb5e80a2ac15c4e', name: 'Onesies & Rompers' },
      { id: '67e5b5515eb5e80a2ac15c53', name: 'Jackets & Outerwear' },
      { id: '67e5b55b5eb5e80a2ac15c58', name: 'Dresses' },
      { id: '67e5b5655eb5e80a2ac15c5d', name: 'Co-Ords Sets' }
    ],
    
    // Kids' Footwear
    '67d8292603c676492cbbeb65': [
      { id: '67e5b56f5eb5e80a2ac15c62', name: 'Shoes' }
    ]
  };

  // Get URL parameters
  const [searchParams] = useSearchParams();
  const category_id_url = searchParams.get('category_id');
  const sub_category_id_url = searchParams.get('sub_category_id');
  const subSubCategoryid = searchParams.get('subSubCategoryid');
  const categoryName_url = searchParams.get('categoryName');
  const subcategoryName_url = searchParams.get('subcategoryName');
  const subSubcategoryName_url = searchParams.get('subSubcategoryName');

  console.log('URL Parameters:', {
    category_id: category_id_url,
    sub_category_id: sub_category_id_url,
    subSubCategoryid: subSubCategoryid
  });

  // Get category IDs from location state
  const category_id_state_state = location.state?.category_id || null;
  const sub_category_id_state_state = location.state?.sub_category_id || null;
  const sub_sub_category_id_state_state = location.state?.sub_sub_category_id || null;

  // Log these values to confirm they're being extracted
  console.log('Extracted category IDs from state:', {
    category_id: category_id_state_state,
    sub_category_id: sub_category_id_state_state,
    sub_sub_category_id: sub_sub_category_id_state_state
  });

  // Fetch all products
  const API_URL = '/api'
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/product/list`);
      // const response = await axios.get(`http://91.203.135.152:2001/api/product/list`);


      if (response.data.success) {
        const allProducts = response.data.data.products || [];
        setProducts(allProducts);
        setFilteredProducts(allProducts);
        setTotalProducts(allProducts.length);
        setTotalPages(Math.ceil(allProducts.length / itemsPerPage));
        console.log('Total products loaded:', allProducts.length);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setError(error.message);
    } finally {
      setLoading(false);
      setDataLoaded(true);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;
      fetchProducts();
    }
  }, [fetchProducts]);

  // Add a useEffect to handle state-based filtering
  useEffect(() => {
    if (!dataLoaded || !category_id_state_state) return;
    
    console.log('Applying filters from router state:', {
      category_id: category_id_state_state,
      sub_category_id: sub_category_id_state_state, 
      sub_sub_category_id: sub_sub_category_id_state_state
    });
    
    // Set UI state to match the passed-in state
    if (category_id_state_state) {
      // Find the category name from the ID
      const categoryEntry = Object.entries(categoryIds).find(
        ([_, id]) => id === category_id_state_state
      );
      
      if (categoryEntry) {
        setSelectedCategory(categoryEntry[0]); // 'men', 'women', or 'kids'
      }
    }
    
    // Just trigger the filtering process - the main filter effect will handle the rest
    if (sub_category_id_state_state) {
      setSelectedSubcategory(sub_category_id_state_state);
    }
    
    if (sub_sub_category_id_state_state) {
      setSelectedSubSubcategory(sub_sub_category_id_state_state);
    }
    
  }, [category_id_state_state, sub_category_id_state_state, sub_sub_category_id_state_state, dataLoaded]);

  // Apply filters whenever dependencies change
  useEffect(() => {
    if (!dataLoaded || !products.length) return;

    let filtered = [...products];
    console.log('Starting filtering with', filtered.length, 'products');
    console.log('Using filter values:', {
      category_id_state_state,
      sub_category_id_state_state,
      sub_sub_category_id_state_state,
      selectedCategory,
      selectedSubcategory,
      selectedSubSubcategory
    });

    // Apply category filters from state or URL params
    const catId = category_id_state_state;
    const subCatId = sub_category_id_state_state; 
    const subSubCatId = sub_sub_category_id_state_state;
    
    console.log('Active filter IDs:', { catId, subCatId, subSubCatId });
    
    if (catId || subCatId || subSubCatId) {
      filtered = filtered.filter(product => {
        if (catId && product.category_id !== catId) return false;
        if (subCatId && product.sub_category_id !== subCatId) return false;
        if (subSubCatId && product.sub_sub_category_id !== subSubCatId) return false;
        return true;
      });
      console.log('After category filters:', filtered.length);
    } 
    // Otherwise apply UI filters
    else if (selectedCategory !== 'all') {
      const categoryId = categoryIds[selectedCategory];
      filtered = filtered.filter(product => product.category_id === categoryId);
      console.log('After category filter:', filtered.length);
      
      if (selectedSubcategory) {
        filtered = filtered.filter(product => product.sub_category_id === selectedSubcategory);
        console.log('After subcategory filter:', filtered.length);
      }
      
      if (selectedSubSubcategory) {
        filtered = filtered.filter(product => product.sub_sub_category_id === selectedSubSubcategory);
        console.log('After sub-subcategory filter:', filtered.length);
      }
    }

    // CRITICAL FIX: Only apply other filters if user has explicitly set them
    // This prevents automatic filtering when no filters are selected
    const hasAppliedFilters = (
      selectedColor || 
      selectedSize || 
      selectedBrand || 
      searchTerm || 
      priceRange[0] > 0 || 
      priceRange[1] < 18000
    );

    if (hasAppliedFilters) {
      filtered = filtered.filter(product => {
      // Price filter
        const price = product.price ?? 0;
        const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      
      // Color filter
        const matchesColor = !selectedColor || product.color === selectedColor;
        
        // Size filter
        const matchesSize = !selectedSize || 
                          (product.sizes && Array.isArray(product.sizes) && 
                           product.sizes.some(s => s && s.size === selectedSize));
      
      // Brand filter
        const matchesBrand = !selectedBrand || product.brand_id === selectedBrand;
        
        // Search filter
      const matchesSearch = !searchTerm || 
                          (product.product_name && 
                           product.product_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (product.description && 
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()));
        
        return matchesPrice && matchesColor && matchesSize && matchesBrand && matchesSearch;
      });
      
      console.log('Filter debug counts:', {
        price: 0,
        color: 0,
        size: 0,
        brand: 0,
        search: 0
      });
    }
    
    console.log('After filters applied:', filtered.length);

    // Apply sorting
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    
    setFilteredProducts(filtered);
    setTotalProducts(filtered.length);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1); // Reset to first page when filters change
  }, [
    products,
    selectedCategory,
    selectedSubcategory,
    selectedSubSubcategory,
    priceRange,
    selectedColor,
    selectedSize,
    selectedBrand,
    searchTerm,
    sortBy,
    category_id_state_state,
    sub_category_id_state_state,
    sub_sub_category_id_state_state,
    dataLoaded
  ]);

  // Update displayed products when page or filtered products change
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedProducts(filteredProducts.slice(startIndex, endIndex));
  }, [currentPage, filteredProducts, itemsPerPage]);
  
  // Reset all filters completely
  const resetFilters = useCallback(() => {
    // Clear all state filters
    setSelectedCategory('all');
    setSelectedSubcategory('');
    setSelectedSubSubcategory('');
    setSelectedColor('');
    setSelectedSize('');
    setSelectedBrand('');
    setPriceRange([0, 18000]);
    setSearchTerm('');
    setSortBy('default');
    setCurrentPage(1);
    
    // Reset URL to remove all filter parameters - CRITICAL for proper reset
    navigate('/shop', { replace: true });
    
    console.log('All filters reset');
  }, [navigate]);

  // Handle category change
  const handleCategoryChange = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory('all');
    } else {
      setSelectedCategory(category);
      setSelectedSubcategory('');
      setSelectedSubSubcategory('');
    }
      setSearchTerm('');
  };
  
  // Handle subcategory change
  const handleSubcategoryChange = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId === selectedSubcategory ? '' : subcategoryId);
    setSelectedSubSubcategory('');
      setSearchTerm('');
  };

  // Handle sub-subcategory change
  const handleSubSubcategoryChange = (subSubcategoryId) => {
    setSelectedSubSubcategory(subSubcategoryId === selectedSubSubcategory ? '' : subSubcategoryId);
      setSearchTerm('');
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // Render subcategories
  const renderSubcategories = () => {
    const activeCategoryId = category_id_state_state || (selectedCategory !== 'all' ? categoryIds[selectedCategory] : null);
    if (!activeCategoryId) return null;
    
    const subcategories = subcategoryStructure[activeCategoryId] || [];
    if (subcategories.length === 0) return null;
    
    return (
      <div className="mb-6">
        <h3 className="font-medium mb-2">Subcategories</h3>
        <div className="flex flex-wrap gap-2">
          {subcategories.map(subcat => (
            <button
              key={subcat.id}
              className={`px-3 py-1 text-sm rounded ${
                (sub_category_id_state_state === subcat.id || selectedSubcategory === subcat.id) 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => handleSubcategoryChange(subcat.id)}
            >
              {subcat.name}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Render sub-subcategories
  const renderSubSubcategories = () => {
    const activeSubcategoryId = sub_category_id_state_state || selectedSubcategory;
    if (!activeSubcategoryId) return null;
    
    const subSubcategories = subSubcategoryStructure[activeSubcategoryId] || [];
    if (subSubcategories.length === 0) return null;
    
    return (
      <div className="mb-6">
        <h3 className="font-medium mb-2">Types</h3>
        <div className="flex flex-wrap gap-2">
          {subSubcategories.map(subSubcat => (
            <button
              key={subSubcat.id}
              className={`px-3 py-1 text-sm rounded ${
                (sub_sub_category_id_state_state === subSubcat.id || selectedSubSubcategory === subSubcat.id)
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => handleSubSubcategoryChange(subSubcat.id)}
            >
              {subSubcat.name}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Pagination controls
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    return (
      <div className="flex justify-center mt-8 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          <ChevronLeft size={16} />
        </button>
        
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-3 py-1 rounded ${
                currentPage === pageNumber ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    );
  };

  // Use this ID in your filtering logic
  useEffect(() => {
    if (!dataLoaded || !products.length) return;
    
    console.log(`Filtering by subSubCategoryid: ${subSubCategoryid}`);
    console.log(`Total products before filtering: ${products.length}`);
    
    let filtered = [...products];
    
    // Apply filtering based on the sub-subcategory ID
    if (subSubCategoryid) {
      // Debug: Print out all sub_sub_category_id values to check for mismatches
      const uniqueSubSubCategories = [...new Set(products.map(p => p.sub_sub_category_id))];
      console.log('Available sub_sub_category_ids in products:', uniqueSubSubCategories);
      
      filtered = filtered.filter(product => product.sub_sub_category_id === subSubCategoryid);
      console.log('After filtering by subSubCategoryid:', filtered.length);
      
      // If we have matches, update the UI state
      if (filtered.length > 0) {
        const firstProduct = filtered[0];
        console.log('First matched product:', {
          id: firstProduct._id,
          name: firstProduct.product_name,
          category_id: firstProduct.category_id,
          sub_category_id: firstProduct.sub_category_id
        });
        
        // Find and set the category name
        for (const [catName, catId] of Object.entries(categoryIds)) {
          if (catId === firstProduct.category_id) {
            setSelectedCategory(catName);
            console.log(`Setting selected category to: ${catName}`);
            break;
          }
        }
        
        // Set subcategory
        setSelectedSubcategory(firstProduct.sub_category_id);
        console.log(`Setting selected subcategory to: ${firstProduct.sub_category_id}`);
        
        // Set sub-subcategory
        setSelectedSubSubcategory(subSubCategoryid);
      } else {
        console.log('No products found with sub_sub_category_id:', subSubCategoryid);
      }
    }
    
    setFilteredProducts(filtered);
    setTotalProducts(filtered.length);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  }, [subSubCategoryid, products, dataLoaded]);

  // Add this to your filtering logic in ProductList.jsx

  // Inside your filtering useEffect
  if (sub_category_id_url) {
    // Check if sub_category_id contains comma-separated values
    if (sub_category_id_url.includes(',')) {
      const subCategoryIds = sub_category_id_url.split(',');
      console.log(`Filtering by multiple subcategory IDs: ${subCategoryIds}`);
      
      // Filter products that match ANY of the subcategory IDs (OR condition)
      filtered = filtered.filter(product => 
        subCategoryIds.includes(product.sub_category_id)
      );
    } else {
      // Regular single subcategory filter
      filtered = filtered.filter(product => 
        product.sub_category_id === sub_category_id_url
      );
    }
    console.log('After subcategory filter:', filtered.length);
  }

  // Add this useEffect near the top of your component, after your state declarations
  // This focuses solely on handling URL parameters

  useEffect(() => {
    if (!dataLoaded || !products.length) return;
    
    // Get URL parameters
    const categoryIdParam = searchParams.get('category_id');
    const subCategoryIdParam = searchParams.get('sub_category_id');
    const subSubCategoryIdParam = searchParams.get('subSubCategoryid');
    
    // Only proceed if we have URL parameters
    if (categoryIdParam || subCategoryIdParam || subSubCategoryIdParam) {
      console.log("Processing URL parameters:", {
        category_id: categoryIdParam,
        sub_category_id: subCategoryIdParam,
        subSubCategoryid: subSubCategoryIdParam
      });
      
      // Start with all products
      let filtered = [...products];
      
      // Apply category filter if present
      if (categoryIdParam) {
        filtered = filtered.filter(product => product.category_id === categoryIdParam);
        console.log(`After category filter ${categoryIdParam}:`, filtered.length);
        
        // Update UI state
        for (const [catName, catId] of Object.entries(categoryIds)) {
          if (catId === categoryIdParam) {
            setSelectedCategory(catName);
            break;
          }
        }
      }
      
      // Apply subcategory filter if present
      if (subCategoryIdParam) {
        if (subCategoryIdParam.includes(',')) {
          const subCatIds = subCategoryIdParam.split(',');
          filtered = filtered.filter(product => subCatIds.includes(product.sub_category_id));
          console.log(`After filtering by multiple subcategories:`, filtered.length);
        } else {
          filtered = filtered.filter(product => product.sub_category_id === subCategoryIdParam);
          console.log(`After subcategory filter ${subCategoryIdParam}:`, filtered.length);
        }
        
        // Update UI state
        setSelectedSubcategory(subCategoryIdParam);
      }
      
      // Apply sub-subcategory filter if present
      if (subSubCategoryIdParam) {
        filtered = filtered.filter(product => product.sub_sub_category_id === subSubCategoryIdParam);
        console.log(`After sub-subcategory filter ${subSubCategoryIdParam}:`, filtered.length);
        
        // Update UI state
        setSelectedSubSubcategory(subSubCategoryIdParam);
      }
      
      // Update states with filtered products
      setFilteredProducts(filtered);
      setTotalProducts(filtered.length);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    }
  }, [searchParams, products, dataLoaded, categoryIds]);

  // Colors for filtering - add all the popular colors
  const popularColors = [
    'Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 
    'Brown', 'Gray', 'Pink', 'Orange', 'Beige', 'Navy', 'Olive'
  ];

  // Fetch brands from API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setBrandsLoading(true);
        const token = localStorage.getItem('authToken');

        const response = await fetch(`${API_URL}/brand/get-brands`, {
              // const response = await fetch(`http://91.203.135.152:2001/brand/get-brands`,{

          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch brands');
        }
        
        const responseData = await response.json();
        
        // The data structure is { success, message, data[] }
        // where data is the brands array directly
        if (responseData.success && Array.isArray(responseData.data)) {
          setBrands(responseData.data);
          console.log('Brands loaded:', responseData.data.length);
        } else {
          console.error('Unexpected brand data format:', responseData);
          setBrands([]);
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
        setBrands([]);
      } finally {
        setBrandsLoading(false);
      }
    };
    
    fetchBrands();
  }, []);

  // Add this to the top of your useEffect
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const subSubCategoryid = queryParams.get('subSubCategoryid');
    
    console.log('URL subSubCategoryid:', subSubCategoryid);
    
    if (subSubCategoryid) {
      // Filter products based on this ID
      // ...
    }
  }, []);

  // Add this effect to your ProductList component to handle brandId parameter

  useEffect(() => {
    // Get brandId from URL parameters
    const queryParams = new URLSearchParams(window.location.search);
    const brandId = queryParams.get('brandId');
    
    if (brandId) {
      console.log(`Filtering products by brand ID: ${brandId}`);
      setSelectedBrand(brandId);
      
      // If we already have products loaded, filter them by brand
      if (products.length > 0) {
        const filteredByBrand = products.filter(product => 
          product.brand_id === brandId || product.brand?._id === brandId);
        setFilteredProducts(filteredByBrand);
        console.log(`Found ${filteredByBrand.length} products for this brand`);
      }
      
      // If we don't have products loaded yet, we can add logic to fetch them by brand directly
      // ...
    }
  }, [window.location.search, products]);

  // Update your applyAllFilters function to include brand filtering
  const applyAllFilters = useCallback(() => {
    let result = [...products];
    
    // Apply brand filter
    if (selectedBrand) {
      result = result.filter(product => 
        product.brand_id === selectedBrand || product.brand?._id === selectedBrand);
    }
    
    // Other filter logic...
    // ...
    
    setFilteredProducts(result);
    setTotalProducts(result.length);
    setTotalPages(Math.ceil(result.length / itemsPerPage));
    setCurrentPage(1);
  }, [products, selectedBrand, /* other dependencies */]);

  // Filter products by condition
  useEffect(() => {
    let filtered = [...products];
    if (selectedCondition) {
      filtered = filtered.filter(product => product.condition === selectedCondition);
    }
    setFilteredProducts(filtered);
  }, [selectedCondition, products]);

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
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      {/* <div className="product-list-controls flex justify-between items-center mb-8">
        <StyledButton onClick={fetchProducts}>
          Refresh Products
        </StyledButton>
      </div> */}

      <div className="mb-10 border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-medium tracking-wide">
          {subSubcategoryName_url || subcategoryName_url || categoryName_url || 'All Products'}
        </h2>
        
        <nav className="text-sm text-gray-500 mt-2 mb-4">
          <ol className="flex">
            <li>
              <Link to="/" className="hover:text-black">Home</Link>
            </li>
            <li className="mx-2">/</li>
            <li>
              <Link to="/products" className="hover:text-black">Products</Link>
            </li>
            
            {categoryName_url && (
              <>
                <li className="mx-2">/</li>
                <li>
                  <Link 
                    to={`/products?category_id=${category_id_url}&categoryName=${categoryName_url}`}
                    className="hover:text-black"
                  >
                    {categoryName_url}
                  </Link>
                </li>
              </>
            )}
            
            {subcategoryName_url && (
              <>
                <li className="mx-2">/</li>
                <li>
                  <Link 
                    to={`/products?category_id=${category_id_url}&categoryName=${categoryName_url}&sub_category_id=${sub_category_id_url}&subcategoryName=${subcategoryName_url}`}
                    className="hover:text-black"
                  >
                    {subcategoryName_url}
                  </Link>
                </li>
              </>
            )}
            
            {subSubcategoryName_url && (
              <>
                <li className="mx-2">/</li>
                <li className="text-black font-medium">{subSubcategoryName_url}</li>
              </>
            )}
          </ol>
        </nav>
      </div>

      {/* Filters Section - Now at the top */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-serif tracking-wide">FILTERS</h2>
          <button 
            onClick={resetFilters}
            className="px-3 py-1 bg-gray-100 text-black text-xs rounded hover:bg-gray-200 transition-all duration-300"
          >
            Reset All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-2 text-sm uppercase">Categories</h3>
            <ul className="space-y-1">
              {Object.entries(categories).map(([key, value]) => (
                <li key={key}>
                  <button
                    className={`text-left w-full text-sm py-1 ${selectedCategory === key ? 'font-bold' : ''}`}
                    onClick={() => handleCategoryChange(key)}
                  >
                    {value}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Subcategories - Only show when a category is selected */}
          {selectedCategory !== 'all' && (
            <div>
              <h3 className="font-semibold mb-2 text-sm uppercase">Subcategories</h3>
              <div className="flex flex-wrap gap-2">
                {renderSubcategories()}
              </div>
            </div>
          )}

          {/* Types - Only show when a subcategory is selected */}
          {selectedSubcategory && (
            <div>
              <h3 className="font-semibold mb-2 text-sm uppercase">Types</h3>
              <div className="flex flex-wrap gap-2">
                {renderSubSubcategories()}
              </div>
            </div>
          )}

          {/* Price Range */}
          <div>
            <h3 className="font-semibold mb-2 text-sm uppercase">Price Range</h3>
            <div className="space-y-2">
              <div className="flex justify-between gap-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-1/2 border p-1 text-sm rounded"
                  min="0"
                  max="18000"
                />
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-1/2 border p-1 text-sm rounded"
                  min="0"
                  max="18000"
                />
              </div>
              <input
                type="range"
                min="0"
                max="18000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Color */}
          <div>
            <h3 className="font-semibold mb-2 text-sm uppercase">Color</h3>
            <select
              value={selectedColor || ''}
              onChange={(e) => setSelectedColor(e.target.value || null)}
              className="w-full p-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="">All Colors</option>
              {popularColors.map(color => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>

          {/* Size */}
          <div>
            <h3 className="font-semibold mb-2 text-sm uppercase">Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`px-2 py-1 text-xs rounded ${
                    selectedSize === size 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Brand */}
          <div>
            <h3 className="font-semibold mb-2 text-sm uppercase">Brand</h3>
            {brandsLoading ? (
              <p className="text-sm text-gray-500">Loading brands...</p>
            ) : (
              <select
                value={selectedBrand || ''}
                onChange={(e) => setSelectedBrand(e.target.value || null)}
                className="w-full p-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name.toUpperCase()}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Condition */}
          <div>
            <h3 className="font-semibold mb-2 text-sm uppercase">Condition</h3>
            <select
              className="w-full p-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
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
        </div>
      </div>

      {/* Products Grid */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
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
              className="w-full md:w-64 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="w-full md:w-auto border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black/50 transition-all duration-300"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default sorting</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
            <motion.div
              key={product._id}
              className="overflow-hidden cursor-pointer group relative bg-white border border-gray-100 rounded-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
              whileHover={{ scale: 1.02 }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/product/${product._id}`, { state: { product } });
              }}
            >
              <div className="relative aspect-[4/5]">
                <img
                  src={product.images?.[0] || 'https://via.placeholder.com/300x300'}
                  alt={product.product_name}
                  className="absolute top-0 left-0 w-full h-full object-contain p-4"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300';
                  }}
                />
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
                
                <div className="absolute right-3 top-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                  <button 
                    className="bg-black rounded-full p-2 shadow-md hover:bg-gray-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToWishlist(product);
                    }}
                    title="Add to Wishlist"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="white" 
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-90 backdrop-blur-sm transform transition-transform duration-500 translate-y-full group-hover:translate-y-0 z-10">
                <button 
                  className="w-full py-4 text-white font-medium tracking-wide letter-spacing transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${product._id}`, { state: { product } });
                  }}
                >
                  SHOP NOW
                </button>
              </div>
              
              <div className="p-5">
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
          ))
        ) : (
          <div className="col-span-4 text-center py-16 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-serif text-gray-600">No products found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </motion.div>

      {renderPagination()}

      {/* Shopping Experience Section */}
      <div className="mt-16 mb-12">
        <h2 className="text-2xl font-medium text-center mb-12">The Shopping Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Authenticity Guaranteed</h3>
            <p className="text-gray-600">Every item is thoroughly verified by our expert team to ensure 100% authenticity.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Premium Selection</h3>
            <p className="text-gray-600">Carefully curated collection of items from the world's most prestigious brands.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Personalized Service</h3>
            <p className="text-gray-600">Our team is available to assist with any inquiries or special requests.</p>
          </div>
        </div>
      </div>
      
      {/* Enhanced Services Section */}
      <div className="bg-white py-12 rounded-lg shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 2: Secured Payment */}
            <div className="flex items-center space-x-4 p-4">
              <img 
                src="https://wamani.vercel.app/wp-content/uploads/2023/06/Icon-Box-2.png" 
                alt="Secured Payment" 
                className="w-9 h-auto"
              />
              <div>
                <h3 className="font-medium text-lg">Secured Payment</h3>
                <p className="text-gray-600 text-sm">Safe & Secured Payments</p>
              </div>
            </div>
            
            {/* Feature 3: 24/7 Support */}
            <div className="flex items-center space-x-4 p-4">
              <img 
                src="https://wamani.vercel.app/wp-content/uploads/2023/06/Icon-Box-3.png" 
                alt="24/7 Support" 
                className="w-14 h-auto"
              />
              <div>
                <h3 className="font-medium text-lg">24/7 Support</h3>
                <p className="text-gray-600 text-sm">Support Around The Clock</p>
              </div>
            </div>
            
            {/* Feature 4: Surprise Gifts */}
            <div className="flex items-center space-x-4 p-4">
              <img 
                src="https://wamani.vercel.app/wp-content/uploads/2023/06/Icon-Box-4.png" 
                alt="Surprise Gifts" 
                className="w-8 h-auto"
              />
              <div>
                <h3 className="font-medium text-lg">Surprise Gifts</h3>
                <p className="text-gray-600 text-sm">Free Gift Cards & Vouchers</p>
              </div>
            </div>
            
            {/* Feature 5: Premium Quality */}
            <div className="flex items-center space-x-4 p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <div>
                <h3 className="font-medium text-lg">Premium Quality</h3>
                <p className="text-gray-600 text-sm">Only The Best Products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Show more products CTA */}
      <div className="text-center mt-16 mb-12">
        <h3 className="text-xl font-medium mb-6">Explore More Premium Collections</h3>
        <StyledButton
          onClick={() => navigate('/shop', { state: { resetFilters: true } })}
          className="mx-auto"
        >
          Show more products
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </StyledButton>
      </div>
    </div>
  );
}

export default ProductList;