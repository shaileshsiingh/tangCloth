import React from 'react';
import Banner from '../components/Banner';
import FeaturedProducts from '../components/FeaturedProducts';
import CategoryBanner from '../components/CategoryBanner';
import BrandsSale from '../components/BrandsSale';
import PopularProducts from '../components/PopularProducts';
import VersatileClothing from '../components/VersatileClothing';
import Testimonials from '../components/Testimonials';
import FashionBlog from '../components/FashionBlog';
import Newsletter from '../components/Newsletter';
import HomePage from '../components/HomePage';
import LoadingScreen from '../components/LoadingScreen';
import Popup from '../components/Popup';

function Home() {
  return (
    <>
    <LoadingScreen/>
    
    <div>
      <Banner />
      <Popup/>
      <FeaturedProducts />
      <CategoryBanner />
      <BrandsSale />
      <PopularProducts />
      <VersatileClothing />
      <Testimonials />
      <FashionBlog/>
      <HomePage/>
      <Newsletter/>
    </div>
    </>
  );
}

export default Home; 



   