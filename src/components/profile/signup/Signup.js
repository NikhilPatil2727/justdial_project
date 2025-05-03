// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Profilenav from '../../profile/profilenav/Profilenav';
// import { registerUser } from "./Service"; 

// const Registration = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     const userData = {
//       us_reg_name: formData.name,
//       us_phone_number: formData.phone,
//       us_email: formData.email,
//       us_reg_password: formData.password,
//     };

//     try {
//       const response = await registerUser(userData);
//       console.log(response.status)

//       if (response.status === true) {
//         console.log(response.data?.message==="Registration successful, navigating to OTP screen");
//         alert("Registration successful!");
//         localStorage.setItem("userTempMobile", formData.phone);
//         navigate("/otp");
//       }
      
//     } catch (error) {
//       console.error("Error registering user:", error);
//       alert(error.response?.data?.message || "Email or phone number already exists!");
//     }
//   };

//   return (
//     <>
//     <Profilenav />
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ minHeight: "100vh", width: "100vw", position: "relative" }}
//       >
//         <div
//           className="card shadow-lg p-4 mt-3"
//           style={{ width: "100%", maxWidth: "600px", borderRadius: "8px", backgroundColor: "white" }}
//         >
//           <h2 className="text-center mb-4">Register</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="name">Full Name</label>
//               <input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required />
//             </div>

//             <div className="form-group">
//               <label htmlFor="phone">Phone Number</label>
//               <input type="tel" className="form-control" id="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" required  maxLength={10}/>
//             </div>

//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" required />
//             </div>

//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
//             </div>

//             <div className="form-group">
//               <label htmlFor="confirmPassword">Confirm Password</label>
//               <input type="password" className="form-control" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" required />
//             </div>

//             <div className="d-flex justify-content-center mt-4">
//               <button type="submit" className="btn-save">Register</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Registration;





// 

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profilenav from "../../profile/profilenav/Profilenav";
import { registerUser } from "./Service";
import sign from "../../../assets/profile/images/download.jpg";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    if (errors[id]) {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.phone.match(/^\d{10}$/)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const userData = {
      us_reg_name: formData.name,
      us_phone_number: formData.phone,
      us_email: formData.email,
      us_reg_password: formData.password,
    };

    try {
      const response = await registerUser(userData);
      if (response.status === true) {
        alert("Registration successful!");
        localStorage.setItem("userTempMobile", formData.phone);
        navigate("/otp");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Email or phone number already exists!");
    }
  };

  return (
    <>
      <Profilenav />

      <div className="mt-4" style={{ minHeight: "100vh"}}>
  <div className="container d-flex align-items-center justify-content-center vh-100">
    <div className="row g-5" style={{ maxWidth: "900px", width: "100%" }}>

      {/* Left Image Section */}
      <div className="col-md-5 d-flex align-items-center justify-content-center p-4">
        <img
          src={sign}
          alt="Register"
          className="img-fluid"
          style={{ height:"600px",maxHeight: "2000px" }}
        />
      </div>

      {/* Right Form Section with Right Shadow */}
      <div
        className="col-md-7 p-4 bg-light rounded"
        style={{ boxShadow: "5px 0 15px rgba(0,0,0,0.2)" }}
      >
         <div>              
                <h2 className="text-center mb-4"  style={{backgroundColor:"#a071fd", color:"white", fontSize:"3rem"}}>Register</h2>
              </div><br></br>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              maxLength={10}
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <div className="text-danger small">{errors.phone}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <div className="text-danger small">{errors.password}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <div className="text-danger small">{errors.confirmPassword}</div>}
          </div>

          <div className="d-flex justify-content-center mt-3">
    <button type="submit" className="btn w-50" style={{backgroundColor:"#a071fd"}}>Register</button>
  </div>
        </form>
      </div>

    </div>
  </div>
</div>

    </>
  );
};

export default Registration;
