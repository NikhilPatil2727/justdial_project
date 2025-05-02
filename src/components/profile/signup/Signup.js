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





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profilenav from "../../profile/profilenav/Profilenav";
import { registerUser } from "./Service";

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

  const styles = {
    container: {
      height: '750px',
      width: '500px',
      boxShadow: '0px 15px 30px rgb(22, 22, 22)',
      position: 'absolute',
      top: '50%',
      marginTop: '145px',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      overflow: 'hidden',
      borderRadius: '20px',
      background: 'linear-gradient(to right top, purple, rgb(187, 7, 142))',
    },
    circleTop: {
      height: '300px',
      width: '395px',
      borderRadius: '50%',
      backgroundColor: 'white',
      boxShadow: 'inset 0px 15px 25px rgb(104, 102, 102), 0px 5px 15px rgb(114, 113, 113)',
      marginTop: '-120px',
      marginLeft: '-50px',
    },
    circleBottom: {
      height: '216px',
      width: '465px',
      borderRadius: '50%',
      backgroundColor: 'white',
      marginTop: '250px',
      marginLeft: '200px',
      boxShadow: 'inset 0px 5px 15px rgb(90, 89, 89), 0px 5px 15px rgb(77, 75, 75)',
    },
    content: {
      height: '620px',
      width: '380px',
      float: 'right',
      marginTop: '-90px',
      marginRight: '0px',
      borderTopLeftRadius: '20px',
      borderBottomLeftRadius: '20px',
      background: 'linear-gradient(to right top, rgb(236, 23, 190), rgb(4, 238, 187))',
      boxShadow: '0px 5px 15px rgb(22, 21, 21)',
      color: 'white',
    },
    heading: {
      marginLeft: '10px',
      padding: '20px',
      paddingBottom: '30px',
      marginTop: '25px',
      fontWeight: 'lighter',
    },
    formGroup: {
      marginLeft: '30px',
      marginBottom: '10px',
    },
    input: {
      width: '90%',
      borderRadius: '5px',
      border: 'none',
      marginTop: '5px',
      padding: '8px',
      backgroundColor: 'rgba(221, 235, 240, 0.4)',
      color: 'rgb(145, 32, 145)',
    },
    errorText: {
      color: 'yellow',
      fontSize: '12px',
      marginTop: '4px',
    },
    button: {
      marginLeft: '100px',
      marginTop: '2px',
      padding: '10px 60px',
      border: 'none',
      borderRadius: '20px',
      backgroundColor: 'white',
      boxShadow: '0px 5px 10px grey',
      cursor: 'pointer',
      color: 'purple',
      fontSize: 'large',
    },
  };

  return (
    <>
      <Profilenav />
      <div style={styles.container}>
        <div style={styles.circleTop}></div>
        <div style={styles.content}>
          <h1 style={styles.heading}>Register</h1>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label htmlFor="name">Full Name</label><br />
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="phone">Phone Number</label><br />
              <input
                type="tel"
                id="phone"
                maxLength={10}
                value={formData.phone}
                onChange={handleChange}
                style={styles.input}
                required
              />
              {errors.phone && <div style={styles.errorText}>{errors.phone}</div>}
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="email">Email</label><br />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="password">Password</label><br />
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
                required
              />
              {errors.password && <div style={styles.errorText}>{errors.password}</div>}
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label><br />
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={styles.input}
                required
              />
              {errors.confirmPassword && (
                <div style={styles.errorText}>{errors.confirmPassword}</div>
              )}
            </div>

            <button type="submit" style={styles.button}>
              Register
            </button>
          </form>
        </div>
        <div style={styles.circleBottom}></div>
      </div>
    </>
  );
};

export default Registration;
