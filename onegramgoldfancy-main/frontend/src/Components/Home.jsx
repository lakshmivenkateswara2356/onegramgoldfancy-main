import Banner from '../Pages/banner';
import FeaturedProducts from '../Pages/FeaturedProducts';
import Quicku from '../Pages/QuickAccessCards';
import ProductCard from '../Pages/ProductCard';
import Footer from "./Footer";
import Navbar from './Navbar';
import Footernavigations from '../Footernavigations';
import MiniProductCards from '../Pages/MiniProductCards';


const Home = () => {
    return (
        <div>
             < Navbar/>
            <Banner/>
            <Quicku/>
          
            <MiniProductCards/>
            
            <FeaturedProducts/>
            <ProductCard/>
            <Footernavigations/>
            <Footer/>
        </div>
    )
}

export default Home;