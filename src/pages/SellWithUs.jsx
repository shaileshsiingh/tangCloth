import React, { useState } from 'react';
import { Camera, Truck, Shield, CreditCard, MessageCircle } from 'lucide-react';

const SellWithUsForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    itemType: '',
    brand: '',
    productCondition: '',
    description: '',
    sellingPrice: '',
    estimatedRetailPrice: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add submission logic here
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Sell With Us</h2>
          <p className="mt-2 text-sm text-gray-600">
            Turn your luxury items into cash with Tangerine Luxury
          </p>
        </div>
        
        <div 
          className="bg-white shadow-lg rounded-xl p-8 transition-all duration-300 hover:shadow-xl"
          style={{
            backgroundImage: 'url(https://tangerineluxury.com/wp-content/uploads/202…11/laura-chouette-FTaKIJ_uEo0-unsplash-scaled.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              />
              <input
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              />
            </div>
            
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
            />
            
            <input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
            />
            
            <input
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
            />
            
            <select
              name="itemType"
              value={formData.itemType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
            >
              <option value="">Select Your Item</option>
              <option value="handbags">Handbags</option>
              <option value="accessories">Accessories</option>
              <option value="jewelry">Jewelry</option>
            </select>
            
            <div className="grid grid-cols-2 gap-4">
              <select
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              >
                <option value="">Select Your Brand</option>
                <option value="chanel">Chanel</option>
                <option value="gucci">Gucci</option>
                <option value="prada">Prada</option>
              </select>
              
              <select
                name="productCondition"
                value={formData.productCondition}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              >
                <option value="">Product Condition</option>
                <option value="new">New</option>
                <option value="verygood">Very Good</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>
            
            <textarea
              name="description"
              placeholder="Description (Any wear and tear, dust, bug belongings)"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              rows="4"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <input
                name="sellingPrice"
                placeholder="Selling Price"
                type="number"
                value={formData.sellingPrice}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              />
              <input
                name="estimatedRetailPrice"
                placeholder="Estimated Retail Price"
                type="number"
                value={formData.estimatedRetailPrice}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Send
            </button>
          </form>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center">
            <Camera className="text-orange-500 w-12 h-12 mb-2 animate-bounce" />
            <h3 className="font-semibold">Share Image</h3>
            <p className="text-xs text-gray-600">Share image of the product you wish to sell</p>
          </div>
          <div className="flex flex-col items-center">
            <Shield className="text-orange-500 w-12 h-12 mb-2 animate-pulse" />
            <h3 className="font-semibold">Authentication</h3>
            <p className="text-xs text-gray-600">Review and process listing</p>
          </div>
          <div className="flex flex-col items-center">
            <CreditCard className="text-orange-500 w-12 h-12 mb-2 animate-bounce" />
            <h3 className="font-semibold">Payment</h3>
            <p className="text-xs text-gray-600">Credit in 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellWithUsForm;