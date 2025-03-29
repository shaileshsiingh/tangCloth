// List of brand constants for use across the application
// export const BRANDS = { ... }

export const BRANDS_LIST = [
  {
    id: 'jimmy-choo',
    displayName: 'JIMMY CHOO',
    name: 'Jimmy Choo',
    logo: 'JC'
  },
  {
    id: 'gucci',
    displayName: 'GG',
    name: 'Gucci',
    logo: 'GG'
  },
  {
    id: 'roberto-cavalli',
    displayName: 'roberto cavalli',
    name: 'Roberto Cavalli',
    logo: 'roberto cavalli'
  },
  {
    id: 'polo-ralph-lauren',
    displayName: 'POLO RALPH LAUREN',
    name: 'Polo Ralph Lauren',
    logo: 'POLO'
  },
  {
    id: 'louis-vuitton',
    displayName: 'LOUIS VUITTON',
    name: 'Louis Vuitton',
    logo: 'LV'
  }
];

// Create BRANDS from BRANDS_LIST
export const BRANDS = BRANDS_LIST.reduce((acc, brand) => {
  acc[brand.id] = brand;
  return acc;
}, {});

// If you need BRANDS_LIST_REDUCED for backward compatibility
export const BRANDS_LIST_REDUCED = BRANDS; 