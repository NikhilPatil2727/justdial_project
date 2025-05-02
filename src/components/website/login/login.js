import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "./Service";
import Profilenav from "../../profile/profilenav/Profilenav";

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

      if (response.status === true) {
        localStorage.setItem("userToken", response.token);
        navigate("/Home");
      } else {
        setErrors({ api: response.message || "Invalid credentials" });
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
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", width: "100vw", position: "relative" }}>
      <div className="card shadow-lg p-4 mt-3" style={{ width: "100%", maxWidth: "400px", borderRadius: "8px", backgroundColor: "white" }}>
        <h2 className="text-center mb-4">Login</h2>
        {errors.api && <div className="alert alert-danger">{errors.api}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="us_phone_number">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="us_phone_number"
              value={formData.us_phone_number}
              onChange={handleChange}
              maxLength={10}
            />
            {errors.us_phone_number && <small className="text-danger">{errors.us_phone_number}</small>}
          </div>

          <div className="form-group mt-3">
            <label htmlFor="us_reg_password">Password</label>
            <input
              type="password"
              className="form-control"
              id="us_reg_password"
              value={formData.us_reg_password}
              onChange={handleChange}
              maxLength={6}
            />
            {errors.us_reg_password && <small className="text-danger">{errors.us_reg_password}</small>}
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          
        </form>
      </div>
    </div>
    </>
  );
};


export default LoginPage;
