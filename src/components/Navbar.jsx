import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, User, ChevronDown, Search as SearchIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from './TopBar';
import Search from './Search';

// Updated menu items to match the images
const menuItems = {
  shop: {
    title: 'Shop',
    sections: [
      {
        title: 'Shop Listing Styles',
        items: [
          { name: 'Style - 1 (Default)', id: '1' },
          { name: 'Style - 2 (with Shop Icons)', id: '2' },
          { name: 'Style - 3 (Fullwidth Quickview)', id: '3' },
          { name: 'Style - 4 (Overlay Content)', id: '4' },
          { name: 'Style - 5 (With Separator)', id: '5' },
          { name: 'Style - 6 (Shadowed Blocks)', id: '6' },
          { name: 'Style - 7 (Centered Shop Icons)', id: '7' },
          { name: 'Style - 8 (Simple & Unique)', id: '8' }
        ]
      },
      {
        title: 'Shop Page Layouts',
        items: [
          { name: 'My Shop', id: 'my-shop' },
          { name: 'Left Sidebar', id: 'left-sidebar' },
          { name: 'Right Sidebar', id: 'right-sidebar' },
          { name: 'My Account', id: 'my-account' },
          { name: 'My Cart', id: 'my-cart' },
          { name: 'My Wishlist', id: 'my-wishlist' },
          { name: 'Checkout', id: 'checkout' }
        ]
      },
      {
        title: 'Featured Collection',
        isImageSection: true,
        items: [
          { 
            name: 'MEN', 
            id: 'men',
            image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop',
            buttonText: 'MEN'
          },
          { 
            name: 'WOMEN', 
            id: 'women',
            image: 'https://images.unsplash.com/photo-1525450824786-227cbef70703?q=80&w=1974&auto=format&fit=crop',
            buttonText: 'SHOP WOMEN'
          }
        ]
      }
    ]
  },
  products: {
    title: 'Products',
    sections: [
      {
        title: 'Shop Single Layouts',
        items: [
          { name: 'Left Sidebar', id: 'product-left-sidebar' },
          { name: 'Right Sidebar', id: 'product-right-sidebar' },
          { name: 'Thumbnails Left', id: 'thumbnails-left' },
          { name: 'Thumbnails Right', id: 'thumbnails-right' },
          { name: 'Thumbnails Bottom', id: 'thumbnails-bottom' },
          { name: 'Gallery Grid', id: 'gallery-grid' },
          { name: 'Sticky Info', id: 'sticky-info' },
          { name: 'Gallery Center', id: 'gallery-center' },
          { name: 'Tabs Style', id: 'tabs-style' }
        ]
      },
      {
        title: 'Shop Single Styles',
        items: [
          { name: 'Toggle Style', id: 'toggle-style' },
          { name: 'Accordion Style', id: 'accordion-style' },
          { name: 'Accordion Bottom Summary', id: 'accordion-bottom-summary', isNew: true },
          { name: 'Accordion After Summary', id: 'accordion-after-summary' },
          { name: 'Simple Product', id: 'simple-product' },
          { name: 'Product Variable', id: 'product-variable' },
          { name: 'Product Group', id: 'product-group', isSale: true },
          { name: 'Product External/Affiliate', id: 'product-external' }
        ]
      },
      {
        title: 'Featured Products',
        isProductSection: true,
        items: [
          { 
            name: 'Formal Men\'s Shirt', 
            id: 'formal-shirt',
            image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?q=80&w=1974&auto=format&fit=crop',
            price: { min: 26.00, max: 36.00 },
            rating: 5
          },
          { 
            name: 'Women\'s Handbag', 
            id: 'womens-handbag',
            image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1974&auto=format&fit=crop',
            price: { min: 26.00, max: 40.00 },
            rating: 4
          }
        ]
      }
    ]
  },
  blog: {
    title: 'Blog',
    sections: [
      {
        title: 'Blog Listing Layout',
        items: [
          { name: 'Blog Left Sidebar', id: 'blog-left-sidebar' },
          { name: 'Blog Right Sidebar', id: 'blog-right-sidebar' },
          { name: 'Blog Without Sidebar', id: 'blog-without-sidebar' }
        ]
      },
      {
        title: 'Blog Single Layouts',
        items: [
          { name: 'Left Sidebar', id: 'blog-single-left' },
          { name: 'Right Sidebar', id: 'blog-single-right' },
          { name: 'Without Sidebar', id: 'blog-single-without' }
        ]
      },
      {
        title: 'Blog Single Formats',
        items: [
          { name: 'Blog Standard', id: 'blog-standard' },
          { name: 'Blog Gallery', id: 'blog-gallery' },
          { name: 'Blog Image', id: 'blog-image' },
          { name: 'Blog Video', id: 'blog-video' }
        ]
      },
      {
        title: 'Blog Listing Styles',
        items: [
          { name: 'Blog List', id: 'blog-list' },
          { name: 'Blog Grid', id: 'blog-grid' },
          { name: 'Blog Modern', id: 'blog-modern' }
        ]
      },
      {
        title: 'Blog Single Styles',
        items: [
          { name: 'Blog Simple', id: 'blog-simple' },
          { name: 'Blog Minimal', id: 'blog-minimal' },
          { name: 'Blog Modern', id: 'blog-single-modern' }
        ]
      },
      {
        title: 'Recent Posts',
        isPostSection: true,
        items: [
          { 
            name: 'Expect more from your workout clothes', 
            id: 'workout-clothes',
            image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=2070&auto=format&fit=crop',
            date: 'JUN 20',
            excerpt: 'Bibendum at varius vel pharetra vel turpis nunc eget...'
          },
          { 
            name: 'Finest clothing a modern slim fit suit', 
            id: 'slim-fit-suit',
            image: 'https://images.unsplash.com/photo-1507680434567-5739c80be1ac?q=80&w=2070&auto=format&fit=crop',
            date: 'JUN 10',
            excerpt: 'Et malesuada fames ac turpis egestas integer. Massa tincidunt...'
          }
        ]
      }
    ]
  },
  pages: {
    title: 'Pages',
    sections: [
      {
        title: 'User Pages',
        items: [
          { name: 'My Account', id: 'account' },
          { name: 'Order History', id: 'orders' },
          { name: 'Wishlist', id: 'wishlist' },
          { name: 'Shopping Cart', id: 'cart' }
        ]
      },
      {
        title: 'Info Pages',
        items: [
          { name: 'About Us', id: 'about' },
          { name: 'FAQs', id: 'faqs' },
          { name: 'Privacy Policy', id: 'privacy' }
        ]
      }
    ]
  }
};

function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const checkUserLoggedIn = () => {
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    };

    checkUserLoggedIn();
  }, []);

  const handleItemClick = (id) => {
    setActiveDropdown(null);
    navigate(`/product/${id}`);
  };

  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate('/user-details');
    } else {
      navigate('/login');
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-${i <= rating ? 'yellow-500' : 'gray-300'}`}>★</span>
      );
    }
    return stars;
  };

  // Function to format price range
  const formatPrice = (min, max) => {
    if (min === max) return `$${min.toFixed(2)}`;
    return `$${min.toFixed(2)} – $${max.toFixed(2)}`;
  };

  return (
    <>
      <TopBar />
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white border-b sticky top-0 z-50"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center h-20">
            {/* Search Bar and Left Menu */}
            <div className="flex-1 flex items-center">
              {/* Search Bar */}
              <div className="relative w-64 mr-6">
                <input
                  type="text"
                  placeholder="Search Products"
                  className="border rounded-md pl-10 pr-4 py-2 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearch}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Left Navigation */}
              <div className="flex space-x-6"style={{marginLeft: '20px'}}>
                <Link to="/" className="text-gray-700 hover:text-black text-base font-medium">
                  Home
                </Link>
                
                {Object.entries(menuItems)
                  .filter(([key]) => key === 'shop' || key === 'products')
                  .map(([key, menu]) => (
                  <div
                    key={key}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(key)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className="flex items-center text-gray-700 hover:text-black gap-1 text-base font-medium"
                    >
                      {menu.title}
                      <ChevronDown size={16} />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === key && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-6 z-50 w-[1000px]"
                          style={{ left: '50%', marginLeft: '-250px' }} // Center the dropdown
                        >
                          {/* Dropdown content */}
                          <div className="flex">
                            {/* Left section */}
                            <div className="w-1/2 grid grid-cols-2 gap-6">
                              {menu.sections
                                .filter(section => !section.isImageSection && !section.isProductSection && !section.isPostSection)
                                .map((section, sectionIdx) => (
                                  <div key={sectionIdx} className="col-span-1">
                                    <h3 className="font-semibold text-sm mb-4 text-gray-800">{section.title}</h3>
                                    <ul className="space-y-2">
                                      {section.items.map((item, itemIdx) => (
                                        <motion.li
                                          key={itemIdx}
                                          variants={itemVariants}
                                          className="overflow-hidden"
                                        >
                                          <div className="flex items-center">
                                            <button
                                              onClick={() => handleItemClick(item.id)}
                                              className="text-gray-600 hover:text-black transition-colors text-sm"
                                            >
                                              {item.name}
                                            </button>
                                            {item.isNew && (
                                              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">NEW</span>
                                            )}
                                            {item.isSale && (
                                              <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded">SALE</span>
                                            )}
                                          </div>
                                        </motion.li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                            </div>
                            
                            {/* Right section */}
                            <div className="w-1/2">
                              {menu.sections
                                .filter(section => section.isImageSection || section.isProductSection || section.isPostSection)
                                .map((section, sectionIdx) => (
                                  <div key={sectionIdx}>
                                    <h3 className="font-semibold text-sm mb-4 text-gray-800">{section.title}</h3>
                                    
                                    {section.isImageSection && (
                                      <div className="grid grid-cols-2 gap-4">
                                        {section.items.map((item, itemIdx) => (
                                          <div 
                                            key={itemIdx}
                                            className="relative h-80 overflow-hidden rounded-lg cursor-pointer"
                                            onClick={() => handleItemClick(item.id)}
                                          >
                                            <img
                                              src={item.image}
                                              alt={item.name}
                                              className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end justify-center pb-8">
                                              <button className="px-6 py-2 bg-white text-black font-medium text-sm">
                                                {item.buttonText}
                                              </button>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    
                                    {section.isProductSection && (
                                      <div className="grid grid-cols-2 gap-4">
                                        {section.items.map((item, itemIdx) => (
                                          <div 
                                            key={itemIdx}
                                            className="cursor-pointer"
                                            onClick={() => handleItemClick(item.id)}
                                          >
                                            <div className="relative h-40 mb-2 overflow-hidden rounded-md">
                                              <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                              />
                                            </div>
                                            <h4 className="font-medium text-sm">{item.name}</h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                              {formatPrice(item.price.min, item.price.max)}
                                            </p>
                                            <div className="flex mt-1">
                                              {renderStars(item.rating)}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    
                                    {/* Other section types remain the same */}
                                  </div>
                                ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Logo - Center */}
            <div className="flex justify-center mr-8">
              <Link to="/">
                <img 
                  src="https://wamani.vercel.app/wp-content/uploads/2023/05/Logo.svg" 
                  alt="Tangerine Luxury" 
                  className="h-10"
                />
              </Link>
            </div>

            {/* Navigation Menu - Right Side and Icons */}
            <div className=" flex items-center justify-end ">
              {/* Right Navigation */}
              <div className="flex space-x-6 mr-6">
                {Object.entries(menuItems)
                  .filter(([key]) => key === 'blog' || key === 'pages')
                  .map(([key, menu]) => (
                  <div
                    key={key}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(key)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className="flex items-center text-gray-700 hover:text-black gap-1 text-base font-medium"
                    >
                      {menu.title}
                      <ChevronDown size={16} />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === key && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className={`absolute top-full right-0 bg-white shadow-lg p-6 z-50 ${key === 'blog' ? 'w-[1000px]' : 'w-[400px]'}`}
                          style={{ right: '0', marginRight: '-250px' }} // Position to the right
                        >
                          <div className="flex">
                            {/* Left section */}
                            <div className={`${key === 'blog' ? 'w-2/3 grid grid-cols-3 gap-6' : 'w-1/2 grid grid-cols-2 gap-6'}`}>
                              {menu.sections
                                .filter(section => !section.isImageSection && !section.isProductSection && !section.isPostSection)
                                .map((section, sectionIdx) => (
                                  <div key={sectionIdx} className="col-span-1">
                                    <h3 className="font-semibold text-sm mb-4 text-gray-800">{section.title}</h3>
                                    <ul className="space-y-2">
                                      {section.items.map((item, itemIdx) => (
                                        <motion.li
                                          key={itemIdx}
                                          variants={itemVariants}
                                          className="overflow-hidden"
                                        >
                                          <div className="flex items-center">
                                            <button
                                              onClick={() => handleItemClick(item.id)}
                                              className="text-gray-600 hover:text-black transition-colors text-sm"
                                            >
                                              {item.name}
                                            </button>
                                            {item.isNew && (
                                              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">NEW</span>
                                            )}
                                            {item.isSale && (
                                              <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded">SALE</span>
                                            )}
                                          </div>
                                        </motion.li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                            </div>
                            
                            {/* Right section */}
                            <div className={`${key === 'blog' ? 'w-1/3' : 'w-1/2'}`}>
                              {menu.sections
                                .filter(section => section.isImageSection || section.isProductSection || section.isPostSection)
                                .map((section, sectionIdx) => (
                                  <div key={sectionIdx}>
                                    <h3 className="font-semibold text-sm mb-4 text-gray-800">{section.title}</h3>
                                    
                                    {section.isPostSection && (
                                      <div className="space-y-4">
                                        {section.items.map((item, itemIdx) => (
                                          <div 
                                            key={itemIdx}
                                            className="cursor-pointer flex gap-4"
                                            onClick={() => handleItemClick(item.id)}
                                          >
                                            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                                              <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                              />
                                            </div>
                                            <div className="flex-1">
                                              <div className="text-xs text-gray-500">{item.date}</div>
                                              <h4 className="font-medium text-sm mt-1">{item.name}</h4>
                                              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                                {item.excerpt}
                                              </p>
                                            </div>
                                          </div>
                                        ))}
                                        <div className="mt-4 flex justify-center">
                                          <button className="px-4 py-2 bg-black text-white text-sm font-medium">
                                            View All Posts
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                
                <Link to="/contact" className="text-gray-700 hover:text-black text-base font-medium"style={{marginRight: '160px'}}>
                  Contact
                </Link>
              </div>

              {/* Icons - Right Side */}
              <div className="flex items-center space-x-5">
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
      </motion.nav>
    </>
  );
}

export default Navbar;

