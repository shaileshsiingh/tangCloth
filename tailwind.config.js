/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'dm-sans': ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        'premium-gold': '#d4af37',
        'premium-beige': '#f5f0e5',
        'premium-dark': '#1c1c1c',
        'premium-cream': '#f8f5f0',
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(to right, #f8f5f0, #f5f0e5)',
        'premium-subtle': 'linear-gradient(135deg, #ffffff 0%, #f8f5f0 100%)',
        'premium-gold-gradient': 'linear-gradient(to right, #d4af37, #f5e5a3)',
      }
    },
  },
  plugins: [],
}
