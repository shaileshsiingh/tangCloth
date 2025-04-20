import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, User, ChevronDown, Search as SearchIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from './TopBar';
import Search from './Search';
import axios from 'axios';
// import logo from '../assets/logo.svg';

// Image Slider Component for category menus
const CategoryImageSlider = ({ images, category }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Auto slide every 3 seconds
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length]);

  const goToPrevious = (e) => {
    e.stopPropagation();
    setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = (e) => {
    e.stopPropagation();
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full h-64 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={`${category} collection ${index + 1}`}
            className="w-full h-full object-cover absolute"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentIndex ? 1 : 0,
              zIndex: index === currentIndex ? 1 : 0
            }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between px-3 z-10">
        <button 
          onClick={goToPrevious}
          className="p-1 rounded-full bg-white/70 text-gray-800 hover:bg-white"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={goToNext}
          className="p-1 rounded-full bg-white/70 text-gray-800 hover:bg-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
        {images.map((_, index) => (
          <div 
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

// Updated menu items with Men, Women, and Kids categories
const menuItems = {
  men: {
    title: 'Men',
    id: '67c82a32ac6e3964ca7755f7',
    sections: [
      {
        title: 'Clothing',
        id: '67d8282003c676492cbbeb40',
        items: [
          { name: 'Shirts', id: '67e1a5812328f40a1515b808' },
          { name: 'Track Suits', id: '67e1a58e2328f40a1515b80d' },
          { name: 'T-Shirts', id: '67e1a5982328f40a1515b812' },
          { name: 'Trousers & Denims', id: '67e1a5a42328f40a1515b817' },
          { name: 'Jackets & Outerwear', id: '67e1a5b32328f40a1515b81c' },
          { name: 'Shorts', id: '67e1a5bd2328f40a1515b821' }
        ]
      },
      {
        title: 'Footwear',
        id: '67d8283003c676492cbbeb44',
        items: [
          { name: 'Boots', id: '67e1a5c92328f40a1515b826' },
          { name: 'Espadrilles', id: '67e1a5d52328f40a1515b82b' },
          { name: 'Loafers & Moccasins', id: '67e1a5e02328f40a1515b830' },
          { name: 'Sliders & Slippers', id: '67e1a5ec2328f40a1515b835' },
          { name: 'Sneakers', id: '67e1a5f52328f40a1515b83a' }
        ]
      },
      {
        title: 'Accessories',
        id: '67d827fd03c676492cbbeb3c',
        items: [
          { name: 'Belts', id: '67e5b4e35eb5e80a2ac15c1c' },
          { name: 'Sunglasses', id: '67e5b4ed5eb5e80a2ac15c21' },
          { name: 'Scarves', id: '67e5b4f75eb5e80a2ac15c26' },
          { name: 'Caps', id: '67e5b5015eb5e80a2ac15c2b' }
        ]
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1550995694-3f5f4a7e1bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1536766820879-059fec98ec0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    ]
  },
  women: {
    title: 'Women',
    id: '67c08f837f61f5f03104ec4b',
    sections: [
      {
        title: 'All Bags',
        id: '67d826ef03c676492cbbeb2d',
        items: [
          { name: 'Tote Bags', id: '67e1a5742328f40a1515b803' },
          { name: 'Shoulder Bags', id: '67e1a6292328f40a1515b853' },
          { name: 'Clutch', id: '67e1a6342328f40a1515b858' },
          { name: 'Sling Bags', id: '67e1a63e2328f40a1515b85d' },
          { name: 'Mini Bags', id: '67e1a6482328f40a1515b862' },
          { name: 'Satchel Bags', id: '67e5b3c25eb5e80a2ac15b95' },
          { name: 'Handbags', id: '67e5b3cc5eb5e80a2ac15b9a' },
          { name: 'Beltbags', id: '67e5b3d65eb5e80a2ac15b9f' },
          { name: 'Wristlet', id: '67e5b3e05eb5e80a2ac15ba4' }
        ]
      },
      {
        title: 'Clothing',
        id: '67d8276703c676492cbbeb33',
        items: [
          { name: 'Dresses & Gowns', id: '67e5b3f35eb5e80a2ac15ba9' },
          { name: 'Skirts & Shorts', id: '67e5b3fe5eb5e80a2ac15bae' },
          { name: 'T Shirts & Shirts', id: '67e5b4085eb5e80a2ac15bb3' },
          { name: 'Trousers & Denims', id: '67e5b4125eb5e80a2ac15bb8' },
          { name: 'Jackets & Outerwear', id: '67e5b41c5eb5e80a2ac15bbd' },
          { name: 'Jumpsuits', id: '67e5b4275eb5e80a2ac15bc2' },
          { name: 'Co-Ord Sets Womens', id: '67e5b4325eb5e80a2ac15bc7' },
          { name: 'Swim Suit', id: '67e5b43c5eb5e80a2ac15bcc' }
        ]
      },
      {
        title: 'Footwear',
        id: '67d8276003c676492cbbeb30',
        items: [
          { name: 'Boots', id: '67e5b4465eb5e80a2ac15bd1' },
          { name: 'Espadrilles & Loafers', id: '67e5b4505eb5e80a2ac15bd6' },
          { name: 'Flats & Slippers', id: '67e5b45c5eb5e80a2ac15bdb' },
          { name: 'Heels & Wedges', id: '67d8290a03c676492cbbeb59' },
          { name: 'Peeptoes', id: '67e5b4705eb5e80a2ac15be5' },
          { name: 'Sneakers', id: '67e5b47a5eb5e80a2ac15bea' }
        ]
      },
      {
        title: 'Accessories',
        id: '67d8277e03c676492cbbeb39',
        items: [
          { name: 'Belts', id: '67e5b4845eb5e80a2ac15bef' },
          { name: 'Watches', id: '67e5b48f5eb5e80a2ac15bf4' },
          { name: 'Shawls & Scarves', id: '67e5b4995eb5e80a2ac15bf9' },
          { name: 'Sunglasses', id: '67e5b4a35eb5e80a2ac15bfe' },
          { name: 'Small Accessories', id: '67e5b4ae5eb5e80a2ac15c03' }
        ]
      },
      {
        title: 'Fine Jewellery',
        id: '67d8277203c676492cbbeb36',
        items: [
          { name: 'Earrings', id: '67e5b4b85eb5e80a2ac15c08' },
          { name: 'Rings', id: '67e5b4c25eb5e80a2ac15c0d' },
          { name: 'Charms & Bracelets', id: '67e5b4cd5eb5e80a2ac15c12' },
          { name: 'Necklaces', id: '67e5b4d75eb5e80a2ac15c17' }
        ]
      }
    ],
    images: [
      'https://tangerineluxury.com/wp-content/uploads/2022/12/michael-dagonakis-eaiqiA-PoTU-unsplash-1.png',
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      
    ]
  },
  kids: {
    title: 'Kids',
    id: '67c9b33fb372a96364d09e3b',
    sections: [
      {
        title: 'Clothing',
        id: '67d828ed03c676492cbbeb4d',
        items: [
          { name: 'T Shirts & Shirts', id: '67e5b51f5eb5e80a2ac15c3a' },
          { name: 'Denims & Trousers', id: '67e5b5295eb5e80a2ac15c3f' },
          { name: 'Shorts & Skirts', id: '67e5b5335eb5e80a2ac15c44' },
          { name: 'Playsuit & Jumpsuit', id: '67e5b53d5eb5e80a2ac15c49' },
          { name: 'Onesies & Rompers', id: '67e5b5475eb5e80a2ac15c4e' },
          { name: 'Jackets & Outerwear', id: '67e5b5515eb5e80a2ac15c53' },
          { name: 'Dresses', id: '67e5b55b5eb5e80a2ac15c58' },
          { name: 'Co-Ords Sets', id: '67e5b5655eb5e80a2ac15c5d' }
        ]
      },
      {
        title: 'Footwear',
        id: '67d8292603c676492cbbeb65',
        items: [
          { name: 'Shoes', id: '67e5b56f5eb5e80a2ac15c62' }
        ]
      },
      {
        title: 'Accessories',
        id: '67d828d103c676492cbbeb48',
        items: [
          { name: 'Belts', id: '67e5b50b5eb5e80a2ac15c30' },
          { name: 'Caps', id: '67e5b5155eb5e80a2ac15c35' }
        ]
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    ]
  },
  services: {
    title: 'Our Services',
    sections: [
      {
        title: 'Premium Services',
        items: [
          { name: 'Authentication', url: '/authentication' },
          { name: 'Bio Cleaning', url: '/bio-cleaning' },
          { name: 'Private Viewing', url: '/private-viewing' },
          { name: 'Request a Product', url: '/request-product' }
        ]
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1560243563-062bfc001d68?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    ]
  }
};

function Navbar() {
  const { cartItems, cartCount, isCartOpen, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState({
    women: false,
    men: false,
    kids: false,
    services: false
  });
  const [subcategoryDropdown, setSubcategoryDropdown] = useState('');
  const dropdownRef = useRef(null);
  
  // State for category/subcategory data
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subSubcategories, setSubSubcategories] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});
  
  // Add these state variables at the top with your other state declarations
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);
  
  // Fetch categories and subcategories on mount
  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    fetchSubSubcategories();
  }, []);
  
  // Create category map for easy access
  useEffect(() => {
    if (categories.length && subcategories.length && subSubcategories.length) {
      const map = {};
      
      // Map categories
      categories.forEach(cat => {
        const catName = cat.name.toLowerCase();
        map[catName] = {
          id: cat._id,
          subcategories: {}
        };
        
        // Map subcategories for this category
        subcategories.forEach(subcat => {
          if (subcat.category_id === cat._id) {
            map[catName].subcategories[subcat.name] = {
              id: subcat._id,
              subSubcategories: {}
            };
            
            // Map sub-subcategories for this subcategory
            subSubcategories.forEach(subSubcat => {
              if (subSubcat.sub_category_id === subcat._id) {
                map[catName].subcategories[subcat.name].subSubcategories[subSubcat.name] = {
                  id: subSubcat._id
                };
              }
            });
          }
        });
      });
      
      setCategoryMap(map);
    }
  }, [categories, subcategories, subSubcategories]);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      // const response = await axios.get('http://91.203.135.152:2001/api/category/getAllCategory');
      const response = await axios.get(`${API_URL}/category/getAllCategory`);
      if (response.data.success) {
        setCategories(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  // Fetch all subcategories
  const fetchSubcategories = async () => {
    try {
      // const response = await axios.get('http://91.203.135.152:2001/api/subCategory/sub-category');
      const response = await axios.get(`${API_URL}/subCategory/sub-category`);
      if (response.data.success) {
        setSubcategories(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };
  
  // Fetch all sub-subcategories
  const fetchSubSubcategories = async () => {
    try {
      // const response = await axios.get('http://91.203.135.152:2001/api/subSubCategory/sub-sub-category');
      const response = await axios.get(`${API_URL}/subSubCategory/sub-sub-category`);

      if (response.data.success) {
        setSubSubcategories(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching sub-subcategories:', error);
    }
  };

  // Category structure based on API data
  const getCategoryStructure = (categoryName) => {
    if (!categoryMap[categoryName] || !subcategories.length) return {};
    
    const result = {};
    const categoryId = categoryMap[categoryName].id;
    
    // Find subcategories for this category
    const categorySubs = subcategories.filter(sub => sub.category_id === categoryId);
    
    // Build structure
    categorySubs.forEach(sub => {
      // Find sub-subcategories for this subcategory
      const subSubs = subSubcategories.filter(subSub => subSub.sub_category_id === sub._id);
      result[sub.name] = subSubs.map(item => ({
        name: item.name,
        id: item._id
      }));
    });
    
    return result;
  };

  const handleToggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMouseEnter = (menuKey) => {
    setActiveMenu(menuKey);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const handleItemClick = (menuKey, sectionTitle, itemName) => {
    console.log(`Menu click: ${menuKey} > ${sectionTitle} > ${itemName}`);
    
    // Check if we're in the services menu
    if (menuKey === 'services') {
      // Find the matching service item
      const serviceItem = menuItems.services.sections
        .flatMap(section => section.items)
        .find(item => item.name === itemName);
        
      if (serviceItem && serviceItem.url) {
        console.log(`Service navigation to: ${serviceItem.url}`);
        navigate(serviceItem.url);
        return;
      }
    } else {
      // For product categories, find the section and item in the static menuItems
      try {
        const category = menuItems[menuKey];
        if (!category) {
          console.error(`Category not found: ${menuKey}`);
          return;
        }
        
        const section = category.sections.find(s => s.title === sectionTitle);
        if (!section) {
          console.error(`Section not found: ${sectionTitle}`);
          return;
        }
        
        const item = section.items.find(i => i.name === itemName);
        if (!item || !item.id) {
          console.error(`Item not found or missing ID: ${itemName}`);
          return;
        }
        
        // Use navigate
        const url = `/shop?subSubCategoryid=${item.id}`;
        console.log(`Category navigation to: ${url}`);
        navigate(url);
      } catch (error) {
        console.error('Navigation error:', error);
      }
    }
    
    // Close menus
    setMobileMenuOpen(false);
    setActiveMenu(null);
  };

  const handleUserClick = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Redirect to user-details page instead of profile
      navigate('/user-details');
    } else {
      navigate('/login');
    }
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    
    if (value.trim().length > 2) {
      // Show loading indicator
      setIsSearching(true);
      
      // Debounce the API call
      clearTimeout(searchTimeout);
      const newTimeout = setTimeout(() => {
        fetchSearchResults(value);
      }, 300);
      setSearchTimeout(newTimeout);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const API_URL = '/api'
  const fetchSearchResults = async (query) => {
    try {
      //  const response = await axios.get(`http://91.203.135.152:2001/api/product/list?search=${encodeURIComponent(query)}`);
      const response = await axios.get(`${API_URL}/product/list?search=${encodeURIComponent(query)}`);
      
      if (response.data.success && response.data.data.products) {
        // Limit to first 5 results
        setSearchResults(response.data.data.products.slice(0, 5));
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchResultClick = (product) => {
    // Log the full product object for debugging
    console.log("Clicked product:", product);
    
    // Check if the product has a valid ID
    if (!product || !product._id) {
      console.error("Invalid product or missing ID:", product);
      return;
    }
    
    // Include the entire product as state to ensure the product details page has the data
    navigate(`/product/${product._id}`, { 
      state: { product: product }
    });
    
    // Clear search related states
    setSearchValue('');
    setSearchResults([]);
    
    // Close any open UI elements
    if (mobileMenuOpen) setMobileMenuOpen(false);
    setIsSearchOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen({
          women: false,
          men: false,
          kids: false,
          services: false
        });
        setSubcategoryDropdown('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle dropdown
  const toggleDropdown = (category) => {
    setDropdownOpen({
      ...Object.keys(dropdownOpen).reduce((acc, key) => {
        acc[key] = key === category ? !dropdownOpen[key] : false;
        return acc;
      }, {})
    });
    setSubcategoryDropdown('');
  };

  // Toggle subcategory dropdown
  const toggleSubcategoryDropdown = (subcategory) => {
    setSubcategoryDropdown(subcategoryDropdown === subcategory ? '' : subcategory);
  };

  // Modify the navigateToFilteredProducts function to use query parameters
  const navigateToFilteredProducts = (categoryName, subcatName, subSubcatItem) => {
    if (!categoryMap[categoryName]) return;
    
    // Create a state object with all necessary IDs
    const filterState = {
      category_id: categoryMap[categoryName].id || null,
      sub_category_id: categoryMap[categoryName].subcategories[subcatName]?.id || null,
      sub_sub_category_id: subSubcatItem.id || null
    };
    
    // Navigate to /shop with state instead of query parameters
    navigate('/shop', { state: filterState });
    
    // Close dropdowns
    setDropdownOpen({
      women: false,
      men: false,
      kids: false,
      services: false
    });
    setSubcategoryDropdown('');
  };

  // Render subcategory dropdown
  const renderCategoryDropdown = (categoryName) => {
    const structure = getCategoryStructure(categoryName);
    
    return (
      <div className="absolute left-0 mt-2 bg-white border rounded-md shadow-lg z-10 w-48">
        {Object.keys(structure).map((subcatName) => (
          <div key={subcatName} className="relative">
            <button
              className="px-4 py-2 text-left w-full hover:bg-orange-400 flex justify-between items-center"
              onClick={() => toggleSubcategoryDropdown(`${categoryName}-${subcatName}`)}
            >
              <span>{subcatName}</span>
              <span>›</span>
            </button>
            
            {subcategoryDropdown === `${categoryName}-${subcatName}` && (
              <div className="absolute left-full top-0 bg-white border rounded-md shadow-lg z-20 w-48">
                {structure[subcatName].map((item) => (
                  <motion.li
                    key={item.id}
                    variants={itemVariants}
                    className="text-sm text-gray-600 hover:text-orange-400"
                  >
                    <Link 
                      to="#"
                      className="block py-1"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default link behavior
                        handleItemClick(key, section.title, item.name);
                      }}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: 20, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0, 
      height: 'auto',
      transition: { 
        duration: 0.3,
        ease: 'easeOut' 
      }
    },
    exit: { 
      opacity: 0,
      y: 20,
      height: 0,
      transition: { 
        duration: 0.2,
        ease: 'easeIn' 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.3,
        ease: 'easeOut' 
      }
    }
  };

  // Add this function to fix the missing handleSearchSubmit error
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      // Navigate to search results page
      navigate(`/shop?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue('');
      setIsSearchOpen(false);
      
      // Close mobile menu if open
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <>
      <TopBar />
      <motion.nav 
        className={`bg-white sticky top-0 z-40 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}
        style={{backgroundColor:'#FAF9F6'}}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto">
          <div className="py-4 px-4">
            <div className="hidden lg:flex lg:items-center lg:justify-between">
              {/* Left section: Search bar + Home, Men, Women */}
              <div className="flex items-center space-x-8 w-150" style={{marginLeft: window.innerWidth >= 1534 ? '120px' : '0'}}>
                <div className="flex justify-center items-center">
                  <Link to="/" className="flex items-center">
                    <img 
                      // src={tangerine} 
                      src="https://wamani.vercel.app/wp-content/uploads/2023/05/Logo.svg" 
                      alt="Tangerine Luxury" 
                      className="h-10"
                    />
                  </Link>
                </div>
                {/* Search Bar */}
                <div className="relative w-64 mr-10" style={{width: '200px', maxWidth: '100%', borderWidth: '2px'}}>
                  <form onSubmit={handleSearchSubmit} className="flex">
                    <input
                      type="text"
                      value={searchValue}
                      onChange={handleSearchInputChange}
                      placeholder="Search..."
                      className="w-48 px-4 py-2 border-gray-300 rounded-md focus:ring-black focus:border-black"
                    />
                    <button 
                      type="submit" 
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      <SearchIcon className="w-5 h-5 text-gray-500" />
                    </button>
                  </form>
                  
                  {/* Add search results dropdown */}
                  {searchValue.trim().length > 2 && (
                    <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
                      {isSearching ? (
                        <div className="p-3 text-center text-gray-500">
                          <span className="inline-block animate-spin mr-2">⟳</span>
                          Searching...
                        </div>
                      ) : searchResults.length > 0 ? (
                        <ul>
                          {searchResults.map(product => (
                            <li 
                              key={product._id} 
                              className="p-3 hover:bg-orange-400 cursor-pointer border-b border-gray-100"
                              onClick={() => handleSearchResultClick(product)}
                            >
                              <div className="flex items-center">
                                {product.images && product.images[0] && (
                                  <img 
                                    src={product.images[0]} 
                                    alt={product.product_name} 
                                    className="w-10 h-10 object-cover mr-3" 
                                  />
                                )}
                                <div>
                                  <p className="font-medium">{product.product_name}</p>
                                  <p className="text-sm text-gray-600">₹{product.price}</p>
                                </div>
                              </div>
                            </li>
                          ))}
                          <li className="p-2 text-center text-sm text-blue-600 hover:bg-orange-400 cursor-pointer">
                            <button
                              onClick={() => handleSearchSubmit({ preventDefault: () => {} })}
                              className="w-full"
                            >
                              See all results for "{searchValue}"
                            </button>
                          </li>
                        </ul>
                      ) : (
                        <div className="p-3 text-gray-500 text-center">
                          No products found
                        </div>
                      )}
                    </div>
                  )}
                </div>
                

                {/* Left Menu Items */}
                <div className="hidden lg:flex lg:items-center lg:space-x-6">
                  <Link 
                    to="/" 
                    className="text-gray-700 hover:text-orange-400 font-medium"
                    style={{ fontSize: '15px' }}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/shop" 
                    className="text-gray-700 hover:text-orange-400 font-medium"
                    style={{ fontSize: '15px' }}
                  >
                    Just In
                  </Link>
                  
                  {Object.keys(menuItems)
                    .filter(key => ['men', 'women'].includes(key))
                    .map((key) => (
                      <div
                        key={key}
                        className="relative"
                        onMouseEnter={() => handleMouseEnter(key)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <button 
                          className="flex items-center text-gray-700 hover:text-orange-400 gap-1 font-medium"
                          style={{ fontSize: '15px' }}
                        >
                          {menuItems[key].title}
                          <ChevronDown size={14} />
                        </button>
                        
                        <AnimatePresence>
                          {activeMenu === key && (
                            <motion.div
                              variants={dropdownVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-6 z-50 w-[800px]"
                              style={{left: '-150%'}}
                            >
                              <div className="flex">
                                <div className="grid grid-cols-3 gap-8 flex-1">
                                  {menuItems[key].sections.map((section, sectionIdx) => (
                                    <div key={sectionIdx}>
                                      <h3 className="font-semibold text-sm mb-4 text-gray-800">{section.title}</h3>
                                      <ul className="space-y-2">
                                        {section.items.map((item, itemIdx) => (
                                          <motion.li
                                            key={itemIdx}
                                            variants={itemVariants}
                                            className="text-sm text-gray-600 hover:text-orange-400"
                                          >
                                            <Link 
                                              to="#"
                                              className="block py-1"
                                              onClick={(e) => {
                                                e.preventDefault(); // Prevent default link behavior
                                                handleItemClick(key, section.title, item.name);
                                              }}
                                            >
                                              {item.name}
                                            </Link>
                                          </motion.li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                                <div className="w-1/3 pl-6">
                                  <CategoryImageSlider 
                                    images={menuItems[key].images} 
                                    category={menuItems[key].title} 
                                  />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                </div>
              </div>

              {/* Center Logo */}
              {/* <div className="flex justify-center items-center ">
                <Link to="/" className="flex items-center">
                  <img 
                    // src={tangerine} 
                    src="https://wamani.vercel.app/wp-content/uploads/2023/05/Logo.svg" 
                    alt="Tangerine Luxury" 
                    className="h-10"
                  />
                </Link>
              </div> */}

              {/* Right section: Kids, Services, Contact + Icons */}
              <div className="flex items-center justify-end w-150" style={{marginRight: window.innerWidth >= 1534 ? '120px' : '0'}}>
                {/* Right Menu Items */}
                <div className="flex space-x-6 mr-12" style={{marginRight: '2rem'}}>
                  {Object.keys(menuItems)
                    .filter(key => ['kids', 'services'].includes(key))
                    .map((key) => (
                      <div
                        key={key}
                        className="relative"
                        onMouseEnter={() => handleMouseEnter(key)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <button 
                          className="flex items-center text-gray-700 hover:text-orange-400 gap-1 font-medium"
                          style={{ fontSize: '15px' }}
                        >
                          {menuItems[key].title}
                          <ChevronDown size={14} />
                        </button>
                        
                        <AnimatePresence>
                          {activeMenu === key && (
                            <motion.div
                              variants={dropdownVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className={`absolute top-full ${key === 'services' ? 'right-0 w-[300px]' : 'right-0 w-[800px]'} bg-white shadow-lg p-6 z-50`}
                              style={{right: '-150%'}}
                            >
                              <div className="flex">
                                <div className={`${key === 'services' ? 'w-full' : 'grid grid-cols-3 gap-8 flex-1'}`}>
                                  {menuItems[key].sections.map((section, sectionIdx) => (
                                    <div key={sectionIdx}>
                                      <h3 className="font-semibold text-sm mb-4 text-gray-800">{section.title}</h3>
                                      <ul className="space-y-2">
                                        {section.items.map((item, itemIdx) => (
                                          <motion.li
                                            key={itemIdx}
                                            variants={itemVariants}
                                            className="text-sm text-gray-600 hover:text-orange-400"
                                          >
                                            <Link 
                                              to="#"
                                              className="block py-1"
                                              onClick={(e) => {
                                                e.preventDefault(); // Prevent default link behavior
                                                handleItemClick(key, section.title, item.name);
                                              }}
                                            >
                                              {item.name}
                                            </Link>
                                          </motion.li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                                {key !== 'services' && (
                                  <div className="w-1/3 pl-6">
                                    <CategoryImageSlider 
                                      images={menuItems[key].images} 
                                      category={menuItems[key].title} 
                                    />
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                   <Link 
                    to="/shop" 
                    className="text-gray-700 hover:text-orange-400 font-medium mr-4 hidden lg:block"
                    style={{ fontSize: '15px' }}
                  >
                    Sale
                  </Link>
                  <Link 
                    to="/contact" 
                    className="text-gray-700 hover:text-orange-400 font-medium"
                    style={{ fontSize: '15px' }}
                  >
                    Contact
                  </Link>
                  <Link 
                    to="/sell-with-us" 
                    className="text-gray-700 hover:text-orange-400 font-medium mr-4 hidden lg:block"
                    style={{ fontSize: '15px' }}
                  >
                    Sell With Us
                  </Link>
                </div>

                {/* Insert "Sell With Us" BEFORE icons but as a separate item */}
                <div className="flex items-center">
                  {/* <Link 
                    to="/sell-with-us" 
                    className="text-gray-700 hover:text-black font-medium mr-4 hidden lg:block"
                    style={{ fontSize: '15px' }}
                  >
                    Sell With Us
                  </Link> */}

                  {/* Icons - with reduced spacing */}
                  <div className="flex items-center space-x-3">
                    <Link to="/wishlist">
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        className="p-2 hover:text-gray-600 relative"
                      >
                        <Heart className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                          {wishlist.length}
                        </span>
                      </motion.button>
                    </Link>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setIsCartOpen(true)}
                      className="p-2 hover:text-gray-600 relative"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <motion.span
                        key={cartCount}
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center"
                      >
                        {cartCount}
                      </motion.span>
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      className="p-2 hover:text-gray-600"
                      onClick={handleUserClick}
                    >
                      <User className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center justify-between">
              <Link to="/" className="flex items-center">
                <img 
                    src="https://wamani.vercel.app/wp-content/uploads/2023/05/Logo.svg" 
                    alt="Tangerine Luxury" 
                  className="h-10"
                />
              </Link>
              
              <div className="flex items-center space-x-3">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 hover:text-gray-600"
                >
                  <SearchIcon className="w-5 h-5" />
                </motion.button>
                
                <Link to="/wishlist">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    className="p-2 hover:text-gray-600 relative"
                  >
                    <Heart className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  </motion.button>
                </Link>
                
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setIsCartOpen(true)}
                  className="p-2 hover:text-gray-600 relative"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                </motion.button>
                
                <button 
                  className="text-black p-2"
                  onClick={handleToggleMobileMenu}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
          
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto pt-16"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4">
                <button 
                  className="absolute top-4 right-4 text-black" 
                  onClick={handleToggleMobileMenu}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <div className="space-y-4 mt-4">
                  <form onSubmit={handleSearchSubmit} className="mb-6">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchValue}
                        onChange={handleSearchInputChange}
                        placeholder="Search..."
                        className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                      />
                      <button 
                        type="submit" 
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        <SearchIcon className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </form>
                  
                  <Link to="/" className="block py-2 font-medium">Home</Link>
                  <Link to="/shop" className="block py-2 font-medium">Just In</Link>
                  
                  {Object.keys(menuItems).map((menuKey) => (
                    <div key={menuKey} className="py-2">
                      <div className="font-medium">{menuItems[menuKey].title}</div>
                      <div className="pl-4 mt-2 space-y-2">
                        {menuItems[menuKey].sections.map((section, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="font-medium text-sm">{section.title}</div>
                            {section.items.map((item, i) => (
                              <Link 
                                key={i}
                                to="#"
                                className="block py-1 text-base text-gray-600"
                                onClick={(e) => {
                                  e.preventDefault(); // Prevent default link behavior
                                  handleItemClick(menuKey, section.title, item.name);
                                }}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Link to="/shop" className="block py-2 font-medium">Sale</Link>
                  <Link to="/contact" className="block py-2 font-medium">Contact</Link>
                  <Link to="/sell-with-us" className="block py-2 font-medium">Sell With Us</Link>
                  
                  <div className="flex space-x-4 mt-4">
                    <Link to="/wishlist" className="flex items-center" onClick={handleToggleMobileMenu}>
                      <Heart className="w-5 h-5 mr-2" />
                      <span>Wishlist ({wishlist.length})</span>
                    </Link>
                    <button onClick={() => { handleUserClick(); handleToggleMobileMenu(); }} className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      <span>{isAuthenticated ? 'Account' : 'Sign In'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Search Modal */}
        {isSearchOpen && (
          <Search onClose={() => setIsSearchOpen(false)} />
        )}
      </motion.nav>
    </>
  );
}

export default Navbar;