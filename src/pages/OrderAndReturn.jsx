import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function OrderAndReturn() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    const fetchOrders = async () => {
      try {
        const response = await fetch('http://91.203.135.152:2001/api/order/getAllOrder', {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Orders and Returns</h1>
      {orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map(order => (
            <div key={order._id} className="border rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Order ID: {order._id}</h2>
              <p className="text-sm text-gray-600 mb-2">Total Price: ${order.total_price}</p>
              <p className="text-sm text-gray-600 mb-2">Status: {order.status || 'Pending'}</p>
              <p className="text-sm text-gray-600 mb-4">Created At: {order.createdAt || 'N/A'}</p>
              <h3 className="text-md font-medium mb-2">Items:</h3>
              <ul className="space-y-2">
                {order.order_items.map(item => (
                  <li key={item._id} className="flex justify-between items-center">
                    <span>Item ID: {item.item_id}</span>
                    <button 
                      className="text-blue-500 hover:underline"
                      onClick={() => navigate(`/product/${item.item_id}`)}
                    >
                      View Product
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

export default OrderAndReturn; 