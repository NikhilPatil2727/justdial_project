
// import React from 'react';
// import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
// import { useLocation } from 'react-router-dom';
// import { motion } from 'framer-motion';

// // Image imports
// // import caterersImg from '../../../assets/profile/images/weddplanning.jpg';
// import Restaurants from '../../../assets/profile/images/img5.jpg';
// import hotels from '../../../assets/profile/images/hotelsss.jpg';
// import spa from '../../../assets/profile/images/spa1.jpg';
// import decor from '../../../assets/profile/images/homedecor.jpg';
// import weddplanning from '../../../assets/profile/images/weddplanning.jpg';
// import education from '../../../assets/profile/images/education.jpg';
// import rent from '../../../assets/profile/images/rent.jpg';
// import hospitals from '../../../assets/profile/images/hospitals.jpg';
// import contractors from '../../../assets/profile/images/contractors.jpg';
// import petshop from '../../../assets/profile/images/petshop.jpg';
// import pg from '../../../assets/profile/images/pg.jpg';
// import estate from '../../../assets/profile/images/estate.jpg';
// import driving from '../../../assets/profile/images/driving.jpg';
// import dentist from '../../../assets/profile/images/dentist.jpg';
// import gymsss from '../../../assets/profile/images/gymsss.jpg';
// import loan from '../../../assets/profile/images/loan.jpg';
// import movers from '../../../assets/profile/images/movers.jpg';




// const CategoryDetails = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const categoryName = queryParams.get('name');

//   // Set defaults
//   let title = 'Explore Services';
//   let image = weddplanning;

//   // Switch-based logic
//   switch (categoryName) {
//     case 'Restaurants':
//       title = 'Explore the Best Restaurants';
//       image = Restaurants;
//       break;
//     case 'Hotels':
//       title = 'Find Your Perfect Stay';
//       image = hotels;
//       break;
//     case 'BeautySpa':
//       title = 'Relax at a Beauty Spa';
//       image = spa;
//       break;
//     case 'HomeDecor':
//       title = 'Beautify Your Home';
//       image = decor;
//       break;
//     case 'WeddingPlanning':
//       title = 'Plan Your Dream Wedding';
//       image = weddplanning;
//       break;
//     case 'Education':
//       title = 'Learn and Grow with the Best Institutes';
//       image = education;
//       break;
//     case 'RentHire':
//       title = 'Rent or Hire Services Easily';
//       image = rent;
//       break;
//     case 'Hospitals':
//       title = 'Reliable Healthcare & Hospitals';
//       image = hospitals;
//       break;
//     case 'Contractors':
//       title = 'Professional Contractors for Your Needs';
//       image = contractors;
//       break;
//     case 'PetShops':
//       title = 'All You Need for Your Pets';
//       image = petshop;
//       break;
//     case 'PGHostels':
//       title = 'Find Affordable PGs & Hostels';
//       image = pg;
//       break;
//     case 'EstateAgent':
//       title = 'Trusted Estate Agents';
//       image = estate;
//       break;
//     case 'Dentists':
//       title = 'Expert Dental Care Services';
//       image = dentist;
//       break;
//     case 'Gym':
//       title = 'Stay Fit with the Best Gyms';
//       image = gymsss;
//       break;
//     case 'Loans':
//       title = 'Get the Best Loan Deals';
//       image = loan;
//       break;
//     case 'EventOrganisers':
//       title = 'Make Events Memorable';
//       image = weddplanning;
//       break;
//     case 'DrivingSchools':
//       title = 'Learn to Drive Safely';
//       image = driving;
//       break;
//     case 'PackersMovers':
//       title = 'Smooth Packing & Moving Services';
//       image = movers;
//       break;
//     default:
//       title = 'Explore Services';
//       image = weddplanning;
//       break;
//   }

//   // Sample card data (you can make this dynamic per category if needed)
//   const cardData = [
//     {
//       name: 'Vendor A',
//       image: weddplanning,
//       rating: 4.5,
//       description: 'Top-rated service provider in this category.',
//     },
//     {
//       name: 'Vendor B',
//       image: gymsss,
//       rating: 4.2,
//       description: 'Affordable and reliable option for your needs.',
//     },
//     {
//       name: 'Vendor C',
//       image: estate,
//       rating: 4.8,
//       description: 'Highly recommended by customers.',
//     },
//     {
//       name: 'Vendor D',
//       image: decor,
//       rating: 4.0,
//       description: 'Popular choice with excellent support.',
//     },
//   ];

//   return (
//     <Box>
//       {/* Top Banner */}
//       <Box
//         sx={{
//           width: '100%',
//           height: 300,
//           backgroundImage: `url(${image})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           position: 'relative',
//           mb: 4,
//         }}
//       >
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             color: 'white',
//             textAlign: 'center',
//             px: 4,
//             py: 2,
//           }}
//         >
//           <Typography variant="h2" fontWeight="bold">
//             {title}
//           </Typography>
//         </Box>
//       </Box>

//       {/* Vendor Cards */}
//       <div className="container pb-5">
//         <div className="row g-4">
//           {cardData.map((card, index) => (
//             <div className="col-12 col-sm-6 col-md-3" key={index}>
//               <motion.div
//                 whileHover={{ scale: 1.03 }}
//                 transition={{ type: 'spring', stiffness: 150 }}
//                 style={{ height: '100%' }}
//               >
//                 <Card
//                   elevation={5}
//                   sx={{
//                     height: '100%',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     borderRadius: 4,
//                     transition: '0.3s ease',
//                     '&:hover': {
//                       boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
//                     },
//                   }}
//                 >
//                   <motion.div
//                     whileHover={{ scale: 1.1 }}
//                     transition={{ type: 'spring', stiffness: 200 }}
//                   >
//                     <CardMedia
//                       component="img"
//                       height="150"
//                       image={card.image}
//                       alt={card.name}
//                       sx={{
//                         borderTopLeftRadius: 16,
//                         borderTopRightRadius: 16,
//                         cursor: 'pointer',
//                       }}
//                     />
//                   </motion.div>
//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Typography variant="h6" align="center" gutterBottom sx={{ cursor: 'pointer' }}>
//                       {card.name}
//                     </Typography>
//                     <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 1 }}>
//                       ⭐ {card.rating} / 5
//                     </Typography>
//                     <Typography variant="body2" align="center" color="text.secondary">
//                       {card.description}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Box>
//   );
// };

// export default CategoryDetails;



import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchAllCategorydetails } from './Service';

// Static mapping for banner images & titles
import RestaurantsImg from '../../../assets/profile/images/img5.jpg';
import HotelsImg from '../../../assets/profile/images/hotelsss.jpg';
import SpaImg from '../../../assets/profile/images/spa1.jpg';
import DecorImg from '../../../assets/profile/images/homedecor.jpg';
import WeddingImg from '../../../assets/profile/images/weddplanning.jpg';
import EducationImg from '../../../assets/profile/images/education.jpg';
import RentImg from '../../../assets/profile/images/rent.jpg';
import HospitalsImg from '../../../assets/profile/images/hospitals.jpg';
import ContractorsImg from '../../../assets/profile/images/contractors.jpg';
import PetshopImg from '../../../assets/profile/images/petshop.jpg';
import PgImg from '../../../assets/profile/images/pg.jpg';
import EstateImg from '../../../assets/profile/images/estate.jpg';
import DrivingImg from '../../../assets/profile/images/driving.jpg';
import DentistImg from '../../../assets/profile/images/dentist.jpg';
import GymImg from '../../../assets/profile/images/gymsss.jpg';
import LoanImg from '../../../assets/profile/images/loan.jpg';
import MoversImg from '../../../assets/profile/images/movers.jpg';

const bannerMap = {
  Restaurants:    { title: 'Explore the Best Restaurants',          image: RestaurantsImg },
  Hotels:         { title: 'Find Your Perfect Stay',                image: HotelsImg },
  BeautySpa:      { title: 'Relax at a Beauty Spa',                image: SpaImg },
  HomeDecor:      { title: 'Beautify Your Home',                   image: DecorImg },
  WeddingPlanning:{ title: 'Plan Your Dream Wedding',               image: WeddingImg },
  Education:      { title: 'Learn and Grow with the Best Institutes', image: EducationImg },
  RentHire:       { title: 'Rent or Hire Services Easily',          image: RentImg },
  Hospitals:      { title: 'Reliable Healthcare & Hospitals',       image: HospitalsImg },
  Contractors:    { title: 'Professional Contractors for Your Needs', image: ContractorsImg },
  PetShops:       { title: 'All You Need for Your Pets',            image: PetshopImg },
  PGHostels:      { title: 'Find Affordable PGs & Hostels',         image: PgImg },
  EstateAgent:    { title: 'Trusted Estate Agents',                 image: EstateImg },
  Dentists:       { title: 'Expert Dental Care Services',           image: DentistImg },
  Gym:            { title: 'Stay Fit with the Best Gyms',           image: GymImg },
  Loans:          { title: 'Get the Best Loan Deals',               image: LoanImg },
  EventOrganisers:{ title: 'Make Events Memorable',                 image: WeddingImg },
  DrivingSchools: { title: 'Learn to Drive Safely',                 image: DrivingImg },
  PackersMovers:  { title: 'Smooth Packing & Moving Services',      image: MoversImg },
};

const CategoryDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryName = queryParams.get('name') || '';

  const { title, image: bannerImage } = bannerMap[categoryName] || {
    title: 'Explore Services',
    image: WeddingImg,
  };

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchAllCategorydetails(categoryName)
      .then(res => {
        // assuming res.data.data is your array of businesses
        setVendors(res.data.data || []);
      })
      .catch(err => console.error('Error fetching category details:', err))
      .finally(() => setLoading(false));
  }, [categoryName]);

  return (
    <Box>
      {/* Top Banner */}
      <Box
        sx={{
          width: '100%',
          height: 300,
          backgroundImage: `url(${bannerImage})`,
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
          <Typography variant="h2" fontWeight="bold">
            {title}
          </Typography>
        </Box>
      </Box>

      {/* Vendor Cards */}
      <Box className="container pb-5">
        {loading ? (
          <Box display="flex" justifyContent="center" py={5}>
            <CircularProgress />
          </Box>
        ) : vendors.length === 0 ? (
          <Typography align="center" color="text.secondary">
            No businesses found in this category.
          </Typography>
        ) : (
          <Box className="row g-4">
            {vendors.map((business) => (
              <Box key={business._id} className="col-12 col-sm-6 col-md-3">
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
                      '&:hover': { boxShadow: '0 8px 30px rgba(0,0,0,0.2)' },
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <CardMedia
                        component="img"
                        height="150"
                        image={business.bs_img}
                        alt={business.bs_business_name}
                        sx={{ borderTopLeftRadius: 16, borderTopRightRadius: 16, cursor: 'pointer' }}
                      />
                    </motion.div>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" align="center" gutterBottom sx={{ cursor: 'pointer' }}>
                        {business.bs_business_name}
                      </Typography>
                      <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 1 }}>
                        ⭐ {business.total_reviews} Reviews
                      </Typography>
                      {/* You can show more business fields here, e.g. type, area/city */}
                      <Typography variant="body2" align="center" color="text.secondary" noWrap>
                        {business.bs_area}, {business.bs_city}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CategoryDetails;
