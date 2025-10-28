import HeroSection from "./components/home/Hero";
import FeaturedProducts from "./components/home/productf/FeaturedProducts";
import Testimonials from "./components/home/testimony/Review";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts/>
      <Testimonials/>
    </div>
  );
}
