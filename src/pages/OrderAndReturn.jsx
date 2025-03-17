import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function OrderAndReturn() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.log(data);
        setOrders(data.orders || []);
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
        <ul>
          {orders.map(order => (
            <li key={order.id} className="mb-4">
              <Link to={`/order/${order.id}`} className="text-blue-500 hover:underline">
                Order ID: {order.id}
              </Link>
              <p>Total: ${order.total}</p>
              <p>Status: {order.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

export default OrderAndReturn; 