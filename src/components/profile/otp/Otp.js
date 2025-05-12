// import { useState } from "react";
// import Profilenav from "../profilenav/Profilenav";
// import backgroundImage from "../../../assets/profile/images/business.jpg";
// import { verifyBusinessOTP } from "./Service";
// import { useNavigate } from "react-router-dom";

// const BusinessOTPVerification = () => {
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setOtp(e.target.value);
//     if (error) setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!otp.match(/^\d{4}$/)) {
//       setError("Enter a valid 4-digit OTP");
//       setLoading(false);
//       return;
//     }

//     const otpData = {
//       otp,
//       bs_business_phone: localStorage.getItem("businessTempMobile"),
//     };

//     try {
//       const response = await verifyBusinessOTP(otpData);
//       if (response && response.status === 200) {
//         // localStorage.setItem("businessToken", response.data.token);
//         alert("OTP Verified Successfully!");
//         navigate("/BusinessLogin");
//       } else {
//         alert(response.data.message || "Invalid OTP");
//       }
//     } catch (error) {
//       alert(error.message || "Verification failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <>
//       <Profilenav />
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ minHeight: "88vh", width: "100vw", position: "relative" }}
//       >
//         <div
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundImage: `url(${backgroundImage})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//             opacity: 0.5,
//             zIndex: -1,
//           }}
//         ></div>

//         <div
//           className="card shadow-lg p-4 mt-3"
//           style={{ width: "100%", maxWidth: "400px", borderRadius: "8px", backgroundColor: "white" }}
//         >
//           <h2 className="text-center mb-4">OTP Verification</h2>

//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="otp">Enter OTP</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="otp"
//                 value={otp}
//                 onChange={handleChange}
//                 maxLength={4}
//               />
//               {error && <small className="text-danger">{error}</small>}
//             </div>

//             <div className="d-flex justify-content-center mt-4">
//               <button type="submit" className="btn btn-save mx-2" disabled={loading}>
//                 {loading ? "Verifying..." : "Verify OTP"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BusinessOTPVerification;


//second

// import { useState } from "react";
// import Profilenav from "../profilenav/Profilenav";
// import { verifyBusinessOTP } from "./Service";
// import { useNavigate } from "react-router-dom";

// const BusinessOTPVerification = () => {
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setOtp(e.target.value);
//     if (error) setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!otp.match(/^\d{4}$/)) {
//       setError("Enter a valid 4-digit OTP");
//       setLoading(false);
//       return;
//     }

//     const otpData = {
//       otp,
//       bs_business_phone: localStorage.getItem("businessTempMobile"),
//     };

//     try {
//       const response = await verifyBusinessOTP(otpData);
//       if (response && response.status === 200) {
//         alert("OTP Verified Successfully!");
//         navigate("/BusinessLogin");
//       } else {
//         alert(response.data.message || "Invalid OTP");
//       }
//     } catch (error) {
//       alert(error.message || "Verification failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Profilenav />
//       <div className="business-login-wrapper">
//         <section className="business-login-section">
//           <div className="business-login-box">
//             {[...Array(6)].map((_, i) => (
//               <div className="business-login-square" style={{ "--i": i }} key={i}></div>
//             ))}
//             <div className="business-login-container">
//               <div className="business-login-form">
//                 <h2>OTP Verification</h2>
//                 <form onSubmit={handleSubmit}>
//                   <div className="business-input-group">
//                     <input
//                       type="text"
//                       id="otp"
//                       value={otp}
//                       onChange={handleChange}
//                       maxLength="4"
//                       required
//                     />
//                     <span>Enter OTP</span>
//                     <i className="fas fa-key"></i>
//                     {error && <p className="error">{error}</p>}
//                   </div>

//                   <div className="business-input-group">
//                     <input
//                       type="submit"
//                       value={loading ? "Verifying..." : "Verify OTP"}
//                     />
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Reusing same style from BusinessLogin */}
//         <style>{`
//           .business-login-wrapper {
//             font-family: 'El Messiri', sans-serif;
//           }

//           .business-login-section {
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             min-height: 100vh;
//             background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
//             background-size: 400% 400%;
//             animation: gradient 10s ease infinite;
//             overflow: hidden;
//           }

//           @keyframes gradient {
//             0% { background-position: 0% 50%; }
//             50% { background-position: 100% 50%; }
//             100% { background-position: 0% 50%; }
//           }

//           .business-login-box {
//             position: relative;
//           }

//           .business-login-square {
//             position: absolute;
//             background: rgba(255, 255, 255, 0.1);
//             backdrop-filter: blur(5px);
//             box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
//             border: 1px solid rgba(255, 255, 255, 0.15);
//             border-radius: 15px;
//             animation: float 10s linear infinite;
//             animation-delay: calc(-1s * var(--i));
//           }

//           @keyframes float {
//             0%, 100% { transform: translateY(-20px); }
//             50% { transform: translateY(20px); }
//           }

//           .business-login-square:nth-child(1) { width: 100px; height: 100px; top: -15px; right: -45px; }
//           .business-login-square:nth-child(2) { width: 150px; height: 150px; top: 105px; left: -125px; z-index: 2; }
//           .business-login-square:nth-child(3) { width: 60px; height: 60px; bottom: 85px; right: -45px; z-index: 2; }
//           .business-login-square:nth-child(4) { width: 50px; height: 50px; bottom: 35px; left: -95px; }
//           .business-login-square:nth-child(5) { width: 50px; height: 50px; top: -15px; left: -25px; }
//           .business-login-square:nth-child(6) { width: 85px; height: 85px; top: 165px; right: -155px; z-index: 2; }

//           .business-login-container {
//             position: relative;
//             padding: 20px;
//             width: 350px;
//             min-height: 300px;
//             background: rgba(255, 255, 255, 0.1);
//             backdrop-filter: blur(5px);
//             border-radius: 10px;
//             box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
//           }

//           .business-login-form h2 {
//             color: #fff;
//             text-align: center;
//             margin-bottom: 30px;
//           }

//           .business-input-group {
//             position: relative;
//             margin-bottom: 20px;
//           }

//           .business-input-group input {
//             width: 100%;
//             padding: 10px 40px 10px 10px;
//             border: 1px solid rgba(255, 255, 255, 0.2);
//             background: rgba(255, 255, 255, 0.2);
//             border-radius: 15px;
//             color: #fff;
//             font-size: 16px;
//           }

//           .business-input-group input[type="submit"] {
//             background: #fff;
//             color: #000;
//             cursor: pointer;
//             transition: all 0.5s;
//           }

//           .business-input-group input[type="submit"]:hover {
//             background: #23d5ab;
//             color: #fff;
//           }

//           .business-input-group span {
//             position: absolute;
//             left: 15px;
//             top: 10px;
//             color: #fff;
//             pointer-events: none;
//             transition: 0.3s;
//           }

//           .business-input-group input:focus ~ span,
//           .business-input-group input:valid ~ span {
//             top: -15px;
//             font-size: 12px;
//             color: #23a6d5;
//           }

//           .error {
//             color: #ff4d4d;
//             font-size: 14px;
//             margin-top: 5px;
//           }

//           .fas {
//             position: absolute;
//             top: 10px;
//             right: 15px;
//             color: #fff;
//           }
//         `}</style>
//       </div>
//     </>
//   );
// };

// export default BusinessOTPVerification;




import { useState } from "react";
import Profilenav from "../profilenav/Profilenav";
import { verifyBusinessOTP } from "./Service";
import { useNavigate } from "react-router-dom";

const BusinessOTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setOtp(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!otp.match(/^\d{4}$/)) {
      setError("Enter a valid 4-digit OTP");
      setLoading(false);
      return;
    }

    const otpData = {
      otp,
      bs_business_phone: localStorage.getItem("businessTempMobile"),
    };

    try {
      const response = await verifyBusinessOTP(otpData);
      if (response && response.status === 200) {
        alert("OTP Verified Successfully!");
        navigate("/BusinessLogin");
      } else {
        alert(response.data.message || "Invalid OTP");
      }
    } catch (error) {
      alert(error.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Profilenav />
      <div className="bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 min-h-screen flex items-center justify-center p-4">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white bg-opacity-10"
              style={{
                width: `${Math.floor(Math.random() * 100) + 50}px`,
                height: `${Math.floor(Math.random() * 100) + 50}px`,
                top: `${Math.floor(Math.random() * 90)}%`,
                left: `${Math.floor(Math.random() * 90)}%`
              }}
            />
          ))}
        </div>
        
        {/* Main card */}
        <div className="relative w-full max-w-md">
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white border-opacity-30">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">OTP Verification</h2>
              <p className="text-white text-opacity-80">Enter the 4-digit code sent to your phone</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="flex items-center">
                  <span className="absolute left-4 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-4 bg-white bg-opacity-20 rounded-xl border border-white border-opacity-30 text-white text-xl text-center tracking-widest placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all"
                    placeholder="Enter 4-digit OTP"
                    value={otp}
                    onChange={handleChange}
                    maxLength="4"
                    required
                  />
                </div>
                {error && (
                  <p className="mt-2 text-red-300 text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </div>
                ) : (
                  "Verify OTP"
                )}
              </button>
              
              <div className="text-center mt-4">
                <p className="text-white text-opacity-80">
                  Didn't receive the code? 
                  <button type="button" className="ml-1 text-white font-semibold hover:underline focus:outline-none">
                    Resend
                  </button>
                </p>
              </div>
            </form>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 w-12 h-12 bg-purple-500 rounded-lg transform rotate-12"></div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-400 rounded-full"></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .relative {
          animation: float 6s ease-in-out infinite;
        }
        
        .absolute {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </>
  );
};

export default BusinessOTPVerification;