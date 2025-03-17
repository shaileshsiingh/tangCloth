import React, { useState, useEffect } from 'react';

function HomePage() {
  const [showCard, setShowCard] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://91.203.135.152:2001/api/product/list');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();

    const interval = setInterval(() => {
      setShowCard(true);
      setTimeout(() => setShowCard(false), 5000); // Show card for 5 seconds
    }, 8000); // Show card every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Casual Outfits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <div key={product._id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img src={product.images[0]} alt={product.product_name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{product.product_name}</h3>
                  <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Trending Apparels</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(4, 8).map((product) => (
              <div key={product._id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img src={product.images[0]} alt={product.product_name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{product.product_name}</h3>
                  <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Add more sections as needed */}
      </div>

      {showCard && (
        <div className="fixed bottom-4 left-4 bg-white shadow-lg p-4 rounded-lg w-64 h-64 flex flex-col justify-between">
          <img src="https://wamani.vercel.app/wp-content/uploads/2023/05/Home-1-Slider-1-2.jpg" alt="Product" className="w-full h-32 object-cover rounded" />
          <div className="mt-2">
            <h3 className="text-lg font-bold">Coat</h3>
            <p className="text-sm text-gray-600">$99.99</p>
            <p className="text-lg font-bold text-black-500">Just purchased!</p>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage; 