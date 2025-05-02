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
      <div className="business-login-wrapper">
        <section className="business-login-section">
          <div className="business-login-box">
            {[...Array(6)].map((_, i) => (
              <div className="business-login-square" style={{ "--i": i }} key={i}></div>
            ))}
            <div className="business-login-container">
              <div className="business-login-form">
                <h2>OTP Verification</h2>
                <form onSubmit={handleSubmit}>
                  <div className="business-input-group">
                    <input
                      type="text"
                      id="otp"
                      value={otp}
                      onChange={handleChange}
                      maxLength="4"
                      required
                    />
                    <span>Enter OTP</span>
                    <i className="fas fa-key"></i>
                    {error && <p className="error">{error}</p>}
                  </div>

                  <div className="business-input-group">
                    <input
                      type="submit"
                      value={loading ? "Verifying..." : "Verify OTP"}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Reusing same style from BusinessLogin */}
        <style>{`
          .business-login-wrapper {
            font-family: 'El Messiri', sans-serif;
          }

          .business-login-section {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
            background-size: 400% 400%;
            animation: gradient 10s ease infinite;
            overflow: hidden;
          }

          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .business-login-box {
            position: relative;
          }

          .business-login-square {
            position: absolute;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(5px);
            box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 15px;
            animation: float 10s linear infinite;
            animation-delay: calc(-1s * var(--i));
          }

          @keyframes float {
            0%, 100% { transform: translateY(-20px); }
            50% { transform: translateY(20px); }
          }

          .business-login-square:nth-child(1) { width: 100px; height: 100px; top: -15px; right: -45px; }
          .business-login-square:nth-child(2) { width: 150px; height: 150px; top: 105px; left: -125px; z-index: 2; }
          .business-login-square:nth-child(3) { width: 60px; height: 60px; bottom: 85px; right: -45px; z-index: 2; }
          .business-login-square:nth-child(4) { width: 50px; height: 50px; bottom: 35px; left: -95px; }
          .business-login-square:nth-child(5) { width: 50px; height: 50px; top: -15px; left: -25px; }
          .business-login-square:nth-child(6) { width: 85px; height: 85px; top: 165px; right: -155px; z-index: 2; }

          .business-login-container {
            position: relative;
            padding: 20px;
            width: 350px;
            min-height: 300px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(5px);
            border-radius: 10px;
            box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
          }

          .business-login-form h2 {
            color: #fff;
            text-align: center;
            margin-bottom: 30px;
          }

          .business-input-group {
            position: relative;
            margin-bottom: 20px;
          }

          .business-input-group input {
            width: 100%;
            padding: 10px 40px 10px 10px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.2);
            border-radius: 15px;
            color: #fff;
            font-size: 16px;
          }

          .business-input-group input[type="submit"] {
            background: #fff;
            color: #000;
            cursor: pointer;
            transition: all 0.5s;
          }

          .business-input-group input[type="submit"]:hover {
            background: #23d5ab;
            color: #fff;
          }

          .business-input-group span {
            position: absolute;
            left: 15px;
            top: 10px;
            color: #fff;
            pointer-events: none;
            transition: 0.3s;
          }

          .business-input-group input:focus ~ span,
          .business-input-group input:valid ~ span {
            top: -15px;
            font-size: 12px;
            color: #23a6d5;
          }

          .error {
            color: #ff4d4d;
            font-size: 14px;
            margin-top: 5px;
          }

          .fas {
            position: absolute;
            top: 10px;
            right: 15px;
            color: #fff;
          }
        `}</style>
      </div>
    </>
  );
};

export default BusinessOTPVerification;
