import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profilenav from "../../profile/profilenav/Profilenav";
import { verifyOtp } from "./Service"; 

const OtpScreen = () => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length === 4) {
      console.log("Verifying OTP:", otp);
    
      const otpData = {
        otp,
        us_phone_number: localStorage.getItem("userTempMobile"), 
        
      };
  
      try {
        const response = await verifyOtp(otpData);
  
        if (response && response.status === 200) {
          console.log("OTP Verified:", response.data.message);
          navigate("/login");
        } else {
          alert("Invalid OTP or error in verification.");
        }
      } catch (err) {
        console.error("Error verifying OTP:", err);
        alert("An error occurred during OTP verification. Please try again.");
      }
    } else {
      alert("Please enter a valid 4-digit OTP");
    }
  };
  
  return (
    <>
      <Profilenav />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          width: "100vw",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.5,
            zIndex: -1,
          }}
        ></div>

        {/* OTP Card */}
        <div
          className="card shadow-lg p-4 mt-3"
          style={{
            width: "100%",
            maxWidth: "400px",
            zIndex: 1,
            borderRadius: "8px",
            backgroundColor: "white",
          }}
        >
          <h2 className="text-center mb-4">Enter OTP</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="otp">OTP (4-digit code)</label>
              <input
                type="text"
                className="form-control"
                id="otp"
                value={otp}
                onChange={handleOtpChange}
                maxLength="4"
                placeholder="Enter OTP"
                required
              />
            </div>

            <div className="d-flex justify-content-center mt-4">
              <button type="submit" className="btn-save">
                Verify OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OtpScreen;
