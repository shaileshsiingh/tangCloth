import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal, fetchCartItems, removeFromCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    paymentMethod: 'credit-card'
  });
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState('');

  useEffect(() => {
    fetchCartItems(); // Fetch cart items to ensure the order summary is up-to-date
  }, [fetchCartItems]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleApplyCoupon = () => {
    if (!couponCode) {
      setCouponMessage('Please enter a coupon code.');
      return;
    }
    // Placeholder for coupon API call
    // Assume a successful coupon application for demonstration
    setCouponMessage('Coupon applied successfully!');
    // Adjust prices based on coupon logic here
  };

  const handlePlaceOrder = async () => {
    // Validate form fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'country', 'zipCode'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields.', {
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

    try {
      const token = localStorage.getItem('authToken');
      const address_id = '67c970bf49a2ab0ce7857d98'; // Replace with actual address ID logic
      const shipping = 'standard'; // Replace with actual shipping logic
  
      // Check if cart has items
      if (!cart || cart.length === 0) {
        console.error('Cart is empty');
        return;
      }
  
      // Format the order exactly as the API expects
      const order = {
        item_id: [cart[0]._id], // Array of item IDs as specified
        quantity: cart[0].quantity,
        size: cart[0].selectedSize,
        total_price: String(cart[0].price * cart[0].quantity), // Convert to string
        address_id: String(address_id), // Ensure it's a string
        shipping
      };
  
      // Log the exact payload for debugging
      console.log('Request payload:', JSON.stringify(order));
  
      const response = await fetch('http://91.203.135.152:2001/api/order/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(order),
      });
  
      // Log the full response for debugging
      console.log('Response status:', response.status);
      
      const responseText = await response.text();
      console.log('Response body:', responseText);
      
      if (!response.ok) {
        throw new Error(`Failed to place order: ${responseText}`);
      }
  
      const result = JSON.parse(responseText);
      console.log('Order placed:', result);
      
      // Remove the item from the cart
      removeFromCart(cart[0]._id, cart[0].selectedSize);
      
      navigate('/order');
    } catch (error) {
      console.error('Error placing order:', error);
      // Show error to user
    }
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4 border-b">
        <nav className="text-sm">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link to="/" className="text-gray-500 hover:text-black">Home</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-800">Checkout</li>
          </ol>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-8">Billing Details</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-black"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Street Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-black"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Country *</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-black"
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">ZIP Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-black"
                    required
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Payment Method</h3>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit-card"
                      checked={formData.paymentMethod === 'credit-card'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Credit Card
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    PayPal
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={`${item?._id}-${item?.selectedSize}`} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item?.name}</p>
                    <p className="text-sm text-gray-600">Size: {item?.selectedSize}</p>
                    <p className="text-sm text-gray-600">Quantity: {item?.quantity}</p>
                  </div>
                  <p className="font-medium">${(item?.price * item?.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded mb-2"
              />
              <button
                onClick={handleApplyCoupon}
                className="w-full bg-black text-white py-2 hover:bg-gray-900 transition-colors"
              >
                Apply Coupon
              </button>
              {couponMessage && <p className="text-sm mt-2 text-red-500">{couponMessage}</p>}
            </div>

            <div className="border-t border-gray-200 mt-6 pt-6 space-y-4">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p className="font-medium">${cartTotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p className="font-medium">Free</p>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <p>Total</p>
                <p>${cartTotal.toFixed(2)}</p>
              </div>
            </div>

            <button
              type="submit"
              onClick={handlePlaceOrder}
              className="w-full bg-black text-white py-3 px-6 mt-6 hover:bg-gray-900 transition-colors"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;