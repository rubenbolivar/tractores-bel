import { Hero } from '../components/home/Hero';
import { Categories } from '../components/home/Categories';
import { FeaturedTractors } from '../components/home/FeaturedTractors';
import { WhyBEL } from '../components/home/WhyBEL';
import { PostVenta } from '../components/home/PostVenta';
import { Testimonials } from '../components/home/Testimonials';
import { CoverageMap } from '../components/home/CoverageMap';

export const Home = () => {
  return (
    <div className="pt-16">
      <Hero />
      <Categories />
      <FeaturedTractors />
      <WhyBEL />
      <PostVenta />
      <Testimonials />
      <CoverageMap />
    </div>
  );
};
