import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

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
      
      const response = await fetch('/api/rating/add', {
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
        onReviewAdded(data);
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

  // Mock data for reviews and related products
  const reviews = {
    rating: 4,
    count: 5,
    items: [
      { id: 1, rating: 4, comment: "Great product! Very satisfied with the quality." },
      { id: 2, rating: 5, comment: "Perfect fit and excellent material." }
    ]
  };

  // Updated mock data for related products to match the API structure
  const relatedProducts = [
    {
      _id: "related1",
      product_name: "Related Product 1",
      price: 899,
      images: [product?.images[0]],
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
      images: [product?.images[0]],
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

  // Handle receiving a new review
  const handleReviewAdded = (newReview) => {
    // Update your product reviews state here
    console.log('New review added:', newReview);
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
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link to="/" className="text-gray-500 hover:text-black">Home</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <Link to="/shop" className="text-gray-500 hover:text-black">Shop</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-800">{product.product_name}</li>
          </ol>
        </nav>
      </div>

      {/* Product Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {product.images.map((image, index) => (
              <div key={index} className="bg-gray-50">
                <img 
                  src={image} 
                  alt={`${product.product_name} - View ${index + 1}`}
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400';
                  }}
                />
              </div>
            ))}
          </div>

          {/* Right Column - Product Info */}
          <div>
            <h1 className="text-3xl font-medium mb-2">{product.product_name}</h1>
            
            {/* Reviews Summary */}
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <StarIcon 
                  key={i} 
                  className={`h-4 w-4 ${i < reviews.rating ? 'text-black-400' : 'text-gray-200'}`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">({reviews.count} customer reviews)</span>
            </div>

            <div className="text-xl mb-6">
              ${product.price}
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((sizeObj) => (
                  <button
                    key={sizeObj.size}
                    onClick={() => setSelectedSize(sizeObj.size)}
                    className={`
                      w-12 h-12 flex items-center justify-center border
                      ${selectedSize === sizeObj.size 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-200 hover:border-black'
                      }
                      ${sizeObj.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    disabled={sizeObj.quantity === 0}
                  >
                    {sizeObj.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Quantity</h3>
              <div className="flex items-center w-32">
                <button 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="w-10 h-10 border border-gray-200 flex items-center justify-center"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <div className="w-12 h-10 border-t border-b border-gray-200 flex items-center justify-center">
                  {quantity}
                </div>
                <button 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-10 h-10 border border-gray-200 flex items-center justify-center"
                  disabled={selectedSize && quantity >= (product.sizes.find(s => s.size === selectedSize)?.quantity || Infinity)}
                >
                  +
                </button>
              </div>
              {selectedSize && (
                <p className="text-sm text-gray-500 mt-1">
                  {product.sizes.find(s => s.size === selectedSize)?.quantity || 0} available
                </p>
              )}
            </div>

            {/* Add to Cart & Buy Now */}
            <div className="space-y-3">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-3 hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedSize || quantity < 1}
              >
                {!selectedSize ? 'SELECT A SIZE' : `ADD TO CART - $${(product.price * quantity).toFixed(2)}`}
              </button>
              <button 
                className="w-full border border-black py-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedSize || quantity < 1}
                onClick={handleBuyNow}
              >
                BUY IT NOW
              </button>
            </div>

            {/* Product Information Tabs */}
            <div className="mt-12">
              <Tab.Group>
                <Tab.List className="flex border-b">
                  <Tab className={({ selected }) =>
                    `px-6 py-3 text-sm font-medium border-b-2 ${
                      selected ? 'border-black text-black' : 'border-transparent text-gray-500'
                    }`
                  }>
                    Description
                  </Tab>
                  <Tab className={({ selected }) =>
                    `px-6 py-3 text-sm font-medium border-b-2 ${
                      selected ? 'border-black text-black' : 'border-transparent text-gray-500'
                    }`
                  }>
                    Additional Information
                  </Tab>
                  <Tab className={({ selected }) =>
                    `px-6 py-3 text-sm font-medium border-b-2 ${
                      selected ? 'border-black text-black' : 'border-transparent text-gray-500'
                    }`
                  }>
                    Reviews ({reviews.count})
                  </Tab>
                  <Tab className={({ selected }) =>
                    `px-6 py-3 text-sm font-medium border-b-2 ${
                      selected ? 'border-black text-black' : 'border-transparent text-gray-500'
                    }`
                  }>
                    Shipping & Delivery
                  </Tab>
                </Tab.List>
                <Tab.Panels className="pt-6">
                  <Tab.Panel>
                    <div className="prose max-w-none">
                      <p>{product.description}</p>
                    </div>
                  </Tab.Panel>
                  
                  <Tab.Panel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium">Brand</h3>
                        <p className="text-gray-600">{product.brand || 'Not specified'}</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Material</h3>
                        <p className="text-gray-600">{product.material || 'Not specified'}</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Color</h3>
                        <p className="text-gray-600">{product.color || 'Not specified'}</p>
                      </div>
                    </div>
                  </Tab.Panel>
                  
                  <Tab.Panel>
                    <div>
                      {/* Review summary */}
                      <div className="mb-6">
                        <div className="flex items-center mb-2">
                          <div className="flex mr-2">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon 
                                key={i} 
                                className={`h-5 w-5 ${i < reviews.rating ? 'text-black-400' : 'text-gray-200'}`}
                              />
                            ))}
                          </div>
                          <span className="text-lg font-medium">{reviews.rating} out of 5</span>
                        </div>
                        <p className="text-gray-600">{reviews.count} customer ratings</p>
                      </div>
                      
                      {/* Existing reviews */}
                      <div className="space-y-6 mb-8">
                        {reviews.items.map((review) => (
                          <div key={review.id} className="border-b pb-4">
                            <div className="flex mb-2">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon 
                                  key={i} 
                                  className={`h-4 w-4 ${i < review.rating ? 'text-black-400' : 'text-gray-200'}`}
                                />
                              ))}
                            </div>
                            <p className="text-gray-800">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                      
                      {/* Add ReviewForm component here */}
                      <ReviewForm productId={product?._id} onReviewAdded={handleReviewAdded} />
                    </div>
                  </Tab.Panel>
                  
                  <Tab.Panel>
                    <div className="prose max-w-none">
                      <p>We offer standard shipping with delivery within 5-7 business days.</p>
                      <p>Express shipping is available with delivery within 2-3 business days at an additional cost.</p>
                      <p>Free shipping on all orders over $100.</p>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 border-t pt-8">
          <h2 className="text-2xl font-medium mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <motion.div
                key={relatedProduct._id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                whileHover={{ y: -5 }}
                onClick={() => handleRelatedProductClick(relatedProduct)}
              >
                <div className="relative pb-[100%]">
                  <img 
                    src={relatedProduct.images[0]} 
                    alt={relatedProduct.product_name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium">{relatedProduct.product_name}</h3>
                  <p className="text-gray-600 mb-2">${relatedProduct.price}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon 
                          key={i} 
                          className={`h-4 w-4 ${i < 4 ? 'text-black-400' : 'text-gray-200'}`}
                        />
                      ))}
                    </div>
                    {relatedProduct.sizes.reduce((total, size) => total + size.quantity, 0) > 0 ? (
                      <span className="text-green-600 text-sm">In Stock</span>
                    ) : (
                      <span className="text-red-600 text-sm">Out of Stock</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductDetails;
