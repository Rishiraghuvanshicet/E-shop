import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import AnimationSuggestion from "../sections/animationSection/AnimationSuggestion";
import HeroSection from "../sections/heroSection/HeroSection";
import ProductShowcase from "../sections/ProductShowcase/ProductShowcase";
import SuggestProduct from "../sections/suggestions/SuggestProduct";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <HeroSection />
      <SuggestProduct />
      <AnimationSuggestion />
      <ProductShowcase />
      <Footer />
    </>
  );
};

export default HomePage;
