export const products = [
  {
    id: '1',
    name: 'Combo Dress',
    price: {
      min: 42,
      max: 45
    },
    images: [
      'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Experience pure comfort and style with our signature combo dress. Perfect for any occasion, this versatile piece combines modern design with classic elements.',
    additionalInfo: 'Material: 100% Cotton\nCare Instructions: Machine wash cold\nModel is wearing size M',
    reviews: {
      count: 12,
      rating: 4
    },
    shippingInfo: 'Free shipping on orders over $50. Delivery within 3-5 business days.'
  },
  {
    id: '2',
    name: 'French Coat',
    price: {
      min: 58,
      max: 65
    },
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    ],
    sizes: ['S', 'M', 'L'],
    description: 'Stay warm and stylish with our French coat. Made with premium materials for lasting comfort.',
    additionalInfo: 'Material: Wool blend\nCare Instructions: Dry clean only\nModel is wearing size M',
    reviews: {
      count: 8,
      rating: 4
    },
    shippingInfo: 'Free shipping on orders over $50. Delivery within 3-5 business days.'
  },
  {
    id: '3',
    name: 'Stylish Winter Coat',
    price: {
      min: 68,
      max: 75
    },
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Our winter coat combines warmth with contemporary style.',
    additionalInfo: 'Material: Premium wool blend\nCare Instructions: Dry clean only',
    reviews: {
      count: 15,
      rating: 4
    },
    shippingInfo: 'Free shipping on orders over $50.'
  },
  {
    id: '4',
    name: 'Party Dress',
    price: {
      min: 45,
      max: 50
    },
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Make a statement at any party with this elegant dress.',
    additionalInfo: 'Material: Silk blend\nCare Instructions: Hand wash cold',
    reviews: {
      count: 6,
      rating: 3
    },
    shippingInfo: 'Free shipping on orders over $50.'
  },
  {
    id: '5',
    name: 'Summer Suit',
    price: {
      min: 89,
      max: 95
    },
    images: [
      'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Perfect for summer occasions, this suit combines style with comfort.',
    additionalInfo: 'Material: Premium blend\nCare Instructions: Dry clean only',
    reviews: {
      count: 10,
      rating: 4
    },
    shippingInfo: 'Free shipping on orders over $50.'
  },
  {
    id: '6',
    name: 'Denim Shorts',
    price: {
      min: 45,
      max: 48
    },
    images: [
      'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    ],
    sizes: ['S', 'M', 'L'],
    description: 'Classic denim shorts perfect for casual wear.',
    additionalInfo: 'Material: 100% Cotton Denim\nCare Instructions: Machine wash cold',
    reviews: {
      count: 15,
      rating: 5
    },
    shippingInfo: 'Free shipping on orders over $50.'
  }
];

export const getProductById = (id) => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (currentProductId) => {
  return products
    .filter(product => product.id !== currentProductId)
    .slice(0, 4);
}; 