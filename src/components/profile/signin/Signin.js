// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { userLogin } from "./Service";
// import Profilenav from "../../profile/profilenav/Profilenav";

// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     us_phone_number: "",
//     us_reg_password: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });

//     if (errors[id]) {
//       setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     setLoading(true);

//     let validationErrors = {};
    
//     if (!formData.us_phone_number.match(/^\d{10}$/)) {
//       validationErrors.us_phone_number = "Enter a valid 10-digit mobile number";
//     }
//     if (formData.us_reg_password.length < 6) {
//       validationErrors.us_reg_password = "Password must be at least 6 characters long";
//     }

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await userLogin(formData);

//       if (response.status === true) {
//         localStorage.setItem("userToken", response.token);
//         navigate("/Home");
//       } else {
//         setErrors({ api: response.message || "Invalid credentials" });
//       }
//     } catch (error) {
//       setErrors({ api: "An error occurred while logging in. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//     <Profilenav />
//     <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", width: "100vw", position: "relative" }}>
//       <div className="card shadow-lg p-4 mt-3" style={{ width: "100%", maxWidth: "400px", borderRadius: "8px", backgroundColor: "white" }}>
//         <h2 className="text-center mb-4">Login</h2>
//         {errors.api && <div className="alert alert-danger">{errors.api}</div>}

//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="us_phone_number">Phone Number</label>
//             <input
//               type="tel"
//               className="form-control"
//               id="us_phone_number"
//               value={formData.us_phone_number}
//               onChange={handleChange}
//               maxLength={10}
//             />
//             {errors.us_phone_number && <small className="text-danger">{errors.us_phone_number}</small>}
//           </div>

//           <div className="form-group mt-3">
//             <label htmlFor="us_reg_password">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="us_reg_password"
//               value={formData.us_reg_password}
//               onChange={handleChange}
//               maxLength={6}
//             />
//             {errors.us_reg_password && <small className="text-danger">{errors.us_reg_password}</small>}
//           </div>

//           <div className="d-flex justify-content-center mt-4">
//             <button type="submit" className="btn-save" disabled={loading}>
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </div>

          
//         </form>
//       </div>
//     </div>
//     </>
//   );
// };


// export default LoginPage;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { userLogin } from "./Service";
// import Profilenav from "../../profile/profilenav/Profilenav";

// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     us_phone_number: "",
//     us_reg_password: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });

//     if (errors[id]) {
//       setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     setLoading(true);

//     let validationErrors = {};

//     if (!formData.us_phone_number.match(/^\d{10}$/)) {
//       validationErrors.us_phone_number = "Enter a valid 10-digit mobile number";
//     }
//     if (formData.us_reg_password.length < 6) {
//       validationErrors.us_reg_password = "Password must be at least 6 characters long";
//     }

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       setLoading(false);
//       return;
//     }

//     try {
//             const response = await userLogin(formData);
      
//             if (response && response.token) {
//               localStorage.setItem("userToken", response.token);
//               navigate("/Home");
//             } else {
//               setErrors({ api: response.error || "Invalid credentials" });
//             }
            
//           } catch (error) {
//             setErrors({ api: "An error occurred while logging in. Please try again." });
//           } finally {
//             setLoading(false);
//           }
//   };

//   const styles = {
 
//     container: {
//       height: '600px',
//       width: '475px',
//       boxShadow: '0px 15px 30px rgb(22, 22, 22)',
//       position: 'absolute',
//       top: '50%',
//       left: '50%',
//       marginTop: '70px',
//       transform: 'translate(-50%, -50%)',
//       overflow: 'hidden',
//       borderRadius: '20px',
//       background: 'linear-gradient(to right top, purple, rgb(187, 7, 142))',
//     },
//     circleTop: {
//       height: '300px',
//       width: '395px',
//       borderRadius: '50%',
//       backgroundColor: 'white',
//       boxShadow: 'inset 0px 15px 25px rgb(104, 102, 102), 0px 5px 15px rgb(114, 113, 113)',
//       marginTop: '-120px',
//       marginLeft: '-50px',
//     },
//     circleBottom: {
//       height: '216px',
//       width: '465px',
//       borderRadius: '50%',
//       backgroundColor: 'white',
//       marginTop: '200px',
//       marginLeft: '200px',
//       boxShadow: 'inset 0px 5px 15px rgb(90, 89, 89), 0px 5px 15px rgb(77, 75, 75)',
//     },
//     content: {
//       height: '400px',
//       width: '358px',
//       float: 'right',
//       marginTop: '-70px',
//       marginRight: '0px',
//       borderTopLeftRadius: '20px',
//       borderBottomLeftRadius: '20px',
//       background: 'linear-gradient(to right top, rgb(236, 23, 190), rgb(4, 238, 187))',
//       boxShadow: '0px 5px 15px rgb(22, 21, 21)',
//       color: 'white',
//     },
//     heading: {
//       marginLeft: '10px',
//       padding: '20px',
//       paddingBottom: '30px',
//       marginTop: '25px',
//       fontWeight: 'lighter',
//     },
//     formGroup: {
//       marginLeft: '30px',
//       marginBottom: '10px'
//     },
//     input: {
//       width: '90%',
//       borderRadius: '5px',
//       border: 'none',
//       marginTop: '5px',
//       padding: '8px',
//       backgroundColor: 'rgba(221, 235, 240, 0.4)',
//       color: 'rgb(145, 32, 145)',
//     },
//     errorText: {
//       color: 'yellow',
//       fontSize: '12px',
//       marginTop: '4px'
//     },
//     button: {
//       marginLeft: '107px',
//       marginTop: '3px',
//       padding: '10px 60px',
//       border: 'none',
//       borderRadius: '20px',
//       backgroundColor: 'white',
//       boxShadow: '0px 5px 10px grey',
//       cursor: 'pointer',
//       color: 'purple',
//       fontSize: 'large',
//     },
//     icons: {
//       marginLeft: '90px',
//       marginTop: '20px',
//     },
//     icon: {
//       paddingRight: '10px',
//       fontSize: '24px',
//       transition: 'transform 0.3s',
//       cursor: 'pointer',
//       color: 'white'
//     },
//     apiError: {
//       marginLeft: '30px',
//       fontSize: '13px',
//       color: 'yellow',
//       marginBottom: '10px'
//     }
//   };

//   return (
//     <>
//       <Profilenav />
//       <div style={styles.body}>
//         <div style={styles.container}>
//           <div style={styles.circleTop}></div>

//           <div style={styles.content}>
//             <h1 style={styles.heading}>Login</h1>

//             {errors.api && <div style={styles.apiError}>{errors.api}</div>}

//             <form onSubmit={handleSubmit}>
//               <div style={styles.formGroup}>
//                 <label htmlFor="us_phone_number">Phone Number</label><br />
//                 <input
//                   type="tel"
//                   id="us_phone_number"
//                   maxLength={10}
//                   value={formData.us_phone_number}
//                   onChange={handleChange}
//                   style={styles.input}
//                 />
//                 {errors.us_phone_number && (
//                   <div style={styles.errorText}>{errors.us_phone_number}</div>
//                 )}
//               </div>

//               <div style={styles.formGroup}>
//                 <label htmlFor="us_reg_password">Password</label><br />
//                 <input
//                   type="password"
//                   id="us_reg_password"
//                   maxLength={6}
//                   value={formData.us_reg_password}
//                   onChange={handleChange}
//                   style={styles.input}
//                 />
//                 {errors.us_reg_password && (
//                   <div style={styles.errorText}>{errors.us_reg_password}</div>
//                 )}
//               </div>



//               <button type="submit" style={styles.button} disabled={loading}>
//                 {loading ? "Logging in..." : "Login"}
//               </button>
//             </form>
//           </div>

//           <div style={styles.circleBottom}></div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LoginPage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "./Service";
import Profilenav from "../../profile/profilenav/Profilenav";
import loginImage from "../../../assets/profile/images/download.jpg";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    us_phone_number: "",
    us_reg_password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
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
    setErrors({});
    setLoading(true);

    let validationErrors = {};

    if (!formData.us_phone_number.match(/^\d{10}$/)) {
      validationErrors.us_phone_number = "Enter a valid 10-digit mobile number";
    }
    if (formData.us_reg_password.length < 6) {
      validationErrors.us_reg_password = "Password must be at least 6 characters long";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await userLogin(formData);

      if (response && response.token) {
        localStorage.setItem("userToken", response.token);
        navigate("/Home");
      } else {
        setErrors({ api: response.error || "Invalid credentials" });
      }
    } catch (error) {
      setErrors({ api: "An error occurred while logging in. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Profilenav />
      
      {/* Full Screen Centering */}
      <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: "100vh"}}>
        <div className="row w-100 justify-content-center align-items-center" style={{ maxWidth: "900px" }}>
          {/* Left Side - Image */}
          <div className="col-md-6 text-center mb-4 mb-md-0">
            <img 
              src={loginImage} 
              alt="Login" 
              className="img-fluid"
              style={{ height:"500px",maxHeight: "800px" }}
            />
          </div>

          {/* Right Side - Form */}
          <div className="col-md-6 ">
            <div className="card shadow p-4 bg-light p-5">
              <div>              
                <h2 className="text-center mb-4"  style={{backgroundColor:"#a071fd", color:"white", fontSize:"3rem"}}>Login</h2>
              </div><br></br>

              {errors.api && <div className="alert alert-danger text-center">{errors.api}</div>}

              <form onSubmit={handleSubmit} style={{height:"300px"}}>
                {/* Phone Number */}
                <div className="mb-3">
                  <label htmlFor="us_phone_number" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    id="us_phone_number"
                    value={formData.us_phone_number}
                    onChange={handleChange}
                    className="form-control"
                    maxLength="10"
                  />
                  {errors.us_phone_number && (
                    <small className="text-danger">{errors.us_phone_number}</small>
                  )}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="us_reg_password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="us_reg_password"
                    value={formData.us_reg_password}
                    onChange={handleChange}
                    className="form-control"
                    maxLength="20"
                  />
                  {errors.us_reg_password && (
                    <small className="text-danger">{errors.us_reg_password}</small>
                  )}
                </div>
                <br></br><br></br>
                {/* Submit Button */}
                <div className="d-flex justify-content-center">
  <button type="submit" className="btn w-50" style={{backgroundColor:"#a071fd", alignItems:"center"}} disabled={loading}>
    {loading ? "Logging in..." : "Login"}
  </button>
</div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
