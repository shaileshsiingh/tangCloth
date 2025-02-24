import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { StarIcon } from '@heroicons/react/24/solid';

function QuickView({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            <X size={24} />
          </button>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-[500px] object-cover"
              />
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-2">{product.name}</h2>
              
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i}
                    className={`h-4 w-4 ${
                      i < product.reviews.rating ? 'text-black-400' : 'text-gray-200'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  ({product.reviews.count} reviews)
                </span>
              </div>

              <p className="text-xl mb-4">
                ${product.price.min.toFixed(2)} - ${product.price.max.toFixed(2)}
              </p>

              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Size</h3>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        w-10 h-10 flex items-center justify-center border
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

              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-3 hover:bg-gray-900 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default QuickView; 