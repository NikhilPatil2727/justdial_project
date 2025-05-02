// import React from "react";
// import "./Maincategory.css";
// import "../../../assets/website/css/bootstrap.min.css";

// const categories = [
//   {
//     title: "Restaurants",
//     subtitle: ["Discover Tastes from Every Corner","Book Your Home Away from Home"],
//     btnText: "Explore",
//     type: "blue",
//     // image: require("../../../assets/profile/images/job.jpg"), // example image
//   },
//   {
//     title: "Hotels",
//     subtitle: ["Book Your Home Away from Home", "Your Guide to the Best Stays Around"],
//     btnText: "Explore",
//     type: "blue",
//     // image: require("../../../assets/profile/images/job.jpg"),
//   },
//   {
//     title: "Repairs & Services",
//     subtitle: ["Quick Fixes, Quality Service","Reliable Repairs, Anytime You Need"],
//     btnText: "Explore",
//     type: "service",
//     // image: require("../../../assets/profile/images/repairs.jpg"),
//   },
//   {
//     title: "Real Estate",
//     subtitle:["Find Your Perfect Space","Your Property, Your Future"],
//     btnText: "Explore",
//     type: "realestate",
//     // image: require("../../../assets/profile/images/bike1.jpg"),
//   },
//   {
//     title: "Art & Culture",
//     subtitle: ["Where Creativity Meets Heritage","Experience the Soul of the City"],
//     btnText: "Explore",
//     type: "realestate",
//     // image: require("../../../assets/profile/images/realestate.jpg"),
//   },
// ];

// const Maincategory = () => {
//   return (
//     <div className="maincategory-section container">
//       <div className="row justify-content-center">
//         {categories.map((cat, index) => (
//           <div
//             className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 d-flex justify-content-center mb-4"
//             key={index}
//           >
//             <div className={`category-card ${cat.type}`}>
//               <div className="card-content">
//                 {cat.image && (
//                   <img
//                     src={cat.image}
//                     alt={cat.title}
//                     className="category-image"
//                   />
//                 )}
//                 <h5 className="card-title">{cat.title}</h5>
//                 <p className="card-subtitle">{cat.subtitle}</p>
//                 <button className="btn primary-btn">{cat.btnText}</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Maincategory;




import React, { useEffect, useState } from "react";
import { fetchMaincategory } from "./Service";
import { WEB_API } from "../../../common/constant";

import "./Maincategory.css";
import "../../../assets/website/css/bootstrap.min.css";

const Maincategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetchMaincategory();
        console.log("API Response:", res); // Debug log

        if (res?.status) {
          // Check if the data is an array
          const data = Array.isArray(res.data)
            ? res.data
            : Array.isArray(res.data?.categories)
            ? res.data.categories
            : [];

          setCategories(data);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="maincategory-section container">
      <div className="row justify-content-center">
        {categories.map((cat, index) => (
          <div
            className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 d-flex justify-content-center mb-4"
            key={index}
          >
            <div className={`category-card ${cat.ct_type || "default"}`}>
              <div className="card-content">
                {cat.ct_img && (
                  <img
                    src={`${WEB_API}${cat.ct_img}`}
                    alt={cat.ct_name}
                    className="category-image"
                  />
                )}
                <h5 className="card-title">{cat.ct_name}</h5>
                <button className="btn primary-btn">Explore</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Maincategory;
