import React from 'react';
    import Navbar from './Navbar';
    import Hero from './Hero';
    import FeaturedProducts from './FeaturedProducts';
    import CategoryBanner from './CategoryBanner';
    import BrandsSale from './BrandsSale';
    import PopularProducts from './PopularProducts';
    import VersatileClothing from './VersatileClothing';
    import Testimonials from './Testimonials';
    import FashionBlog from './FashionBlog';
    import Newsletter from './Newsletter';
    import Footer from './Footer';

    function Home() {
      return (
        <div className="min-h-screen bg-white">
          <Navbar />
          <Hero />
          <FeaturedProducts />
          <CategoryBanner />
          <BrandsSale />
          <PopularProducts />
          <VersatileClothing />
          <Testimonials />
          <FashionBlog />
          <Newsletter />
          <Footer />
        </div>
      );
    }

    export default Home;
