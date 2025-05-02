// import './App.css';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import React, { Suspense } from 'react';

// const Home = React.lazy(() => import('./screens/home/Home'));
// const Website = React.lazy(() => import('./screens/website/Website'));

// function App() {
//   const location = useLocation(); 

//   if (location.pathname === '/website') {
//     return (
//       <Suspense fallback={<div></div>}>
//         <Website />
//       </Suspense>
//     );
//   }

//   return (
//     <Suspense fallback={<div></div>}>
//       <Home />
//     </Suspense>
//   );
// }

// function AppWrapper() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="*" element={<App />} />
//       </Routes>
//     </Router>
//   );
// }

// export default AppWrapper;


import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { Suspense } from 'react';
import AdvertiseScreen from './screens/advertise/Advertise';
import MapScreen from './screens/map/Map';
import VideoScreen from './screens/videos/Video';
import TimingScreen from './screens/timings/Timings';
import UploadcategoryScreen from './screens/uploadcategory/Uploadcategory';
import AddofferScreen from './screens/addoffer/Addoffer';
import OfferScreen from './screens/offers/Offers';
import ReviewScreen from './screens/reviews/Reviews';
import SociallinksScreen from './screens/sociallinks/Sociallinks';
import AmenityScreen from './screens/amenity/Amenity';
import FacilitieScreen from './screens/facilities/Facilities';
import BizcardScreen from './screens/share_biz_card/Share_biz_card';
import ServiceScreen from './screens/services/Services';
import ProductScreen from './screens/products/Products';
import LabtestScreen from './screens/labtest/Labtest';
import SigninScreen from './screens/signin/Signin';
import SignupScreen from './screens/signup/Signup';
import CategorydetailsScreen from './screens/categorydetails/Categorydetails';
import BussRegistartionScreen from './screens/businessregistration/Businessregistration';
import BusinessLoginScreen from './screens/businesslogin/BusinessLogin';
import HealthPackageScreen from './screens/healthpackage/Healthpackage';
import MenuScreen from './screens/menu/Menu';
import KeyfeatureScreen from './screens/keyfeatures/Keyfeatures';
import SearchScreen from './screens/search/Search';
import BusinessOtpScreen from './screens/businessotp/businessOtp';
import UsercontactsScreen from'./screens/usercontacts/Usercontacts'


// Lazy load the components
const Home = React.lazy(() => import('./screens/home/Home'));
const Website = React.lazy(() => import('./screens/website/Website'));
const Profile = React.lazy(() => import('./screens/profile/Profile'));
const Photos = React.lazy(() => import('./screens/photos/Photos'));
const ContactScreen = React.lazy(() => import('./screens/businesscontacts/BusinessContact'));
const ViewprofileScreen = React.lazy(() => import('./screens/viewprofile/viewprofile'));
const WebsiteScreen = React.lazy(() => import('./screens/homewebsite/Homewebsite'));
const OtpScreen = React.lazy(() => import('./screens/otp/Otp'));
const LoginScreen = React.lazy(() => import('./screens/login/Login'));
const RegistrationScreen = React.lazy(() => import('./screens/registration/Registration'));
const ViewUserProfileScreen = React.lazy(() => import('./screens/viewuserprofile/ViewUserProfile'));

function App() {
  const location = useLocation(); 
if (/^\/website\/[a-fA-F0-9]{24}$/.test(location.pathname)) {
  
    return (
      <Suspense fallback={<div></div>}>
        <Website />
      </Suspense>
    );
  }else if (location.pathname === '/otp') {
    return (
      <Suspense fallback={<div></div>}>
        <OtpScreen />
      </Suspense>
    );
  }else if (location.pathname === '/login') {
    return (
      <Suspense fallback={<div></div>}>
        <LoginScreen />
      </Suspense>
    );
  }else if (location.pathname === '/viewprofile') {
    return (
      <Suspense fallback={<div></div>}>
        <ViewprofileScreen />
      </Suspense>
    );
  } else if (location.pathname === '/profile') {
    return (
      <Suspense fallback={<div></div>}>
        <Profile />
      </Suspense>
    );
  } else if (location.pathname === '/photos') {
    return (
      <Suspense fallback={<div></div>}>
        <Photos />
      </Suspense>
    );  
  }else if (location.pathname === '/viewprofile') {
    return (
      <Suspense fallback={<div></div>}>
        <ViewprofileScreen />
      </Suspense>
    );
  } else if (location.pathname === '/businesscontacts') {
    return (
      <Suspense fallback={<div></div>}>
        <ContactScreen />
      </Suspense>
    );
  } else if (location.pathname === '/advertise') {
    return (
      <Suspense fallback={<div></div>}>
        <AdvertiseScreen />
      </Suspense>
    );
  } else if (location.pathname === '/map') {
    return (
      <Suspense fallback={<div></div>}>
        <MapScreen />
      </Suspense>
    );
  }else if (location.pathname === '/videos') {
      return (
        <Suspense fallback={<div></div>}>
          <VideoScreen />
        </Suspense>
      );
    }
    else if (location.pathname === '/usercontacts') {
      return (
        <Suspense fallback={<div></div>}>
          <UsercontactsScreen />
        </Suspense>
      );
    }else if (location.pathname === '/Timings') {
      return (
        <Suspense fallback={<div></div>}>
          <TimingScreen />
        </Suspense>
      );
    }else if (location.pathname === '/Uploadcategory') {
      return (
        <Suspense fallback={<div></div>}>
          <UploadcategoryScreen />
        </Suspense>
      );
    }else if (location.pathname === '/Addoffer') {
      return (
        <Suspense fallback={<div></div>}>
          <AddofferScreen />
        </Suspense>
      );
    }else if (location.pathname === '/Offers') {
      return (
        <Suspense fallback={<div></div>}>
          <OfferScreen />
        </Suspense>
      );
    }else if (location.pathname === '/addoffer') {
      return (
        <Suspense fallback={<div></div>}>
          <AddofferScreen />
        </Suspense>
      );
    }else if (location.pathname === '/Review') {
      return (
        <Suspense fallback={<div></div>}>
          <ReviewScreen />
        </Suspense>
      );
    }else if (location.pathname === '/Website') {
      return (
        <Suspense fallback={<div></div>}>
          <WebsiteScreen />
        </Suspense>
      );
    }else if (location.pathname === '/Sociallink') {
      return (
        <Suspense fallback={<div></div>}>
          <SociallinksScreen />
        </Suspense>
      );
    }else if (location.pathname === '/Amenity') {
      return (
        <Suspense fallback={<div></div>}>
          <AmenityScreen />
        </Suspense>
      );
    }else if (location.pathname === '/Facilitys') {
      return (
        <Suspense fallback={<div></div>}>
          <FacilitieScreen />
        </Suspense>
      );
    }else if (location.pathname === '/Product') {
      return (
        <Suspense fallback={<div></div>}>
          <ProductScreen />
        </Suspense>
      );
    }else if (location.pathname === '/Share_biz_card') {
      return (
        <Suspense fallback={<div></div>}>
          <BizcardScreen />
        </Suspense>
      );
    }else if (location.pathname === '/Services') {
      return (
        <Suspense fallback={<div></div>}>
          <ServiceScreen />
        </Suspense>
      );
    }else if (location.pathname === '/Labtest') {
      return (
        <Suspense fallback={<div></div>}>
          <LabtestScreen />
        </Suspense>
      );
    }else if (location.pathname === '/Signup') {
      return (
        <Suspense fallback={<div></div>}>
          <SignupScreen />
        </Suspense>
      );
    }else if (location.pathname === '/Signin') {
      return (
        <Suspense fallback={<div></div>}>
          <SigninScreen />
        </Suspense>
      );
    }else if (location.pathname === '/categorydetails') {
      return (
        <Suspense fallback={<div></div>}>
          <CategorydetailsScreen />
        </Suspense>
      );
    }else if (location.pathname === '/search') {
      return (
        <Suspense fallback={<div></div>}>
          <SearchScreen/>
        </Suspense>
      );
    }else if (location.pathname === '/Businessregistration') {
      return (
        <Suspense fallback={<div></div>}>
          <BussRegistartionScreen />
        </Suspense>
      );
    }else if (location.pathname === '/BusinessLogin') {
      return (
        <Suspense fallback={<div></div>}>
          <BusinessLoginScreen />
        </Suspense>
      );
    }else if (location.pathname === '/Healthpackage') {
        return (
          <Suspense fallback={<div></div>}>
            <HealthPackageScreen />
          </Suspense>
        );
      }else if (location.pathname === '/Menu') {
        return (
          <Suspense fallback={<div></div>}>
            <MenuScreen />
          </Suspense>
        );
      }else if (location.pathname === '/Keyfeatures') {
        return (
          <Suspense fallback={<div></div>}>
            <KeyfeatureScreen />
          </Suspense>
        );
      }else if (location.pathname === '/businessOtp') {
        return (
          <Suspense fallback={<div></div>}>
            <BusinessOtpScreen />
          </Suspense>
        );
    }else {
  
    return (
      <Suspense fallback={<div></div>}>
        <Home />
      </Suspense>
    );
  }
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<App />} />
        
        <Route path="/website/:bs_id" element={<Website />} />
        <Route path="/viewprofile/:bs_id" element={<ViewprofileScreen />} />
        <Route path="/categorydetails/:id" element={<CategorydetailsScreen />} />
        <Route path="/search/:searchText" element={<SearchScreen />} />
        <Route path="/registration" element={<RegistrationScreen />} />   
        <Route path="/viewuserprofile/:userId" element={<ViewUserProfileScreen />} /> 
        <Route path="/otp" element={<OtpScreen />} />   
        <Route path="/login" element={<LoginScreen />} /> 
                    
      </Routes>
    </Router>
  );
}

export default AppWrapper;