import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/24/solid';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

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
    if (product && selectedSize) {
      const selectedSizeObj = product.sizes.find(s => s.size === selectedSize);
      if (selectedSizeObj && selectedSizeObj.quantity >= quantity) {
        try {
          const token = localStorage.getItem('authToken'); // Retrieve the token from local storage

          const response = await fetch(`${API_URL}/cart/add-item`, {
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

  const handleRelatedProductClick = (relatedProduct) => {
    navigate(`/product/${relatedProduct._id}`, { state: { product: relatedProduct } });
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
                  className={`h-4 w-4 ${i < reviews.rating ? 'text-yellow-400' : 'text-gray-200'}`}
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
                onClick={() => navigate('/checkout')}
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
                  <Tab.Panel className="text-gray-600">{product.description}</Tab.Panel>
                  <Tab.Panel className="text-gray-600 whitespace-pre-line">
                    <div>
                      <h4 className="font-medium mb-2">Available Sizes:</h4>
                      <ul>
                        {product.sizes.map(size => (
                          <li key={size.size}>
                            Size {size.size}: {size.quantity} in stock
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Tab.Panel>
                  <Tab.Panel className="text-gray-600">
                    <div className="space-y-4">
                      {reviews.items.map(review => (
                        <div key={review.id} className="border-b pb-4">
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                              />
                            ))}
                          </div>
                          <p>{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </Tab.Panel>
                  <Tab.Panel className="text-gray-600">
                    <p>Standard shipping: 3-5 business days</p>
                    <p>Express shipping: 1-2 business days</p>
                    <p>Free shipping on orders over $100</p>
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
                          className={`h-4 w-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-200'}`}
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
