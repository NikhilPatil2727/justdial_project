import '../../assets/website/css/animate.css';
import '../../assets/website/lib/owlcarousel/assets/owl.carousel.min.css';
import '../../assets/website/css/bootstrap.min.css';
import '../../assets/website/css/style.css';

import Navbar from "../../components/website/navbar/Navbar";
import Slider from "../../components/website/slider/Slider";
import About from "../../components/website/about/About";
import Services from "../../components/website/services/Services";
import Labtest from "../../components/website/labtest/Labtest";
import Pricelist from "../../components/website/pricelist/Pricelist";
import Products from '../../components/website/products/Products';
import Healthpackage from '../../components/website/healthpackage/Healthpackage';
import Keyfeature from '../../components/website/keyfeature/Keyfeature';
import Photos from '../../components/website/photos/Photos';
import Videos from '../../components/website/videos/Videos';
import Reviews from '../../components/website/reviews/Reviews';
import Menus from'../../components/website/menus/Menus';
import BusinessContacts from '../../components/website/businesscontacts/Contacts';
import Footer from '../../components/website/footer/Footer';
import Amenity from '../../components/website/amenity/Amenity';
import Facilitys from '../../components/website/facilitys/Facilitys';
import Offers from '../../components/website/offers/Offer';





 
const Website=()=>{
    return(
        <>
        <Navbar />
        <Slider/>
        <About />
        <Services />
        <Labtest />
        <Pricelist />
        <Products/>
        <Healthpackage/>
        <Keyfeature/>
        <Photos/>
        <Videos/>
        <Amenity/>
        <Menus/>
        <Facilitys/>
        <Offers/>
        <Reviews/>
        <BusinessContacts/>
        <Footer/>
        
        </>
    )
}
export default Website;