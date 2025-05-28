import Navbar from '../components/common/Navbar';
import HeroSection from '../components/Home/HeroSection';
import Testimonials from '../components/Home/Testimonial'
import Footer from '../components/common/Footer';
import ITServicesSection from '../components/Home/ITServicesSection';
import DEIServicesSection from '../components/Home/DEIServicesSection';
import Features from '../components/Home/Features';
import Team from '../components/Home/Team';
import Details from '../components/Home/Details';
import Product from '../components/Home/Product';
import DEI from '../components/Home/DEI';
// import Blog from '../components/Home/Blog';
import SecHeroSection from '../components/Home/SecHeroSection';

const Home = () => {
    return (
        <>
            <Navbar />
            <HeroSection />
            <SecHeroSection />
            <ITServicesSection />
            <DEI />
            <DEIServicesSection />
            <Features />
            <Details /> 
            <Product />
            <Team />
            <Testimonials />    
            {/* <Blog /> */}
            <Footer />
        </>
    );
};

export default Home;
