import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

function ProductRequestForm() {
  const [formData, setFormData] = useState({
    productName: '',
    brand: '',
    description: '',
    imageUrl: '',
    priceRange: '',
    contactEmail: '',
    contactPhone: '',
    additionalInfo: ''
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Here you would typically send the data to your backend
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success handling
      toast.success('Your product request has been submitted successfully!');
      setFormData({
        productName: '',
        brand: '',
        description: '',
        imageUrl: '',
        priceRange: '',
        contactEmail: '',
        contactPhone: '',
        additionalInfo: ''
      });
    } catch (error) {
      toast.error('Failed to submit your request. Please try again.');
      console.error('Error submitting product request:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12" style={{backgroundColor:'#FAF9F6'}}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Request a Product</h1>
        <p className="text-gray-600 mb-8 text-center">
          Can't find what you're looking for? Let us know, and we'll try to source it for you!
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="productName" className="block text-gray-700 font-medium mb-2">
                Product Name*
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="e.g., Louis Vuitton Neverfull MM"
              />
            </div>
            
            <div>
              <label htmlFor="brand" className="block text-gray-700 font-medium mb-2">
                Brand*
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="e.g., Louis Vuitton, Gucci, Prada"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Product Description*
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Please describe the product in detail (color, size, specific model, etc.)"
            ></textarea>
          </div>
          
          <div className="mb-6">
            <label htmlFor="imageUrl" className="block text-gray-700 font-medium mb-2">
              Image URL (Optional)
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="https://example.com/product-image.jpg"
            />
            <p className="text-sm text-gray-500 mt-1">
              If you have a reference image, paste the URL here
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="priceRange" className="block text-gray-700 font-medium mb-2">
                Expected Price Range*
              </label>
              <select
                id="priceRange"
                name="priceRange"
                value={formData.priceRange}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Select a price range</option>
                <option value="0-5000">₹0 - ₹5,000</option>
                <option value="5000-10000">₹5,000 - ₹10,000</option>
                <option value="10000-25000">₹10,000 - ₹25,000</option>
                <option value="25000-50000">₹25,000 - ₹50,000</option>
                <option value="50000+">₹50,000+</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="contactEmail" className="block text-gray-700 font-medium mb-2">
                Contact Email*
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="contactPhone" className="block text-gray-700 font-medium mb-2">
              Contact Phone Number
            </label>
            <input
              type="tel"
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="+91 9876543210"
            />
          </div>
          
          <div className="mb-8">
            <label htmlFor="additionalInfo" className="block text-gray-700 font-medium mb-2">
              Additional Information
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Any additional details or special requirements..."
            ></textarea>
          </div>
          
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:bg-gray-400"
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default ProductRequestForm; 