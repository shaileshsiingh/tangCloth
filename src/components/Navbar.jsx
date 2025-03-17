import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, User, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from './TopBar';
import Search from './Search';

const menuItems = {
  shop: {
    title: 'Shop',
    sections: [
      {
        title: 'Shop Listing Styles',
        items: [
          { name: 'Style - 1 (Default)', id: '1', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
          { name: 'Style - 2 (with Shop Icons)', id: '2' },
          { name: 'Style - 3 (Fullwidth)', id: '3', image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
          { name: 'Style - 4 (Overlay)', id: '4' }
        ]
      },
      {
        title: 'Featured Items',
        items: [
          { name: 'New Arrivals', id: '5', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
          { name: 'Best Sellers', id: '6' },
          { name: 'Trending Now', id: '7', image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
          { name: 'Sale Items', id: '8' }
        ]
      },
      {
        title: 'Collections',
        items: [
          { name: 'Summer Collection', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', id: '9' },
          { name: 'Winter Collection', id: '10' }
        ]
      }
    ]
  },
  products: {
    title: 'Products',
    sections: [
      {
        title: 'Categories',
        items: [
          { name: 'Dresses', id: '11', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
          { name: 'Tops', id: '12' },
          { name: 'Bottoms', id: '13', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
          { name: 'Accessories', id: '14' }
        ]
      },
      {
        title: 'Featured',
        items: [
          { name: 'New Season', id: '15', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
          { name: 'Most Popular', id: '16' },
          { name: 'Best Rated', id: '17', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' }
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
          { name: 'My Account', id: '18', image: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
          { name: 'Order History', id: '19' },
          { name: 'Wishlist', id: '20', image: 'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
          { name: 'Shopping Cart', id: '21' }
        ]
      },
      {
        title: 'Info Pages',
        items: [
          { name: 'About Us', id: '22', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
          { name: 'FAQs', id: '23' },
          { name: 'Privacy Policy', id: '24', image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' }
        ]
      }
    ]
  },
  blog: {
    title: 'Blog',
    sections: [
      {
        title: 'Blog Categories',
        items: [
          { name: 'Fashion News', id: '25', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
          { name: 'Style Guide', id: '26' },
          { name: 'Trends', id: '27', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' }
        ]
      }
    ]
  }
};

function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { cartCount, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserLoggedIn = () => {
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
    };

    checkUserLoggedIn();
  }, []);

  const handleItemClick = (id) => {
    setActiveDropdown(null);
    // Create a dummy product object for navigation
    const dummyProduct = {
      _id: id,
      product_name: 'Sample Product',
      price: 99.99,
      description: 'This is a sample product description.',
      images: ['https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'],
      sizes: [
        { size: 'S', quantity: 10 },
        { size: 'M', quantity: 15 },
        { size: 'L', quantity: 20 }
      ],
      isActive: true,
      isSold: false
    };
    navigate(`/product/${id}`, { state: { product: dummyProduct } });
  };
console.log(isLoggedIn);
  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate('/user-details');
    } else {
      navigate('/login');
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
            {/* Logo - Left Side */}
            <div className="flex-1 flex items-center">
              <Link to="/" className="text-2xl font-bold mr-4">
                Tangerine
              </Link>
              {/* Search - Next to Logo */}
              <Search />
            </div>

{/* Navigation Menu - Below */}
<div className="flex justify-center space-x-8 py-4 mr-32">
            <Link to="/" className="text-gray-700 hover:text-black">
              Home
            </Link>
            {Object.entries(menuItems).map(([key, menu]) => (
              <div
                key={key}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center text-gray-700 hover:text-black gap-1"
                >
                  {menu.title}
                  <ChevronDown size={16} />
                </motion.button>

                <AnimatePresence>
                  {activeDropdown === key && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-1/2 transform -translate-x-1/2 w-[800px] bg-white shadow-lg p-6 grid grid-cols-3 gap-8"
                    >
                      {menu.sections.map((section, idx) => (
                        <div key={idx}>
                          <h3 className="font-semibold mb-4">{section.title}</h3>
                          <ul className="space-y-4">
                            {section.items.map((item, itemIdx) => (
                              <motion.li
                                key={itemIdx}
                                variants={itemVariants}
                                className="overflow-hidden rounded-lg"
                              >
                                {item.image ? (
                                  <div
                                    onClick={() => handleItemClick(item.id)}
                                    className="relative cursor-pointer group overflow-hidden"
                                  >
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                                      onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/400';
                                      }}
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 group-hover:bg-opacity-60">
                                      <span className="text-white font-medium text-sm">
                                        {item.name}
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => handleItemClick(item.id)}
                                    className="text-gray-600 hover:text-black transition-colors w-full text-left"
                                  >
                                    {item.name}
                                  </button>
                                )}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <Link to="/contact" className="text-gray-700 hover:text-black">
              Contact
            </Link>
          </div>

            {/* Navigation & Icons - Right Side */}
            <div className="flex items-center justify-end space-x-6">
              <Link to="/wishlist">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                className="p-2 hover:text-gray-600 relative"
              >
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  0
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
      </motion.nav>
    </>
  );
}

export default Navbar;