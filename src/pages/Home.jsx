import React from 'react';
import Banner from '../components/Banner';
import FeaturedProducts from '../components/FeaturedProducts';
import CategoryBanner from '../components/CategoryBanner';
import BrandsSale from '../components/BrandsSale';
import PopularProducts from '../components/PopularProducts';
import VersatileClothing from '../components/VersatileClothing';
import Testimonials from '../components/Testimonials';
import FashionBlog from '../components/FashionBlog';

function Home() {
  return (
    <div>
      <Banner />
      <FeaturedProducts />
      <CategoryBanner />
      <BrandsSale />
      <PopularProducts />
      <VersatileClothing />
      <Testimonials />
      <FashionBlog/>
    </div>
  );
}

export default Home; 