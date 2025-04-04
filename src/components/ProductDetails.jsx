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
  
  // Format the product name in title case
  const formattedProductName = product ? toTitleCase(product.product_name) : '';
  
  // Add state for image slider
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  
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
    ]
  };
  
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
  
  // Updated mock data for related products to match the API structure
  const relatedProductsData = [
    {
      _id: "related1",
      product_name: "Related Product 1",
      price: 899,
      images: [product?.images],
      description: "Description for related product 1",
      sizes: [
        { size: "S", quantity: 10 },
        { size: "M", quantity: 15 },
        { size: "L", quantity: 20 }
      ],
      isActive: true,
      isSold: false
    },
    {
      _id: "related2",
      product_name: "Related Product 2",
      price: 799,
      images: [product?.images],
      description: "Description for related product 2",
      sizes: [
        { size: "S", quantity: 5 },
        { size: "M", quantity: 10 },
        { size: "L", quantity: 15 }
      ],
      isActive: true,
      isSold: false
    }
  ];

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
    console.log(token);
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
              price: product.price,
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
      return;
    }
    navigate('/checkout');
  };

  const handleRelatedProductClick = (relatedProduct) => {
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
            <ol className="list-none p-0 inline-flex items-center">
              <li className="flex items-center">
                <Link to="/" className="text-gray-500 hover:text-black transition-colors">Home</Link>
                <span className="mx-2 text-gray-400">/</span>
              </li>
              <li className="flex items-center">
                <Link to="/shop" className="text-gray-500 hover:text-black transition-colors">Shop</Link>
                <span className="mx-2 text-gray-400">/</span>
              </li>
              <li className="text-gray-800 font-medium truncate max-w-xs">{formattedProductName}</li>
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
                  <Slider {...sliderSettings}>
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
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  {/* <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white p-2 rounded-full shadow-md"
                  > */}
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
                      
                                    {/* </motion.button> */}
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
          </div>

          {/* Right Column - Enhanced Product Info */}
          <div className="flex flex-col space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{product.product_name.toUpperCase()}</h1>
                {/* Share Icon */}
                <ShareIcon 
                  className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors"
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
                  {/* <div>
                    <p className="font-medium">Free Shipping & Returns</p>
                    <p className="text-sm text-gray-600">Free shipping on orders over ₹999</p>
                  </div> */}
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
            
            {/* Product Description */}
            <div className="pt-6">
              <h3 className="font-medium mb-3 text-gray-900">Description</h3>
              <div className="prose prose-sm text-gray-700">
                <p>{product.description.toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Tabs Section */}
        <div className="mt-16">
          <Tab.Group>
            <Tab.List className="flex space-x-8 border-b">
              <Tab className={({ selected }) => 
                `pb-4 font-medium text-sm focus:outline-none ${
                  selected ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'
                }`
              }>
                Product Details
              </Tab>
              {/* <Tab className={({ selected }) => 
                `pb-4 font-medium text-sm focus:outline-none ${
                  selected ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'
                }`
              }>
                Reviews
              </Tab> */}
              <Tab className={({ selected }) => 
                `pb-4 font-medium text-sm focus:outline-none ${
                  selected ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'
                }`
              }>
                Shipping & Returns
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-8">
              <Tab.Panel>
                <div className="prose max-w-none">
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
                        <span className="text-gray-600">Color</span>
                        <span className="font-medium">{product.color || "Multiple"}</span>
                      </div>
                      <div className="grid grid-cols-2 border-b pb-2">
                        <span className="text-gray-600">Style</span>
                        <span className="font-medium">{product.product_details?.style || "Casual"}</span>
                      </div>
                      <div className="grid grid-cols-2 border-b pb-2">
                        <span className="text-gray-600">Season</span>
                        <span className="font-medium">{product.product_details?.season || "All Season"}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-medium mt-8 mb-4">Care Instructions</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Machine wash cold with similar colors</li>
                    <li>Do not bleach</li>
                    <li>Tumble dry low</li>
                    <li>Iron on low heat if needed</li>
                    <li>Do not dry clean</li>
                  </ul>
                </div>
              </Tab.Panel>
              
             
              <Tab.Panel>

                <div className="prose max-w-none">
                  <h3 className="text-xl font-medium mb-4">Shipping Information</h3>
                  <div className="space-y-4">
                    <p>We offer the following shipping options:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium">Standard Shipping</h4>
                        <p className="text-gray-600">5-7 business days</p>
                        <p className="text-gray-600">₹100 (Free on orders over ₹999)</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium">Express Shipping</h4>
                        <p className="text-gray-600">2-3 business days</p>
                        <p className="text-gray-600">₹250</p>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-medium mt-8 mb-4">Return Policy</h3>
                    <p>We want you to be completely satisfied with your purchase. If you're not happy with your order, we offer a simple return process:</p>
                    <ul className="list-disc pl-5">
                      <li>Items can be returned within 30 days of delivery</li>
                      <li>Products must be unused, unwashed, and in original packaging</li>
                      <li>Return shipping is free for eligible items</li>
                      <li>Refunds will be processed within 7-10 business days after we receive the returned item</li>
                    </ul>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>

        {/* Related Products - Enhanced */}
        <div className="mt-16 border-t pt-12">
          <h2 className="text-2xl font-bold mb-8 text-center">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {relatedProductsData.map(relatedProduct => (
              <motion.div
                key={relatedProduct._id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                whileHover={{ y: -5 }}
                onClick={() => handleRelatedProductClick(relatedProduct)}
              >
                <div className="relative pb-[125%] overflow-hidden">
                  <img 
                    src={relatedProduct.images[0]} 
                    alt={relatedProduct.product_name}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400';
                    }}
                  />
                  
                  {relatedProduct.original_price && relatedProduct.original_price > relatedProduct.price && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      {Math.round((1 - relatedProduct.price / relatedProduct.original_price) * 100)}% OFF
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium truncate">{toTitleCase(relatedProduct.product_name)}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <p className="font-bold text-gray-900">{formatPrice(relatedProduct.price)}</p>
                      {relatedProduct.original_price && relatedProduct.original_price > relatedProduct.price && (
                        <p className="text-sm text-gray-500 line-through ml-2">
                          {formatPrice(relatedProduct.original_price)}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex">
                      {/* {[...Array(5)].map((_, i) => (
                        <StarIcon 
                          key={i} 
                          className={`h-4 w-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))} */}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Enhanced Services Section */}
         {/* Add this new services section at the end, just before the closing </div> */}
      <div className="bg-gray-50 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1: Free Shipping */}
            {/* <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
              <img 
                src="https://wamani.vercel.app/wp-content/uploads/2023/06/Icon-Box-1.png" 
                alt="Free Shipping" 
                className="w-14 h-auto"
              />
              <div>
                <h3 className="font-medium text-lg">Free Shipping</h3>
                <p className="text-gray-600 text-sm">Free Shipping World wide</p>
              </div>
            </div> */}
            
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
          </div>
        </div>
      </div>

      {/* Share Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleShare}
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          <ShareIcon className="w-5 h-5" />
          <span>Share</span>
        </button>
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
      </div>
    </motion.div>
  );
}

export default ProductDetails;
