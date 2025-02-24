import React from 'react';

    function CategoryBanner() {
      return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 h-[600px]">
          <div className="relative group overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              alt="Category 1"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-xl font-semibold mb-2">Accessories</h3>
              <span className="text-sm uppercase tracking-wider border-b-2 border-white pb-1">Shop Now</span>
            </div>
          </div>
          <div className="relative group overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              alt="Category 2"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-xl font-semibold mb-2">Dresses</h3>
              <span className="text-sm uppercase tracking-wider border-b-2 border-white pb-1">Shop Now</span>
            </div>
          </div>
          <div className="relative group overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              alt="Category 3"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-xl font-semibold mb-2">Footwear</h3>
              <span className="text-sm uppercase tracking-wider border-b-2 border-white pb-1">Shop Now</span>
            </div>
          </div>
          <div className="relative group overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              alt="Category 4"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-xl font-semibold mb-2">Outerwear</h3>
              <span className="text-sm uppercase tracking-wider border-b-2 border-white pb-1">Shop Now</span>
            </div>
          </div>
        </section>
      );
    }

    export default CategoryBanner;
