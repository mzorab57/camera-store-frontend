import React from 'react';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import LatestProducts from '../components/LatestProducts';
import VideoGraphySection from '../components/VideoGraphySection';
import PhotoGraphySection from '../components/PhotoGraphySection';
import Brands from '../components/Brands';

function Home() {
  return (
    <div>
      <Hero />
      <CategorySection />
      <LatestProducts />
      <VideoGraphySection />
      <PhotoGraphySection />
      <Brands />
    </div>
  );
}

export default Home;