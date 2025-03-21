import React from 'react';

const categories = [
  { name: 'WOMEN', image: '	https://tangerineluxury.com/wp-content/uploads/2024/04/Women-final.webp' },
  { name: 'MEN', image: 'https://tangerineluxury.com/wp-content/uploads/2024/04/Men-final.webp' },
  { name: 'KIDS', image: 'https://tangerineluxury.com/wp-content/uploads/2024/04/Kids-Final.webp' },
];

function Categories() {
  return (
    <div className="bg-pink-100 py-12">
      <h2 className="text-center text-3xl font-bold mb-8">CATEGORIES</h2>
      <div className="flex justify-center space-x-8">
        {categories.map((category) => (
          <div key={category.name} className="text-center">
            <img
              src={category.image}
              alt={category.name}
              className="w-64 h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600">
              EXPLORE MORE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories; 