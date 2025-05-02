import React from "react";
import '../../assets/profile/css/bootstrap.min.css';
import '../../assets/profile/css/simple-line-icons.css';
import '../../assets/profile/css/themify-icons.css';
import "../../assets/profile/css/style.css"; 
import "../../assets/profile/css/set1.css";


import Nav from "../../components/profile/nav/Nav.js";
import Maincategory from "../../components/profile/maincategory/Maincategory.js";
import Topbusiness from "../../components/profile/topbusiness/Topbusiness.js";
import Topcategory from "../../components/profile/topcategory/Topcategory.js";
import Nearbybusiness from "../../components/profile/nearbybusiness/Nearbybusiness.js";
import Recentbusiness from "../../components/profile/recentbusiness/Recentbusiness.js";
import Footer from "../../components/profile/footer/Footer.js";






const Home = () => {
  return (
    <>
      <Nav />
      <Maincategory />
      {/* <Nearbybusiness /> */}
      <Topbusiness />
      <Topcategory />
      
      {/* <Recentbusiness /> */}
      <Footer />
    </>
  );
};

export default Home;
