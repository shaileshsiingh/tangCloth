import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon, TruckIcon, ShieldCheckIcon, ArrowLeftIcon, ArrowRightIcon, ShareIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useWishlist } from '../context/WishlistContext';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import emailjs from '@emailjs/browser';
import axios from 'axios';

// Import subSubcategoryStructure from AddProduct
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

// Helper function to convert title to Title Case
function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

// Function to format price in rupees with commas
function formatPrice(price) {
  return '₹' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function ReviewForm({ productId, onReviewAdded }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('You must be logged in to leave a review');
        return;
      }
      const API_URL = '/api'
      const response = await fetch(`${API_URL}/rating/add`,{
      // const response = await fetch('http://91.203.135.152:2001/api/rating/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          product_id: productId,
          rating,
          review: review.trim() || undefined
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit review');
      }
      
      const data = await response.json();
      setSuccess(true);
      setRating(0);
      setReview('');
      
      if (onReviewAdded) {
        // Create a review object to pass to onReviewAdded
        const newReview = {
          rating: rating,
          review: review.trim(),
          name: 'You' // Or get the user's name from localStorage if available
        };
        onReviewAdded(newReview);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm mt-8">
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Your review has been submitted successfully!
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <p className="mb-2 font-medium">Your Rating</p>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="text-yellow-400 focus:outline-none"
                onClick={() => setRating(star)}
              >
                {star <= rating ? (
                  <StarIcon className="h-8 w-8" />
                ) : (
                  <StarIconOutline className="h-8 w-8" />
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="review" className="block mb-2 font-medium">
            Your Review (Optional)
          </label>
          <textarea
            id="review"
            rows="4"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Share your experience with this product..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}

function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]?.size || '');
  const [quantity, setQuantity] = useState(1);
  const { addToCart, removeFromCart, fetchCartItems } = useCart();
  const { addToWishlist } = useWishlist();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [customPrice, setCustomPrice] = useState('');
  const [showPriceQuote, setShowPriceQuote] = useState(true);
  const [showPriceQuoteForm, setShowPriceQuoteForm] = useState(false);
  const [quoteFormOpen, setQuoteFormOpen] = useState(false);
  const [quoteFormData, setQuoteFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    price: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [conditionModalOpen, setConditionModalOpen] = useState(false);
  
  // Format the product name in title case
  const formattedProductName = product ? toTitleCase(product.product_name) : '';
  
  // Add state for image slider
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  // Create a ref for the slider
  const sliderRef = React.useRef(null);
  
  // Add state for subSubcategories
  const [subSubcategories, setSubSubcategories] = useState([]);
  
  // Add useEffect to fetch subSubcategories
  useEffect(() => {
    const fetchSubSubcategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/subSubCategory/sub-sub-category`);
        if (response.data.success) {
          setSubSubcategories(response.data.data || []);
        }
      } catch (error) {
        console.error('Error fetching sub-subcategories:', error);
      }
    };
    
    fetchSubSubcategories();
  }, []);
  
  const formatDescription = (text) => {
    if (!text) return '';
  
    const lines = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  
    const result = [];
    let currentLine = [];
  
    lines.forEach((line, idx) => {
      const hasColon = line.includes(':');
      const [label, ...rest] = line.split(':');
      const value = rest.join(':').trim();
  
      const isSectionHeader = line.endsWith(':') || (!value && hasColon);
  
      if (isSectionHeader) {
        // Flush current line if not empty
        if (currentLine.length) {
          result.push(currentLine.join(', ') + ',');
          currentLine = [];
        }
        // Push the header in bold with line break
        result.push(`<strong>${label.trim()}:</strong>`);
      } else if (hasColon) {
        currentLine.push(`<strong>${label.trim()}:</strong> ${value}`);
      } else {
        currentLine.push(`${line}`);
      }
    });
  
    if (currentLine.length) {
      result.push(currentLine.join(', ') + ',');
    }
  
    return (
      <div className="space-y-1 text-sm sm:text-base leading-relaxed">
        {result.map((item, index) => (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: item }}
          />
        ))}
      </div>
    );
  };
  
  
  

  
  // Enhanced slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: true,
    beforeChange: (current, next) => setSelectedImageIndex(next),
    customPaging: i => (
      <div
        className={`w-3 h-3 rounded-full mt-4 mx-1 transition-all duration-300 ${
          selectedImageIndex === i ? 'bg-black w-6' : 'bg-gray-300'
        }`}
      />
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ],
    ref: sliderRef
  };
  
  // Fetch related products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product) return;
      
      try {
        setLoading(true);
        const API_URL = '/api';
        const response = await fetch(`${API_URL}/product/list`);

        if (response.status === 200) {
          const data = await response.json();
          if (data.success && data.data && data.data.products) {
            // First try to get products from the same category
            let categoryProducts = data.data.products.filter(
              item => item.category_id === product.category_id && item._id !== product._id
            );
            
            // If not enough products from same category, get products from same subcategory
            if (categoryProducts.length < 4 && product.sub_category_id) {
              const subCategoryProducts = data.data.products.filter(
                item => item.sub_category_id === product.sub_category_id && 
                       item._id !== product._id &&
                       !categoryProducts.some(p => p._id === item._id)
              );
              categoryProducts = [...categoryProducts, ...subCategoryProducts];
            }
            
            // If still not enough products, get any other products
            if (categoryProducts.length < 4) {
              const otherProducts = data.data.products.filter(
                item => item._id !== product._id &&
                       !categoryProducts.some(p => p._id === item._id)
              );
              categoryProducts = [...categoryProducts, ...otherProducts];
            }
            
            // Limit to 4 products
            setRelatedProducts(categoryProducts.slice(0, 4));
          }
        }
      } catch (error) {
        console.error('Error fetching related products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRelatedProducts();
  }, [product]);
  
  // Custom arrows for slider
  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-70 p-2 rounded-full cursor-pointer"
        style={{ ...style }}
        onClick={onClick}
      >
        <ArrowRightIcon className="h-6 w-6" />
      </div>
    );
  }
  
  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-70 p-2 rounded-full cursor-pointer"
        style={{ ...style }}
        onClick={onClick}
      >
        <ArrowLeftIcon className="h-6 w-6" />
      </div>
    );
  }

  const handleQuantityChange = (newQuantity) => {
    // Ensure quantity is a number and within valid range
    const parsedQuantity = parseInt(newQuantity, 10);
    if (!isNaN(parsedQuantity) && parsedQuantity >= 0) { // Allow zero to remove item
      // Find selected size object
      const selectedSizeObj = product.sizes.find(s => s.size === selectedSize);
      // Limit quantity to available stock if size is selected
      if (selectedSizeObj) {
        const newQuantity = Math.min(parsedQuantity, selectedSizeObj.quantity);
        setQuantity(newQuantity);
        if (newQuantity === 0) {
          // Remove item from cart if quantity is zero
          removeFromCart(product._id, selectedSizeObj.size);
        }
      } else {
        setQuantity(parsedQuantity);
      }
    }
  };
  const API_URL = "/api";

  const handleAddToCart = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('Please login to add the item in the cart', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {backgroundColor: 'black', color: 'white', borderRadius: '10px'}
      });
      window.scrollTo(0, 0);
      navigate('/login');
      return;
    }
    if (product && selectedSize) {
      const selectedSizeObj = product.sizes.find(s => s.size === selectedSize);
      if (selectedSizeObj && selectedSizeObj.quantity >= quantity) {
        try {
          const response = await fetch(`${API_URL}/cart/add-item`, {
          // const response = await fetch(`http://91.203.135.152:2001/api/cart/add-item`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            },
            body: JSON.stringify({
              product_id: product._id,
              size_id: product._id, // Assuming size_id is the same as size for simplicity
              size: selectedSize,
              quantity: parseInt(quantity, 10),
              price: product.discount_price || product.estimated_price,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to add item to cart');
          }

          const result = await response.json();
          console.log('Item added to cart:', result);
          // Update cart context here
          fetchCartItems(); // Fetch updated cart items
        } catch (error) {
          console.error('Error adding item to cart:', error);
        }
      }
    }
  };

  const handleBuyNow = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('Please login to proceed with checkout', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {backgroundColor: 'black', color: 'white', borderRadius: '10px'}
      });
      window.scrollTo(0, 0);
      navigate('/login');
      return;
    }
    window.scrollTo(0, 0);
    navigate('/checkout');
  };

  const handleRelatedProductClick = (relatedProduct) => {
    window.scrollTo(0, 0);
    navigate(`/product/${relatedProduct._id}`, { state: { product: relatedProduct } });
  };

  // Function to handle sharing
  const handleShare = () => {
    const productUrl = window.location.href; // Get the current product URL
    const productName = product ? product.product_name : 'Product';

    if (navigator.share) {
      // Use Web Share API if supported
      navigator.share({
        title: productName,
        text: `Check out this product: ${productName}`,
        url: productUrl,
      }).catch((error) => console.error('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      const shareText = `Check out this product: ${productName} - ${productUrl}`;
      const mailtoLink = `mailto:?subject=Check out this product&body=${encodeURIComponent(shareText)}`;
      window.open(mailtoLink, '_blank');
    }
  };

  // Function to handle price quote button click
  const handlePriceQuoteClick = () => {
    setShowPriceQuoteForm(!showPriceQuoteForm);
  };

  const handlePriceQuoteSubmit = (e) => {
    e.preventDefault();
    // Handle the custom price quote submission logic here
    console.log('Custom Price Quote Submitted:', customPrice);
    toast.success('Your price quote has been submitted!');
    // Reset form and hide it after submission
    setCustomPrice('');
    setShowPriceQuoteForm(false);
  };

  // Handle opening the quote form
  const openQuoteForm = () => {
    setQuoteFormOpen(true);
  };

  // Handle quote form input changes
  const handleQuoteFormChange = (e) => {
    const { name, value } = e.target;
    setQuoteFormData({
      ...quoteFormData,
      [name]: value
    });
  };

  // Handle submit of quote form
  const handleQuoteFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // You'll need to set up EmailJS or another email service
      // This is a simplified example
      const templateParams = {
        from_name: quoteFormData.name,
        to_email: 'shaileshsiingh@gmail.com',
        product_name: product.product_name,
        price_quote: quoteFormData.price,
        customer_email: quoteFormData.email,
        customer_phone: quoteFormData.phone,
        customer_whatsapp: quoteFormData.whatsapp,
        message: quoteFormData.message
      };

      // If using EmailJS, you would do something like:
      // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY');
      
      // For now, let's just simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Your price quote request has been submitted successfully!');
      setQuoteFormOpen(false);
      setQuoteFormData({
        name: '',
        email: '',
        phone: '',
        whatsapp: '',
        price: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting price quote:', error);
      toast.error('Failed to submit your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Add scroll restoration effect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white"
    >
      {/* Enhanced Breadcrumb */}
      <div className="bg-gray-50 py-4">
  <div className="container mx-auto px-4">
    <nav className="text-sm">
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-2 text-gray-500">
        <li className="flex items-center">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
        </li>
        <li className="flex items-center">
          <Link to="/shop" className="hover:text-black transition-colors">Shop</Link>
          <span className="mx-2 text-gray-400">/</span>
        </li>
        <li className="text-gray-800 font-medium max-w-full truncate overflow-hidden text-ellipsis whitespace-nowrap">
          {formattedProductName}
        </li>
      </ol>
    </nav>
  </div>
</div>


      {/* Product Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Column - Enhanced Images */}
          <div className="space-y-6">
            {product.images && product.images.length > 0 ? (
              <div className="bg-gray-50 rounded-lg overflow-hidden relative shadow-sm hover:shadow-md transition-shadow">
                <div 
                  className={`${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <Slider {...sliderSettings} ref={sliderRef}>
                    {product.images.map((image, index) => (
                      <div key={index} className="outline-none">
                        <div className="aspect-w-1 aspect-h-1 relative">
                          <img 
                            src={image} 
                            alt={`${formattedProductName} - View ${index + 1}`}
                            className={`w-full h-auto object-contain transition-transform duration-500 ${isZoomed ? 'scale-125' : 'scale-100'}`}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/400';
                            }}
                          />
                          {index === 0 && (
                            <>
                              {product.condition && (
                                <span className="absolute top-4 left-4 bg-black bg-opacity-80 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-sm">
                                  {product.condition.toUpperCase()}
                                </span>
                              )}
                              {(product.brand || (product.brandDetails && product.brandDetails.length > 0)) && (
                                <span className="absolute top-12 left-4 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded-sm shadow-md">
                                  {(typeof product.brand === 'string' ? product.brand : 
                                  (product.brandDetails && product.brandDetails[0]?.name) || 
                                  (product.brand?.name || 'Brand')).toUpperCase()}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
                <div className="absolute top-4 right-4 z-10">
<button 
                        className="bg-black rounded-full p-2 shadow-md hover:bg-gray-800"
                        onClick={(e) => {
                          e.stopPropagation();
                      const token = localStorage.getItem('authToken');
                      if (!token) {
                        toast.error('Please login to add the item to wishlist', {
                          position: "top-center",
                          autoClose: 3000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          style: {backgroundColor: 'black', color: 'white', borderRadius: '10px'}
                        });
                        navigate('/login');
                        return;
                      }
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
            ) : (
              <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                <img 
                  src="https://via.placeholder.com/400" 
                  alt={formattedProductName}
                  className="w-full h-auto object-contain"
                />
              </div>
            )}
            
            {/* Thumbnail Image Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex justify-center mx-auto max-w-md overflow-x-auto py-2">
                <div className="flex space-x-2">
                  {product.images.map((image, index) => (
                    <div 
                      key={index}
                      className={`cursor-pointer h-16 w-16 border-2 rounded transition-all duration-200 ${selectedImageIndex === index ? 'border-black' : 'border-transparent'}`}
                      onClick={() => {
                        // When a thumbnail is clicked, update the slider to show that image
                        if (sliderRef && sliderRef.current) {
                          sliderRef.current.slickGoTo(index);
                        }
                      }}
                    >
                      <img 
                        src={image} 
                        alt={`Thumbnail ${index + 1}`}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/60';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Enhanced Product Info */}
          <div className="flex flex-col space-y-4 max-w-xl">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{product.product_name.toUpperCase()}</h1>
                {/* Share Icon */}
                <ShareIcon 
                  className="w-10 h-10 text-gray-600 cursor-pointer hover:text-blue-800 transition-colors"
                  onClick={handleShare}
                />
              </div>
              
              {/* Brand name with badge */}
              {(product.brand || (product.brandDetails && product.brandDetails.length > 0)) && (
                <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {(typeof product.brand === 'string' ? product.brand : 
                   (product.brandDetails && product.brandDetails[0]?.name) || 
                   (product.brand?.name || 'Brand')).toUpperCase()}
                </div>
              )}
              
              {/* Price with discounted price if available */}
              <div className="mb-6">
                <div className="flex flex-col">
                  {product.estimated_price ? (
                    <>
                      <div className="mb-1">
                        <span className="text-gray-600 mr-2">Estimated Retail Price:</span>
                        <span className="text-lg text-gray-500 line-through">
                          {formatPrice(product.estimated_price)}
                      </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-800 mr-2 font-medium">Our Price:</span>
                        <span className="text-2xl font-bold text-gray-900">
                          {formatPrice(product.discount_price || product.price)}
                        </span>
                        {product.estimated_price > (product.discount_price || product.price) && (
                      <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                            {Math.round((1 - (product.discount_price || product.price) / product.estimated_price) * 100)}% OFF
                      </span>
                        )}
                      </div>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">Price inclusive of all taxes</p>
              </div>
              
              {/* Product Key Information - Vertical Layout */}
              <div className="mb-8 bg-gray-50 p-5 rounded-lg border border-gray-100 shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span className="font-medium">EMI Available</span>
                  </div>
                  
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="font-medium">100% Guaranteed Authentic or Your Money Back</span>
                  </div>
                  
                  {/* <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">TL Loyalty Program</span>
                  </div> */}
                  
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <button 
                      onClick={() => setConditionModalOpen(true)}
                      className="font-medium hover:text-gray-800 transition-colors flex items-center"
                    >
                      Product Condition: {product?.condition?.toUpperCase() || "New"}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200">
                    <h4 className="font-medium mb-2">What is Layaway?</h4>
                    <p className="text-sm text-gray-600">Split your payment into installments. Reserve your item with a deposit and pay the rest over time before delivery.</p>
                    <Link to='/layaway'><button className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800">Learn More</button></Link>
                  </div>
                </div>
              </div>
              
              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-3 text-gray-900">Select Size</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((sizeOption) => (
                      <button
                        key={sizeOption.size}
                        type="button"
                        className={`px-4 py-2 rounded border ${
                          selectedSize === sizeOption.size
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 hover:border-gray-400'
                        } ${sizeOption.quantity === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        onClick={() => setSelectedSize(sizeOption.size)}
                        disabled={sizeOption.quantity === 0}
                      >
                        {sizeOption.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity Selector */}
              <div className="mb-6">
                <h3 className="font-medium mb-3 text-gray-900">Quantity</h3>
                <div className="flex items-center border border-gray-300 rounded w-32">
                  <button
                    type="button"
                    className="w-10 h-10 flex items-center justify-center border-r border-gray-300 hover:bg-gray-100"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 h-10 text-center focus:outline-none"
                    min="1"
                  />
                  <button
                    type="button"
                    className="w-10 h-10 flex items-center justify-center border-l border-gray-300 hover:bg-gray-100"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Enhanced CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-black text-white font-medium rounded hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 border border-black text-black font-medium rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </motion.button>

                {/* Quote Your Price Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  onClick={openQuoteForm}
                >
                  Quote Your Price
                </motion.button>
              </div>
              
              {/* Delivery & Return Info */}
              <div className="border-t border-b py-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <TruckIcon className="h-6 w-6 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Fast Shipping</p>
                    <p className="text-sm text-gray-600">7-10 business days within India</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ShieldCheckIcon className="h-6 w-6 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Secure Payment</p>
                    <p className="text-sm text-gray-600">100% secure payment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Tabs Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Tab.Group>
            <Tab.List className="flex space-x-8 border-b">
              <Tab className={({ selected }) => 
                `pb-4 font-medium text-sm focus:outline-none ${
                  selected ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'
                }`
              }>
                Product Details
              </Tab>
              <Tab className={({ selected }) => 
                `pb-4 font-medium text-sm focus:outline-none ${
                  selected ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'
                }`
              }>
                Shipping & Returns
              </Tab>
              <Tab className={({ selected }) => 
                `pb-4 font-medium text-sm focus:outline-none ${
                  selected ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'
                }`
              }>
                Authenticity & Quality
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-8">
              <Tab.Panel>
                <div className="prose max-w-none">
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 shadow-sm mb-8">
                    <h3 className="text-xl font-medium mb-4">Product Description</h3>
                    <p className="leading-relaxed">
                      {formatDescription(product.description?.toUpperCase())}
                    </p>
                  </div>
                
                  <h3 className="text-xl font-medium mb-4">Product Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      {product.product_details && (
                        <>
                          <div className="grid grid-cols-2 border-b pb-2">
                            <span className="text-gray-600">Material</span>
                            <span className="font-medium">{product.product_details.material || "Cotton"}</span>
                          </div>
                          <div className="grid grid-cols-2 border-b pb-2">
                            <span className="text-gray-600">Pattern</span>
                            <span className="font-medium">{product.product_details.pattern || "Solid"}</span>
                          </div>
                          <div className="grid grid-cols-2 border-b pb-2">
                            <span className="text-gray-600">Fit</span>
                            <span className="font-medium">{product.product_details.fit || "Regular"}</span>
                          </div>
                        </>
                      )}
                      <div className="grid grid-cols-2 border-b pb-2">
                        <span className="text-gray-600">Brand</span>
                        <span className="font-medium">
                          {(typeof product.brand === 'string' ? product.brand : 
                           (product.brandDetails && product.brandDetails[0]?.name) || 
                           (product.brand?.name || 'Brand')).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 border-b pb-2">
                        <span className="text-gray-600">Type</span>
                        <span className="font-medium">
                          {product?.sub_sub_category_id ? 
                            (() => {
                              // Find the sub-sub-category in the structure
                              for (const subCategories of Object.values(subSubcategoryStructure)) {
                                const found = subCategories.find(sub => sub.id === product.sub_sub_category_id);
                                if (found) return found.name.toUpperCase();
                              }
                              return "Not Specified";
                            })() : 
                            "Not Specified"
                          }
                        </span>
                      </div>
                      <div className="grid grid-cols-2 border-b pb-2">
                        <span className="text-gray-600">Additional Info</span>
                        <span className="font-medium">{product?.additionalInfo || "Not Specified"}</span>
                      </div>
                    
                    </div>
                    <div className="space-y-3">
                      
                      <div className="grid grid-cols-2 border-b pb-2">
                        <span className="text-gray-600">Condition</span>
                        <span className="font-medium">{product?.condition?.toUpperCase() || "Not Specified"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Panel>
              
              
              <Tab.Panel>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-medium mb-4">Shipping Information</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <p className="mb-3">All orders will be shipped within 7-10 business days within India. International orders will be shipped within 10-15 business days. Additional shipping charges apply. Tangerine Luxury is not responsible for any shipping or delivery delays due to COVID-19/ shipping company delay.</p>
                      
                      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium">Standard Shipping</h4>
                          <p className="text-gray-600">5-7 business days</p>
                          <p className="text-gray-600">₹500 (Free on orders over ₹999)</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium">Express Shipping</h4>
                          <p className="text-gray-600">2-3 business days</p>
                          <p className="text-gray-600">₹250</p>
                        </div>
                      </div> */}
                      </div>
                      
                    <h3 className="text-xl font-medium mt-8 mb-4">Cancellation & Returns</h3>
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <p className="mb-3">To initiate a return, please inform us within 24 hours of receiving the order. We offer exchanges and store credits of the purchase value, valid for 6 months on all returns. Customers are responsible for return shipping charges, and the original purchase's shipping/handling fees are non-refundable. No exchanges/returns are accepted for sale products. For more details, please visit the Order & Returns section.</p>
                    
                      <h4 className="font-medium mt-6">Return Policy</h4>
                      <ul className="list-disc pl-5 mt-2">
                        <li>Items can be returned within 24 hours of delivery</li>
                        <li>We offer exchanges and store credits of the purchase value</li>
                        <li>Store credits are valid for 6 months</li>
                        <li>Customers are responsible for return shipping charges</li>
                        <li>Original shipping fees are non-refundable</li>
                        <li>No returns accepted for sale products</li>
                      </ul>
                              </div>
                    
                    <h3 className="text-xl font-medium mt-8 mb-4">Need Help?</h3>
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <p className="mb-3">If you have any other questions or concerns, feel free to contact us:</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                          <h4 className="font-medium">Email</h4>
                          <p className="text-gray-600">consign@tangerineluxury.com</p>
                              </div>
                        <div>
                          <h4 className="font-medium">Phone</h4>
                          <p className="text-gray-600">+91 704 2039009</p>
                          <p className="text-gray-600">+91 704 2029009</p>
                            </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Panel>
              
              <Tab.Panel>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-medium mb-4">Authenticity Guarantee</h3>
                  <div className="bg-gray-50 p-5 rounded-lg mb-8">
                    <p className="mb-3">Authenticity of a product holds topmost importance at Tangerine Luxury. Each consigned piece goes through a strenuous quality check by a panel of experts.</p>
                    
                    <div className="flex items-center mt-4 bg-white p-4 rounded-lg shadow-sm">
                      <div className="bg-gray-100 p-3 rounded-full mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                            </div>
                      <div>
                        <h4 className="font-medium">100% Guaranteed Authentic</h4>
                        <p className="text-gray-600 text-sm">Or Your Money Back</p>
                          </div>
                        </div>
                      </div>
                  
                  <h3 className="text-xl font-medium mb-4">Quality Control</h3>
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <p>At Tangerine Luxury, our team of in-house experts, along with advanced authentication technology, ensures a rigorous verification and Quality Control process for all items sold.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                        <h4 className="font-medium">Expert Verification</h4>
                        <p className="text-sm text-gray-600">Every product is examined by experts</p>
                  </div>
                  
                      <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                </div>
                        <h4 className="font-medium">Rigorous Process</h4>
                        <p className="text-sm text-gray-600">Multiple checkpoints ensure quality</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                      </div>
                        <h4 className="font-medium">Advanced Technology</h4>
                        <p className="text-sm text-gray-600">Using the latest authentication tools</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>

        {/* Related Products - Enhanced */}
        <div className="mt-16 border-t pt-12 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">You May Also Like</h2>
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {relatedProducts.length > 0 ? (
                relatedProducts.map(relatedProduct => (
              <motion.div
                key={relatedProduct._id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                whileHover={{ y: -5 }}
                onClick={() => handleRelatedProductClick(relatedProduct)}
              >
                <div className="relative pb-[125%] overflow-hidden">
                  <img 
                        src={relatedProduct.images?.[0] || 'https://via.placeholder.com/400'} 
                    alt={relatedProduct.product_name}
                        className="absolute top-0 left-0 w-full h-full object-contain p-2"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400';
                    }}
                  />
                  
                      {relatedProduct.estimated_price && relatedProduct.estimated_price > (relatedProduct.discount_price || relatedProduct.price) && (
                        <div className="absolute top-2 left-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
                          {Math.round((1 - (relatedProduct.discount_price || relatedProduct.price) / relatedProduct.estimated_price) * 100)}% OFF
                        </div>
                      )}
                      
                      {/* Brand Badge */}
                      {(relatedProduct.brand || (relatedProduct.brandDetails && relatedProduct.brandDetails.length > 0)) && (
                        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-sm px-2 py-1 text-xs font-medium tracking-wide">
                          {(typeof relatedProduct.brand === 'string' ? relatedProduct.brand : 
                           (relatedProduct.brandDetails && relatedProduct.brandDetails[0]?.name) || 
                           (relatedProduct.brand?.name || 'Brand')).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium truncate">{toTitleCase(relatedProduct.product_name)}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                          <p className="font-bold text-gray-900">{formatPrice(relatedProduct.discount_price || relatedProduct.price)}</p>
                          {relatedProduct.estimated_price && relatedProduct.estimated_price > (relatedProduct.discount_price || relatedProduct.price) && (
                        <p className="text-sm text-gray-500 line-through ml-2">
                              {formatPrice(relatedProduct.estimated_price)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
                ))
              ) : (
                <div className="col-span-4 text-center py-6">
                  <p className="text-gray-500">No related products found</p>
          </div>
              )}
            </div>
          )}
        </div>
        
        {/* Enhanced Services Section */}
         {/* Add this new services section at the end, just before the closing </div> */}
      <div className="bg-gray-50 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 2: Secured Payment */}
            <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
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
            <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
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
            <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
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
            <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
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
      

      {/* Price Quote Form */}
      <Transition appear show={quoteFormOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setQuoteFormOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900 mb-4"
                  >
                    Quote Your Price
                  </Dialog.Title>

                  <form onSubmit={handleQuoteFormSubmit} className="space-y-4">
                    {/* Pre-filled Product Name (Read-only) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Product
                      </label>
                      <input
                        type="text"
                        value={product.product_name}
                        disabled
                        className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm text-gray-500 focus:outline-none"
                      />
                    </div>

                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={quoteFormData.name}
                        onChange={handleQuoteFormChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={quoteFormData.email}
                        onChange={handleQuoteFormChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={quoteFormData.phone}
                        onChange={handleQuoteFormChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    {/* WhatsApp Number */}
                    <div>
                      <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        value={quoteFormData.whatsapp}
                        onChange={handleQuoteFormChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    {/* Price Quote */}
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Your Price Quote (₹) *
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        required
                        min="1"
                        value={quoteFormData.price}
                        onChange={handleQuoteFormChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    {/* Additional Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Additional Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="3"
                        value={quoteFormData.message}
                        onChange={handleQuoteFormChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      ></textarea>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => setQuoteFormOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                      >
                        {submitting ? 'Submitting...' : 'Submit Quote'}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Product Condition Modal */}
      <Transition appear show={conditionModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setConditionModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="absolute top-0 right-0 pt-4 pr-4">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={() => setConditionModalOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold leading-6 text-gray-900 mb-4 font-serif tracking-wide border-b pb-2"
                  >
                    PRODUCT CONDITION GUIDELINES
                  </Dialog.Title>

                  <div className="mt-4 space-y-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-1">New With Tags</h4>
                      <p className="text-gray-700 text-sm">Products under the Condition New, have never been used. They come with tags, packaging and dustbags.</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-1">New Without Tags</h4>
                      <p className="text-gray-700 text-sm">Products under this category are new, have never been used or worn. They are in mint condition. Tags might be missing.</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-1">Pristine</h4>
                      <p className="text-gray-700 text-sm">Products are as good as new with insignificant sign of usage or no visible sign of usage. They are in pristine condition.</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-1">Good Condition</h4>
                      <p className="text-gray-700 text-sm">Products under this condition are previously worn with minor or no visible flaws and/or no significant wear & tear.</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-1">Gently Used</h4>
                      <p className="text-gray-700 text-sm">Products under this condition are previously worn with minor visible flaws and little wear & tear.</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-1">Used Fairly Well</h4>
                      <p className="text-gray-700 text-sm">Products under this category are fairly used and have some signs of usage. Some fading or cracks on the products are visible.</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none"
                      onClick={() => setConditionModalOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      </div>
    </motion.div>
  );
}

export default ProductDetails;
