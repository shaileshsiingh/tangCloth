import React from 'react';

const items = [
  { name: 'APPAREL', image: 'https://tangerineluxury.com/wp-content/uploads/2024/10/Gucci.png' },
  { name: 'BAGS', image: 'https://tangerineluxury.com/wp-content/uploads/2024/04/C22.webp' },
  { name: 'FOOTWEAR', image: 'https://tangerineluxury.com/wp-content/uploads/2024/04/C33.webp' },
  { name: 'ACCESSORIES', image: 'https://tangerineluxury.com/wp-content/uploads/2024/04/C44.webp' },
];

function PrelovedLuxury() {
  return (
    <div className="bg-pink-100 py-12">
      <h2 className="text-center text-3xl font-bold mb-8">EXPLORE PRELOVED LUXURY</h2>
      <div className="flex justify-center space-x-8">
        {items.map((item) => (
          <div key={item.name} className="text-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-64 h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600">
              EXPLORE MORE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PrelovedLuxury; 