export interface Product {
  id: string;
  name: string;
  price: {
    min: number;
    max: number;
  };
  images: string[];
  sizes: string[];
  description: string;
  additionalInfo: string;
  reviews: {
    count: number;
    rating: number;
  };
  shippingInfo: string;
}

export const products: Product[] = [
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
    sizes: ['L', 'M'],
    description: 'Experience pure comfort and style with our signature combo dress.',
    additionalInfo: 'Material: 100% Cotton\nCare Instructions: Machine wash cold',
    reviews: {
      count: 1,
      rating: 5
    },
    shippingInfo: 'Free shipping on orders over $50.'
  },
  {
    id: '2',
    name: 'French Coat',
    price: {
      min: 55,
      max: 60
    },
    images: [
      '/french-coat-1.jpg',
      '/french-coat-2.jpg'
    ],
    sizes: ['S', 'M', 'L'],
    description: 'Elegant French-style coat perfect for any formal occasion.',
    additionalInfo: 'Material: Wool blend\nDry clean only\nModel is wearing size M',
    reviews: {
      count: 2,
      rating: 4
    },
    shippingInfo: 'Free shipping on orders over $50. Delivery within 3-5 business days.'
  },
  {
    id: '3',
    name: 'Stylish Winter Coat',
    price: {
      min: 65,
      max: 70
    },
    images: [
      '/winter-coat-1.jpg',
      '/winter-coat-2.jpg'
    ],
    sizes: ['S', 'M', 'L'],
    description: 'Stay warm and stylish with our premium winter coat.',
    additionalInfo: 'Material: Premium wool blend\nDry clean only\nModel is wearing size M',
    reviews: {
      count: 3,
      rating: 5
    },
    shippingInfo: 'Free shipping on orders over $50. Delivery within 3-5 business days.'
  },
  {
    id: '4',
    name: 'Leather Handbag',
    price: {
      min: 49,
      max: 49
    },
    images: [
      '/leather-handbag.jpg',
      '/leather-handbag-2.jpg'
    ],
    sizes: ['One Size'],
    description: 'A stylish and durable leather handbag.',
    additionalInfo: 'Material: Genuine Leather\nCare Instructions: Wipe clean with damp cloth',
    reviews: {
      count: 1,
      rating: 4
    },
    shippingInfo: 'Free shipping on orders over $50.'
  },
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
    sizes: ['L', 'M'],
    description: 'Experience pure comfort and style with our signature combo dress.',
    additionalInfo: 'Material: 100% Cotton\nCare Instructions: Machine wash cold',
    reviews: {
      count: 1,
      rating: 5
    },
    shippingInfo: 'Free shipping on orders over $50.'
  },
  {
    id: '2',
    name: 'French Coat',
    price: {
      min: 55,
      max: 60
    },
    images: [
      '/french-coat-1.jpg',
      '/french-coat-2.jpg'
    ],
    sizes: ['S', 'M', 'L'],
    description: 'Elegant French-style coat perfect for any formal occasion.',
    additionalInfo: 'Material: Wool blend\nDry clean only\nModel is wearing size M',
    reviews: {
      count: 2,
      rating: 4
    },
    shippingInfo: 'Free shipping on orders over $50. Delivery within 3-5 business days.'
  },
  {
    id: '3',
    name: 'Stylish Winter Coat',
    price: {
      min: 65,
      max: 70
    },
    images: [
      '/winter-coat-1.jpg',
      '/winter-coat-2.jpg'
    ],
    sizes: ['S', 'M', 'L'],
    description: 'Stay warm and stylish with our premium winter coat.',
    additionalInfo: 'Material: Premium wool blend\nDry clean only\nModel is wearing size M',
    reviews: {
      count: 3,
      rating: 5
    },
    shippingInfo: 'Free shipping on orders over $50. Delivery within 3-5 business days.'
  },
  {
    id: '4',
    name: 'Leather Handbag',
    price: {
      min: 49,
      max: 49
    },
    images: [
      '/leather-handbag.jpg',
      '/leather-handbag-2.jpg'
    ],
    sizes: ['One Size'],
    description: 'A stylish and durable leather handbag.',
    additionalInfo: 'Material: Genuine Leather\nCare Instructions: Wipe clean with damp cloth',
    reviews: {
      count: 1,
      rating: 4
    },
    shippingInfo: 'Free shipping on orders over $50.'
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
}; 