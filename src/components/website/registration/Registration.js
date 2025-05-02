import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profilenav from '../../profile/profilenav/Profilenav';
import { registerUser } from "./Service"; 

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
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
      console.log(response.status)

      if (response.status === true) {
        console.log(response.data?.message==="Registration successful, navigating to OTP screen");
        alert("Registration successful!");
        localStorage.setItem("userTempMobile", formData.phone);
        navigate("/otp");
      }
      
    } catch (error) {
      console.error("Error registering user:", error);
      alert(error.response?.data?.message || "Email or phone number already exists!");
    }
  };

  return (
    <>
    <Profilenav />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", width: "100vw", position: "relative" }}
      >
        <div
          className="card shadow-lg p-4 mt-3"
          style={{ width: "100%", maxWidth: "600px", borderRadius: "8px", backgroundColor: "white" }}
        >
          <h2 className="text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" className="form-control" id="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" required  maxLength={10}/>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" className="form-control" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" required />
            </div>

            <div className="d-flex justify-content-center mt-4">
              <button type="submit" className="btn-save">Register</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;