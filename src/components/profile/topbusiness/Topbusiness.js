// // import React from "react";
// // import "./Topbusiness.css";
// // import { useNavigate } from "react-router-dom";

// // const categories = [
// //   { name: "Restaurants", icon: "🍽️", path: "/categorydetails?name=Restaurants" },
// //   { name: "Hotels", icon: "🏨", path: "/categorydetails?name=Hotels" },
// //   { name: "Beauty Spa", icon: "💇", path: "/categorydetails?name=BeautySpa" },
// //   { name: "Home Decor", icon: "🛋️", path: "/categorydetails?name=HomeDecor" },
// //   { name: "Wedding Planning", icon: "👰", path: "/categorydetails?name=WeddingPlanning", highlight: true },
// //   { name: "Education", icon: "🎓", path: "/categorydetails?name=Education" },
// //   { name: "Rent & Hire", icon: "🔑", path: "/categorydetails?name=RentHire" },
// //   { name: "Hospitals", icon: "🏥", path: "/categorydetails?name=Hospitals" },
// //   { name: "Contractors", icon: "👷", path: "/categorydetails?name=Contractors" },
// //   { name: "Pet Shops", icon: "🐾", path: "/categorydetails?name=PetShops" },
// //   { name: "PG/Hostels", icon: "🛏️", path: "/categorydetails?name=PGHostels" },
// //   { name: "Estate Agent", icon: "🏘️", path: "/categorydetails?name=EstateAgent" },
// //   { name: "Dentists", icon: "🦷", path: "/categorydetails?name=Dentists" },
// //   { name: "Gym", icon: "🏋️", path: "/categorydetails?name=Gym" },
// //   { name: "Loans", icon: "💰", path: "/categorydetails?name=Loans" },
// //   { name: "Event Organisers", icon: "🎉", path: "/categorydetails?name=EventOrganisers" },
// //   { name: "Driving Schools", icon: "🚗", path: "/categorydetails?name=DrivingSchools" },
// //   { name: "Packers & Movers", icon: "📦", path: "/categorydetails?name=PackersMovers" },
// // ];


// // const Topbusiness = () => {
// //   const navigate = useNavigate();

// //   const handleClick = (cat) => {
// //     if (cat.path) {
// //       navigate(cat.path);
// //     }
// //   };

// //   return (
// //     <div className="container py-4">
// //       <div className="row g-3">
// //         {categories.map((cat, index) => (
// //           <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2">
// //             <div
// //               className={`category-item ${cat.highlight ? "highlight" : ""}`}
// //               onClick={() => handleClick(cat)}
// //             >
// //               <div className="category-icon">{cat.icon}</div>
// //               <div className="category-name">{cat.name}</div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Topbusiness;




// import React, { useEffect, useState } from "react";
// import "./Topbusiness.css";
// import { useNavigate } from "react-router-dom";
// import { fetchCategories } from "./Service"; // new service

// const Topbusiness = () => {
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getCategories = async () => {
//       const response = await fetchCategories();
//       if (response?.success) {
//         setCategories(response.data);
//       }
//     };
//     getCategories();
//   }, []);

//   const handleClick = (cat) => {
//     if (cat.category_name) {
//       navigate(`/categorydetails?name=${encodeURIComponent(cat.category_name)}`);
//     }
//   };

//   return (
//     <div className="container py-4">
//       <div className="row g-3">
//         {categories.map((cat, index) => (
//           <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2">
//             <div className="category-item" onClick={() => handleClick(cat)}>
//               <div className="category-icon">{cat.icon || "📁"}</div>
//               <div className="category-name">{cat.category_name}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Topbusiness;



import React, { useEffect, useState } from "react";
import "./Topbusiness.css";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "./Service"; // Make sure this is correctly implemented

const Topbusiness = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchCategories();
        console.log("Fetched categories:", response); // For debugging

        if (response?.success && Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error("Invalid categories data:", response);
          setCategories([]); // fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]); // fallback to empty array
      }
    };

    getCategories();
  }, []);

  const handleClick = (cat) => {
    if (cat.category_name) {
      navigate(`/categorydetails?name=${encodeURIComponent(cat.category_name)}`);
    }
  };

  return (
    <div className="container py-4">
      <div className="row g-3">
        {categories.map((cat, index) => (
          <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2">
            <div className="category-item" onClick={() => handleClick(cat)}>
              <div className="category-icon">{cat.icon || "📁"}</div>
              <div className="category-name">{cat.category_name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topbusiness;

