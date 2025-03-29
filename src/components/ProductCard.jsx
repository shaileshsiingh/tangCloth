import { useNavigate } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';

const ProductCard = ({ id, name, price, image, rating, reviews }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div 
      onClick={handleProductClick}
      className="group cursor-pointer transition-all duration-300 hover:shadow-lg"
    >
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="mt-4 text-center p-4">
        <h3 className="text-lg font-medium hover:text-gray-700">{name}</h3>
        <div className="flex items-center justify-center mt-1">
          {[...Array(5)].map((_, i) => (
            <StarIcon 
              key={i} 
              className={`h-4 w-4 ${i < rating ? 'text-black-400' : 'text-gray-200'}`}
            />
          ))}
          <span className="ml-1 text-sm text-gray-500">({reviews})</span>
        </div>
        <p className="text-gray-600 mt-1">
          ${(price || 0).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard; 