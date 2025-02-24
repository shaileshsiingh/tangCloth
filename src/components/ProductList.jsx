import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';

    function ProductList() {
      const [products, setProducts] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [sortBy, setSortBy] = useState('default');

      useEffect(() => {
        // Fetch products from dummy JSON
        fetch('/products.json')
          .then((res) => res.json())
          .then((data) => setProducts(data));
      }, []);

      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'price-asc') {
          return a.price - b.price;
        } else if (sortBy === 'price-desc') {
          return b.price - a.price;
        }
        return 0; // Default sorting
      });

      return (
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <p>Showing 1-12 of {products.length} results</p>
            <select
              className="border border-gray-300 rounded p-2"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default sorting</option>
              <option value="price-asc">Sort by price: low to high</option>
              <option value="price-desc">Sort by price: high to low</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-2 border border-gray-300 rounded mb-4"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedProducts.map((product) => (
              <div key={product.id} className="border p-4 rounded">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
                  <h2 className="text-lg font-bold">{product.name}</h2>
                  <p className="text-gray-700">${product.price}</p>
                </Link>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button className="px-4 py-2 mx-1 border rounded hover:bg-gray-100">1</button>
            <button className="px-4 py-2 mx-1 border rounded hover:bg-gray-100">2</button>
            <button className="px-4 py-2 mx-1 border rounded hover:bg-gray-100">3</button>
            <button className="px-4 py-2 mx-1 border rounded hover:bg-gray-100">...</button>
            <button className="px-4 py-2 mx-1 border rounded hover:bg-gray-100">6</button>
            <button className="px-4 py-2 mx-1 border rounded hover:bg-gray-100">Next</button>
          </div>
        </div>
      );
    }

    export default ProductList;
