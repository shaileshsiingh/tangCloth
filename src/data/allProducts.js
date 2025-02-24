import { products as jsProducts } from './products.js'; // Import from products.js
import { products as tsProducts } from './products.ts'; // Import from products.ts

// Combine both products into a single array
export const allProducts = [...jsProducts, ...tsProducts]; 