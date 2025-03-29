import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // const response = await fetch(`/api/order/details/${orderId}`);
        const response = await fetch(`http://192.168.1.10:5000/api/order/details/${orderId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      {order ? (
        <div>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Total:</strong> ${order.total}</p>
          <p><strong>Status:</strong> {order.status}</p>
          {/* Add more order details as needed */}
        </div>
      ) : (
        <p>No order details available.</p>
      )}
    </div>
  );
}

export default OrderDetails; 