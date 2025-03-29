import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OrderAndReturn() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const API_URL = "/api"; 
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/order/getAllOrder`, {
        // const response = await fetch(`http://91.203.135.152:2001/api/order/getAllOrder`, {
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

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.length > 0 ? (
        <div className="grid grid-cols-1 gap-8">
          {orders.map(order => (
            <div key={order._id} className="border rounded-lg shadow-lg p-6 bg-white">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Order #{order._id.slice(-6)}</h2>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                  {order.status || 'Pending'}
                </span>
              </div>
              
              <div className="mb-4 text-sm text-gray-600">
                <p>Order Date: {formatDate(order.createdAt)}</p>
                <p>Total: ${order.total_price?.toLocaleString() || '0'}</p>
              </div>
              
              <h3 className="text-md font-medium mb-3 border-b pb-2">Order Items</h3>
              {order.order_items.map(item => (
                <div key={item._id} className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b">
                  <div className="flex items-center mb-3 md:mb-0">
                    {item.images && item.images[0] && (
                      <img 
                        src={item.images[0]} 
                        alt={item.product_name} 
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                    )}
                    <div>
                      <h4 className="font-medium">{item.product_name}</h4>
                      <p className="text-sm text-gray-600">Size: {item.size}</p>
                      <p className="text-sm text-gray-600">Price: ${parseInt(item.price).toLocaleString()}</p>
                      <p className="text-sm mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          item.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.status}
                        </span>
                      </p>
                    </div>
                  </div>
                  <button 
                    className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                    onClick={() => navigate(`/product/${item.item_id}`)}
                  >
                    View Product
                  </button>
                </div>
              ))}
              
              <div className="mt-4 flex justify-end">
                <button className="text-blue-600 hover:underline">
                  Request Return
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-lg text-gray-600 mb-4">You haven't placed any orders yet.</p>
          <button 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => navigate('/shop')}
          >
            Browse Products
          </button>
        </div>
      )}
    </div>
  );
}

export default OrderAndReturn;