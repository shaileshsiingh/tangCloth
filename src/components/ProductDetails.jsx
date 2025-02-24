import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/24/solid';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { getProductById, getRelatedProducts } from '../data/products';

function ProductDetails() {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(id);
  const relatedProducts = getRelatedProducts(id);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
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
            <li className="text-gray-800">{product.name}</li>
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
                  alt={`${product.name} - View ${index + 1}`}
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>

          {/* Right Column - Product Info */}
          <div>
            <h1 className="text-3xl font-medium mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <StarIcon 
                  key={i} 
                  className={`h-4 w-4 ${i < product.reviews.rating ? 'text-black-400' : 'text-gray-200'}`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">({product.reviews.count} customer reviews)</span>
            </div>

            <div className="text-xl mb-6">
              ${product.price.min.toFixed(2)} - ${product.price.max.toFixed(2)}
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      w-12 h-12 flex items-center justify-center border
                      ${selectedSize === size 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-200 hover:border-black'
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Quantity</h3>
              <div className="flex items-center w-32">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-200 flex items-center justify-center"
                >
                  -
                </button>
                <div className="w-12 h-10 border-t border-b border-gray-200 flex items-center justify-center">
                  {quantity}
                </div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-200 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart & Buy Now */}
            <div className="space-y-3">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-3 hover:bg-gray-900 transition-colors"
              >
                ADD TO CART
              </button>
              <button className="w-full border border-black py-3 hover:bg-gray-50">
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
                    Reviews (1)
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
                  <Tab.Panel className="text-gray-600 whitespace-pre-line">{product.additionalInfo}</Tab.Panel>
                  <Tab.Panel className="text-gray-600">
                    <div className="flex items-center mb-4">
                      {[...Array(product.reviews.rating)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-black-400" />
                      ))}
                      <p className="ml-2">Great product! Very satisfied with the quality.</p>
                    </div>
                  </Tab.Panel>
                  <Tab.Panel className="text-gray-600">{product.shippingInfo}</Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 border-t pt-8">
          <h2 className="text-2xl font-medium mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="group"
              >
                <div className="relative overflow-hidden mb-4">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </div>
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-gray-600">${product.price.min.toFixed(2)} - ${product.price.max.toFixed(2)}</p>
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      className={`h-4 w-4 ${i < product.reviews.rating ? 'text-black-400' : 'text-gray-200'}`}
                    />
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductDetails;
