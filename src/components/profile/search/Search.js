// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import Categorynav from "../../../components/profile/categorynav/Categorynav.js";
// import Footer from "../../../components/profile/footer/Footer.js";
// import { searchBusinesses } from "./Service"; 

// const SearchDetails = () => {
//     const { searchText } = useParams();
//     const [categories, setCategories] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchSearchResults = async () => {
//             try {
//                 const response = await searchBusinesses(searchText);
//                 console.log("Fetched search results:", response);

//                 if (response && Array.isArray(response.data)) { 
//                     setCategories(response.data);
//                 } else if (response && response.data && Array.isArray(response.data.data)) { 
//                     setCategories(response.data.data);  
//                 } else {
//                     console.error("Invalid response structure:", response);
//                     setCategories([]); 
//                 }
//             } catch (error) {
//                 console.error("Error fetching search results:", error);
//                 setCategories([]); 
//             } finally {
//                 setLoading(false);
//             }
//         };


//         fetchSearchResults();
//     }, [searchText]);

//     return (
//         <>
//             <Categorynav />
//             <section className="main-block light-bg">
//                 <div className="container">
//                     <div className="row justify-content-center">
//                         <div className="col-md-5">
//                             <div className="styled-heading">
//                                 <h3>Search Results for "{searchText}"</h3>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="row">
//                         {loading ? (
//                             <p>Loading...</p>
//                         ) : categories.length === 0 ? (
//                             <p>No businesses found</p>
//                         ) : (
//                             categories.map((business) => (
//                                 <div key={business._id} className="col-md-4 featured-responsive">
//                                     <div className="featured-place-wrap">
//                                     <Link to={`/website/${business._id}`}>
//                                             <img 
//                                                 src={business.bs_img} 
//                                                 className="img-fluid"
//                                                 alt={business.bs_business_name} 
//                                                 style={{ height: "300px"}} 
//                                             />
//                                             <span className="featured-rating-orange">{business.total_reviews}</span>

//                                             <div className="featured-title-box">
//                                                 <h6>{business.bs_business_name}</h6>
//                                                 <p style={{ color: "#546075" }}>{business.bs_business_type}</p>
//                                                 <p style={{ color: "#546075" }}>Category: {business.category_name}</p>

//                                                 <ul>
//                                                     <li>
//                                                         <span className="icon-location-pin"></span>
//                                                         <p style={{ color: "#546075" }}>

//                                                             {business.bs_area}, {business.bs_city}, 
//                                                             {business.bs_state}
//                                                         </p>
//                                                     </li>
//                                                     <li>
//                                                         <span className="icon-screen-smartphone"></span>
//                                                         <p style={{ color: "#546075" }}>{business.bs_business_phone}</p>
//                                                     </li>
//                                                 </ul>
//                                             </div>
//                                             </Link>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </div>
//             </section>
//             <Footer />
//         </>
//     );
// };

// export default SearchDetails;



import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
} from '@mui/material';
import { motion } from 'framer-motion';

import caterersImg from '../../../assets/profile/images/Caterers.jpg';
import img1 from '../../../assets/profile/images/img5.jpg';
import img2 from '../../../assets/profile/images/img6.jpg';
import img3 from '../../../assets/profile/images/img4.jpg';
import img4 from '../../../assets/profile/images/img3.jpg';
import img5 from '../../../assets/profile/images/img2.jpg';

const cardData = [
    {
        name: 'Indian Flavours',
        image: img1,
        rating: 4.5,
        description: 'Experience the rich and diverse tastes of Indian cuisine.',
    },
    {
        name: 'Nightlife',
        image: img3,
        rating: 4.3,
        description: 'Vibrant pubs, clubs, and candlelight dinner experiences.',
    },
    {
        name: 'Street Food',
        image: img4,
        rating: 4.2,
        description: 'Delicious chaat, rolls, momos, and fast food options.',
    },
    {
        name: 'Desserts & Cafes',
        image: img5,
        rating: 4.7,
        description: 'Treat yourself with bakeries, ice cream, and waffles.',
    },
];

const CategoryDetails = () => {
    return (
        <Box>
            {/* Top Banner */}
            <Box
                sx={{
                    width: '100%',
                    height: 300,
                    backgroundImage: `url(${caterersImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    mb: 4,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        textAlign: 'center',
                        px: 4,
                        py: 2,
                    }}
                >
                    <Typography variant="h2" fontWeight="bold">IT'S ALL ABOUT FOOD</Typography>
                </Box>
            </Box>

            {/* Bootstrap Row for Cards */}
            <div className="styled-heading">
                <h3>Search Results for "hotels"</h3>
            </div>
            <div className="container pb-5">
                <div className="row g-4">
                    {cardData.map((card, index) => (
                        <div className="col-12 col-sm-6 col-md-3" key={index}>
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: 'spring', stiffness: 150 }}
                                style={{ height: '100%' }}
                            >
                                <Card
                                    elevation={5}
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        borderRadius: 4,
                                        transition: '0.3s ease',
                                        '&:hover': {
                                            boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                                        },
                                    }}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ type: 'spring', stiffness: 200 }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="150"
                                            image={card.image}
                                            alt={card.name}
                                            sx={{
                                                borderTopLeftRadius: 16,
                                                borderTopRightRadius: 16,
                                                cursor: 'pointer',
                                            }}
                                        />
                                    </motion.div>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" align="center" gutterBottom sx={{ cursor: 'pointer' }}>
                                            {card.name}
                                        </Typography>
                                        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 1 }}>
                                            ⭐ {card.rating} / 5
                                        </Typography>
                                        <Typography variant="body2" align="center" color="text.secondary">
                                            {card.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </Box>
    );
};

export default CategoryDetails;

