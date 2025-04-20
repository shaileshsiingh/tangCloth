import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

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
    state: '',
    country: 'India',
    zipCode: '',
    paymentMethod: 'cod'
  });
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchCartItems(); // Fetch cart items to ensure the order summary is up-to-date
  }, [fetchCartItems]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCardInputChange = (e) => {
    setCardDetails({
      ...cardDetails,
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
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
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

    if (formData.paymentMethod === 'cod') {
      // Process Cash on Delivery order directly
      processOrder();
    } else {
      // Show payment modal for other payment methods
      setShowPaymentModal(true);
    }
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!cardDetails.cardNumber || !cardDetails.cardName || !cardDetails.expiryDate || !cardDetails.cvv) {
      toast.error('Please complete all card details', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        style: {backgroundColor: 'black', color: 'white', borderRadius: '10px'}
      });
      return;
    }
    
    // Process order with card details
    processOrder();
  };

  const processOrder = async () => {
    setIsProcessing(true);
    
    try {
      const token = localStorage.getItem('authToken');
      const address_id = '67c970bf49a2ab0ce7857d98'; // Replace with actual address ID logic
      const shipping = 'standard'; // Replace with actual shipping logic
      const API_URL = "/api";
      
      // Check if cart has items
      if (!cart || cart.length === 0) {
        toast.error('Your cart is empty', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          style: {backgroundColor: 'black', color: 'white', borderRadius: '10px'}
        });
        setIsProcessing(false);
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

      const response = await fetch(`${API_URL}/order/add`, {
      // const response = await fetch(`http://192.168.1.10:2001/api/order/add`, {
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
      
      // Navigate to order success page
      window.scrollTo(0, 0);
      navigate('/order');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to process your order. Please try again.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        style: {backgroundColor: 'black', color: 'white', borderRadius: '10px'}
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const PaymentMethodDetails = () => {
    switch(formData.paymentMethod) {
      case 'card':
        return (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">
              You'll enter your card details when you place the order.
            </p>
          </div>
        );
      case 'upi':
        return (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">
              You'll be prompted to complete the UPI payment after placing your order.
            </p>
          </div>
        );
      case 'netbanking':
        return (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">
              You'll be redirected to your bank's website to complete the payment.
            </p>
          </div>
        );
      case 'wallet':
        return (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">
              You'll be redirected to complete the payment via your selected wallet.
            </p>
            <div className="mt-2 flex space-x-3">
              <label className="flex items-center">
                <input type="radio" name="wallet" className="mr-1" /> Paytm
              </label>
              <label className="flex items-center">
                <input type="radio" name="wallet" className="mr-1" /> PhonePe
              </label>
              <label className="flex items-center">
                <input type="radio" name="wallet" className="mr-1" /> Google Pay
              </label>
            </div>
          </div>
        );
      case 'cod':
      default:
        return (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">
              Pay with cash when your order is delivered. Additional ₹40 fee applies.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white"  style={{backgroundColor:'#FAF9F6'}}>
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

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-6">Billing Details</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-black text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-black text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-black text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-black text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Street Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-black text-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-black text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">State/Province *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-black text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Country *</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-black text-sm"
                      required
                    >
                      <option value="India">India</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">PIN Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-black text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Payment Method</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <label className={`flex flex-col items-center border rounded-md p-3 cursor-pointer transition-colors ${formData.paymentMethod === 'card' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6 mb-1">
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                      </svg>
                      <span className="text-sm">Credit Card</span>
                    </label>
                    <label className={`flex flex-col items-center border rounded-md p-3 cursor-pointer transition-colors ${formData.paymentMethod === 'upi' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6 mb-1">
                        <path d="M12 2v20M5 5l14 14M19 5L5 19" />
                      </svg>
                      <span className="text-sm">UPI</span>
                    </label>
                    <label className={`flex flex-col items-center border rounded-md p-3 cursor-pointer transition-colors ${formData.paymentMethod === 'netbanking' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="netbanking"
                        checked={formData.paymentMethod === 'netbanking'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6 mb-1">
                        <path d="M3 10h18M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM12 15h.01" />
                      </svg>
                      <span className="text-sm">Net Banking</span>
                    </label>
                    <label className={`flex flex-col items-center border rounded-md p-3 cursor-pointer transition-colors ${formData.paymentMethod === 'wallet' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="wallet"
                        checked={formData.paymentMethod === 'wallet'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6 mb-1">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="M21 15h-3a2 2 0 0 1 0-4h3" />
                      </svg>
                      <span className="text-sm">Wallet</span>
                    </label>
                    <label className={`flex flex-col items-center border rounded-md p-3 cursor-pointer transition-colors ${formData.paymentMethod === 'cod' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6 mb-1">
                        <path d="M3 5h18v14H3z" />
                        <path d="M21 16H8m0 0l3-3m-3 3l3 3" />
                      </svg>
                      <span className="text-sm">Cash on Delivery</span>
                    </label>
                  </div>
                  
                  {/* Payment method details */}
                  <PaymentMethodDetails />
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              {cart.length === 0 ? (
                <p className="text-gray-500 my-4">Your cart is empty</p>
              ) : (
                <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
                  {cart.map((item) => (
                    <div key={`${item?._id}-${item?.selectedSize}`} className="flex justify-between border-b pb-3">
                      <div className="flex">
                        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden mr-3 flex-shrink-0">
                          <img 
                            src={item?.image} 
                            alt={item?.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/100';
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item?.name.toUpperCase()}</p>
                          <p className="text-xs text-gray-600">Size: {item?.selectedSize}</p>
                          <p className="text-xs text-gray-600">Quantity: {item?.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium text-sm">₹{(item?.price * item?.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-900 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && <p className="text-sm mt-2 text-red-500">{couponMessage}</p>}
              </div>

              <div className="border-t border-gray-200 mt-6 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <p>Subtotal</p>
                  <p className="font-medium">₹{cartTotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p>Shipping</p>
                  <p className="font-medium">Free</p>
                </div>
                {formData.paymentMethod === 'cod' && (
                  <div className="flex justify-between text-sm">
                    <p>COD Fee</p>
                    <p className="font-medium">₹40.00</p>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <p>Total</p>
                  <p>₹{(cartTotal + (formData.paymentMethod === 'cod' ? 40 : 0)).toFixed(2)}</p>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={cart.length === 0 || isProcessing}
                className={`w-full bg-black text-white py-3 mt-6 rounded hover:bg-gray-900 transition-colors ${(cart.length === 0 || isProcessing) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isProcessing ? 'Processing...' : 'PLACE ORDER'}
              </button>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                By placing your order, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Payment Details</h3>
                <button onClick={() => setShowPaymentModal(false)} className="text-gray-500 hover:text-black">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSubmitPayment}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.cardNumber}
                      onChange={handleCardInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                      maxLength={19}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Name on Card</label>
                    <input
                      type="text"
                      name="cardName"
                      placeholder="John Doe"
                      value={cardDetails.cardName}
                      onChange={handleCardInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={cardDetails.expiryDate}
                        onChange={handleCardInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={handleCardInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full bg-black text-white py-3 rounded hover:bg-gray-900 transition-colors ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isProcessing ? 'Processing...' : `Pay ₹${cartTotal.toFixed(2)}`}
                  </button>
                </div>
              </form>
              
              <div className="mt-4 flex justify-center">
                <img 
                  src="https://www.nicepng.com/png/detail/87-870073_credit-cards-logos-png-credit-card-logo-transparent.png" 
                  alt="Accepted Payment Methods" 
                  className="h-8"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
    </div>
  );
}

export default Checkout;