// import React, { useState, useEffect } from "react";
// import contactImage from "../../../assets/profile/images/p4.jpg";
// import Profilenav from "../profilenav/Profilenav";
// import { updateContacts, viewContacts } from "./Service";
// import { validateContactsForm } from "./validation"; 
// import { useParams } from "react-router-dom";

// const Contacts = () => {
//   let { id } = useParams(); 
//   id = id || "67a9ccd03c2191af42733f16"; 
//   const [formData, setFormData] = useState({
//     bs_business_name: "",
//     bs_owner_name: "",
//     bs_business_phone: "",
//     bs_email:"",
//     bs_password: "",
//     bs_pincode: "",
//     bs_building_name: "",
//     bs_colony_name: "",
//     bs_area: "",
//     bs_landmark: "",
//     bs_city: "",
//     bs_state: "",
//     bs_contact_person: "",
//     bs_whatsapp_number: "",
//     bs_business_type: "",
//     bs_business_category: "",
//     bs_business_sub_category: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [errorMessage, setErrorMessage] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//     setErrors({ ...errors, [e.target.id]: "" }); 
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSuccessMessage(null);
//     setErrorMessage(null);
  
//     const validationErrors = validateContactsForm(formData);
//     if (Object.keys(validationErrors).length === 0) {
//       try {
//         const response = await updateContacts(formData);
//         alert("Contact updated successfully!");
//         console.log("Contact updated successfully:", response);
        
//         setTimeout(() => {
//           window.location.reload();
//         }, 1000); 
        
//       } catch (error) {
//         console.error("Error updating contact:", error);
//         alert("Failed to update contact. Please try again.");
//       }
//     } else {
//       setErrors(validationErrors);
//     }
//   };
  
  
//   useEffect(() => {
//     const fetchContactDetails = async () => {
//       if (!id) return;
//       try {
//         const response = await viewContacts(id);
//         console.log("API Response:", response);

//         if (response?.data?.data?.length > 0) {
//           const contact = response.data.data[0]; // Fetch first business entry
//           setFormData({
//             bs_business_name: contact.bs_business_name || "",
//             bs_owner_name: contact.bs_owner_name || "",
//             bs_business_phone: contact.bs_business_phone || "",
//             bs_email: contact.bs_email || "",
//             bs_password: contact.bs_password || "",
//             bs_pincode: contact.bs_pincode || "",
//             bs_building_name: contact.bs_building_name || "",
//             bs_colony_name: contact.bs_colony_name || "",
//             bs_area: contact.bs_area || "",
//             bs_landmark: contact.bs_landmark || "",
//             bs_city: contact.bs_city || "",
//             bs_state: contact.bs_state || "",
//             bs_contact_person: contact.bs_contact_person || "",
//             bs_whatsapp_number: contact.bs_whatsapp_number || "",
//             bs_business_type: contact.bs_business_type || "",
//             bs_business_category: contact.bs_business_category || "",
//             bs_business_sub_category: contact.bs_business_sub_category || "",
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching contact details:", error);
//         setErrorMessage("Failed to fetch contact details.");
//       }
//     };

//     fetchContactDetails();
//   }, [id]); 
//   return (
//     <>
//       <Profilenav />
//       <div className="custom-container mt-4">
//         <div className="custom-row">
//           <div className="custom-col image-section" style={{ display: "block" }}>
//             <img src={contactImage} alt="Contact Image" className="contact-image" />
//           </div>

//           <div className="custom-col">
//             <div className="form-card">
//               <h2 className="form-title">Business Info</h2>
//               <form id="businessContactForm" onSubmit={handleSubmit}>
//               <div className="form-group">
//                   <label htmlFor="businessName">Business Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter business name "
//                     id="bs_business_name"
//                     value={formData.bs_business_name}
//                     onChange={handleChange}
//                   />
//                   {errors.businessName && <small className="text-danger">{errors.businessName}</small>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="ownerName">Owner Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter owner name "
//                     id="bs_owner_name"
//                     value={formData.bs_owner_name}
//                     onChange={handleChange}
//                   />
//                   {errors.ownerName && <small className="text-danger">{errors.ownerName}</small>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="businessPhone">Business Phone</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter business phone "
//                     id="bs_business_phone"
//                     value={formData.bs_business_phone}
//                     onChange={handleChange}
//                     maxLength={10}
//                   />
//                   {errors.businessPhone && <small className="text-danger">{errors.businessPhone}</small>}

//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="email">Email</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     placeholder="Enter email "
//                     id="bs_email"
//                     value={formData.bs_email}
//                     onChange={handleChange}
//                   />
//                   {errors.email && <small className="text-danger">{errors.email}</small>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="password">Password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     placeholder="Enter password "
//                     id="bs_password"
//                     value={formData.bs_password}
//                     onChange={handleChange}
//                     maxLength={6}
//                   />
//                   {errors.password && <small className="text-danger">{errors.password}</small>}
//                 </div>


//                 <div className="form-group">
//                   <label htmlFor="pincode">Pincode</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter pincode "
//                     id="bs_pincode"
//                     value={formData.bs_pincode}
//                     onChange={handleChange}
//                     maxLength={6}
//                   />
//                   {errors.pincode && <small className="text-danger">{errors.pincode}</small>}

//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="buildingName">Building Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter building name "
//                     id="bs_building_name"
//                     value={formData.bs_building_name}
//                     onChange={handleChange}
//                   />
//                   {errors.buildingName && <small className="text-danger">{errors.buildingName}</small>}

//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="colonyName">Colony Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter Colony name "
//                     id="bs_colony_name"
//                     value={formData.bs_colony_name}
//                     onChange={handleChange}
//                   />
//                   {errors.colonyName && <small className="text-danger">{errors.colonyName}</small>}

//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="area">Area</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter area name "

//                     id="bs_area"
//                     value={formData.bs_area}
//                     onChange={handleChange}
//                   />
//                   {errors.area && <small className="text-danger">{errors.area}</small>}

//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="landmark">Landmark</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter landmark "

//                     id="bs_landmark"
//                     value={formData.bs_landmark}
//                     onChange={handleChange}
//                   />
//                   {errors.landmark && <small className="text-danger">{errors.landmark}</small>}

//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="city">City</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                      placeholder="Enter City "
//                     id="bs_city"
//                     value={formData.bs_city}
//                     onChange={handleChange}
//                   />
//                   {errors.businessName && <small className="text-danger">{errors.city}</small>}

//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="state">State</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter State "

//                     id="bs_state"
//                     value={formData.bs_state}
//                     onChange={handleChange}
//                   />
//                   {errors.businessName && <small className="text-danger">{errors.state}</small>}

//                 </div>

//                 <div className="form-group mt-1">
//                   <label htmlFor="contactPerson">Contact Person</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter Contact Person "

//                     id="bs_contact_person"
//                     value={formData.bs_contact_person}
//                     onChange={handleChange}
//                     maxLength={10}
//                   />
//                   {errors.contactPerson && <small className="text-danger">{errors.contactPerson}</small>}

//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="whatsAppNumber">WhatsApp Number</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter WhatsApp Number "
//                     id="bs_whatsapp_number"
//                     value={formData.bs_whatsapp_number}
//                     onChange={handleChange}
//                     maxLength={10}
//                   />
//                   {errors.whatsAppNumber && <small className="text-danger">{errors.whatsAppNumber}</small>}

//                 </div>

//                 <div className="form-group mt-4">
//                   <label htmlFor="businessType">Business Type</label>
//                   <select
//                     className="form-control"
//                     id="bs_business_type"
//                     value={formData.bs_business_type}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Business Type</option>
//                     <option value="restaurant">Restaurant</option>
//                     <option value="service">Service</option>
//                     <option value="retail">Retail</option>
//                     <option value="others">Others</option>
//                   </select>
//                   {errors.businessType && <small className="text-danger">{errors.businessType}</small>}

//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="businessCategory">Business Category</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter Business Category "
//                     id="bs_business_category"
//                     value={formData.bs_business_category}
//                     onChange={handleChange}
//                   />
//                   {errors.businessCategory && <small className="text-danger">{errors.businessCategory}</small>}

//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="businessSubCategory">Business SubCategory</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter Business SubCategory "

//                     id="bs_business_sub_category"
//                     value={formData.bs_business_sub_category}
//                     onChange={handleChange}
//                   />
//                   {errors.businessSubCategory && <small className="text-danger">{errors.businessSubCategory}</small>}

//                 </div>
//                 <div className="button-wrapper">
//                   <button type="submit" className="custom-button">Save Contact</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Contacts;
import React, { useState, useEffect } from "react";
import contactImage from "../../../assets/profile/images/p4.jpg";
import Profilenav from "../profilenav/Profilenav";
import { updateContacts, viewContacts } from "./Service";
import { validateContactsForm } from "./validation";
import { useParams } from "react-router-dom";

const Contacts = () => {
  let { id } = useParams();
  id = id || "67a9ccd03c2191af42733f16";

  const [formData, setFormData] = useState({
    bs_business_name: "",
    bs_owner_name: "",
    bs_business_phone: "",
    bs_email: "",
    bs_password: "",
    bs_pincode: "",
    bs_building_name: "",
    bs_colony_name: "",
    bs_area: "",
    bs_landmark: "",
    bs_city: "",
    bs_state: "",
    bs_contact_person: "",
    bs_whatsapp_number: "",
    bs_business_type: "",
    bs_business_category: "",
    bs_business_sub_category: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    const validationErrors = validateContactsForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await updateContacts(formData);
        alert("Contact updated successfully!");
        console.log("Contact updated successfully:", response);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error("Error updating contact:", error);
        alert("Failed to update contact. Please try again.");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    const fetchContactDetails = async () => {
      if (!id) return;
      try {
        const response = await viewContacts(id);
        if (response?.data?.data?.length > 0) {
          const contact = response.data.data[0];
          setFormData({
            bs_business_name: contact.bs_business_name || "",
            bs_owner_name: contact.bs_owner_name || "",
            bs_business_phone: contact.bs_business_phone || "",
            bs_email: contact.bs_email || "",
            bs_password: contact.bs_password || "",
            bs_pincode: contact.bs_pincode || "",
            bs_building_name: contact.bs_building_name || "",
            bs_colony_name: contact.bs_colony_name || "",
            bs_area: contact.bs_area || "",
            bs_landmark: contact.bs_landmark || "",
            bs_city: contact.bs_city || "",
            bs_state: contact.bs_state || "",
            bs_contact_person: contact.bs_contact_person || "",
            bs_whatsapp_number: contact.bs_whatsapp_number || "",
            bs_business_type: contact.bs_business_type || "",
            bs_business_category: contact.bs_business_category || "",
            bs_business_sub_category: contact.bs_business_sub_category || "",
          });
        }
      } catch (error) {
        console.error("Error fetching contact details:", error);
        setErrorMessage("Failed to fetch contact details.");
      }
    };

    fetchContactDetails();
  }, [id]);

  const renderInput = (id, label, type = "text", maxLength = null) => (
    <div className="col-md-4 mb-3">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        className="form-control"
        placeholder={`Enter ${label.toLowerCase()}`}
        id={id}
        value={formData[id]}
        onChange={handleChange}
        maxLength={maxLength || undefined}
      />
      {errors[id] && <small className="text-danger">{errors[id]}</small>}
    </div>
  );

  return (
    <>
      <Profilenav />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4 mb-4">
            <img src={contactImage} alt="Contact" className="img-fluid rounded shadow" />
          </div>
          <div className="col-md-8">
            <div className="card p-4 shadow">
              <h2 className="mb-4">Business Info</h2>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {renderInput("bs_business_name", "Business Name")}
                  {renderInput("bs_owner_name", "Owner Name")}
                  {renderInput("bs_business_phone", "Business Phone", "text", 10)}
                </div>
                <div className="row">
                  {renderInput("bs_email", "Email", "email")}
                  {renderInput("bs_password", "Password", "password", 6)}
                  {renderInput("bs_pincode", "Pincode", "text", 6)}
                </div>
                <div className="row">
                  {renderInput("bs_building_name", "Building Name")}
                  {renderInput("bs_colony_name", "Colony Name")}
                  {renderInput("bs_area", "Area")}
                </div>
                <div className="row">
                  {renderInput("bs_landmark", "Landmark")}
                  {renderInput("bs_city", "City")}
                  {renderInput("bs_state", "State")}
                </div>
                <div className="row">
                  {renderInput("bs_contact_person", "Contact Person", "text", 10)}
                  {renderInput("bs_whatsapp_number", "WhatsApp Number", "text", 10)}
                  <div className="col-md-4 mb-3">
                    <label htmlFor="bs_business_type">Business Type</label>
                    <select
                      className="form-control"
                      id="bs_business_type"
                      value={formData.bs_business_type}
                      onChange={handleChange}
                    >
                      <option value="">Select Business Type</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="service">Service</option>
                      <option value="retail">Retail</option>
                      <option value="others">Others</option>
                    </select>
                    {errors.bs_business_type && (
                      <small className="text-danger">{errors.bs_business_type}</small>
                    )}
                  </div>
                </div>
                <div className="row">
                  {renderInput("bs_business_category", "Business Category")}
                  {renderInput("bs_business_sub_category", "Business SubCategory")}
                </div>
                <div className="d-flex justify-content-center text-end mt-4">
                  <button type="submit" className="btn" style={{backgroundColor:"#a071fd",fontWeight: "bold",color:"white"}}>
                    Save Contact
                  </button>
                </div>
              </form>
              {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
              {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
