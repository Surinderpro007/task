import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProductsSection from '../components/ProductsSection';
import NewsletterBanner from '../components/NewsletterBanner';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';

// The page only assembles the sections. All logic lives inside each section.
export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProductsSection />
        <NewsletterBanner />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}