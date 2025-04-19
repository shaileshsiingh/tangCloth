import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Package, ArrowRight, RefreshCw, AlertTriangle } from 'lucide-react';

function OrderAndReturn() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const API_URL = "/api"; 
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/order/getAllOrder`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        console.log('Fetched Orders:', data);
        setOrders(data.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Format date to a readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Processing':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <RefreshCw size={32} className="text-blue-600" />
        </motion.div>
        <p className="mt-4 text-gray-600 font-medium">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200 text-center my-8 mx-4"
      >
        <div className="flex flex-col items-center">
          <AlertTriangle size={32} className="text-red-500 mb-2" />
          <h3 className="text-lg font-semibold text-red-700">Error Loading Orders</h3>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const orderVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center mb-8 border-b pb-4"
        >
          <ShoppingBag size={28} className="text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
        </motion.div>

        {orders.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {orders.map(order => (
              <motion.div 
                key={order._id} 
                className="border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white overflow-hidden"
                variants={orderVariants}
              >
                <div 
                  className="bg-gradient-to-r from-blue-50 to-white p-6 cursor-pointer"
                  onClick={() => toggleOrderExpand(order._id)}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex items-center mb-4 md:mb-0">
                      <Package className="text-blue-600 mr-3" size={20} />
                      <h2 className="text-lg font-semibold text-gray-800">Order #{order._id.slice(-6)}</h2>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 border rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status || 'Pending'}
                      </span>
                      <motion.div
                        animate={{ rotate: expandedOrder === order._id ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight size={16} className="text-gray-500" />
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-8 gap-y-2 mt-3 text-sm text-gray-600">
                    <p>Order Date: <span className="font-medium">{formatDate(order.createdAt)}</span></p>
                    <p>Total: <span className="font-medium">₹{order.total_price?.toLocaleString() || '0'}</span></p>
                  </div>
                </div>
                
                <AnimatePresence>
                  {expandedOrder === order._id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0">
                        <div className="my-4 border-t border-gray-100"></div>
                        <h3 className="text-md font-medium mb-4 text-gray-700 flex items-center">
                          <ShoppingBag size={16} className="mr-2 text-blue-500" />
                          Order Items
                        </h3>
                        
                        <motion.div 
                          className="space-y-4" 
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          {order.order_items.map((item, index) => (
                            <motion.div 
                              key={item._id || index} 
                              className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 px-3 border border-gray-100 rounded-lg hover:bg-blue-50 transition-colors"
                              variants={itemVariants}
                            >
                              <div className="flex items-center mb-3 md:mb-0 w-full md:w-auto">
                                <div className="w-16 h-16 bg-gray-100 rounded-md mr-4 overflow-hidden flex-shrink-0">
                                  <img 
                                    src={item.images?.[0] || 'https://via.placeholder.com/100'} 
                                    alt={item.product_name} 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.src = 'https://via.placeholder.com/100';
                                    }}
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-800">{item.product_name}</h4>
                                  <div className="flex flex-wrap gap-x-4 text-sm text-gray-600 mt-1">
                                    <p>Size: <span className="font-medium">{item.size || 'N/A'}</span></p>
                                    <p>Price: <span className="font-medium">₹{parseInt(item.price).toLocaleString()}</span></p>
                                  </div>
                                  <p className="text-sm mt-2">
                                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                                      {item.status || 'Processing'}
                                    </span>
                                  </p>
                                </div>
                              </div>
                              
                              <motion.button 
                                className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100 font-medium flex items-center"
                                onClick={() => navigate(`/product/${item.item_id}`)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                View Product
                              </motion.button>
                            </motion.div>
                          ))}
                        </motion.div>
                        
                        <div className="mt-6 flex justify-end">
                          <motion.button 
                            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <RefreshCw size={16} className="mr-2" />
                            Request Return
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <ShoppingBag size={64} className="text-gray-300 mx-auto mb-6" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Orders Yet</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">You haven't placed any orders yet. Start shopping to see your order history here.</p>
            <motion.button 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center mx-auto"
              onClick={() => navigate('/shop')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Products
              <ArrowRight size={16} className="ml-2" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default OrderAndReturn;