import Profilenav from "../profilenav/Profilenav";
import { useState } from "react";
import backgroundImage from "../../../assets/profile/images/business.jpg";
import { addRegistration } from "./Service";
import { validateBusinessForm } from "./validation";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errors, setErrors] = useState({});


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
    bs_image: "",
    bs_desc: "",
    bs_contact_person: "",
    bs_whatsapp_number: "",
    bs_business_type: "",
    bs_business_category: "",
    bs_business_sub_category: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear errors dynamically when user types
    setErrors((prevErrors) => {
      if (prevErrors[id]) {
        return { ...prevErrors, [id]: "" };
      }
      return prevErrors;
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  
    if (file) {
      const fileType = file.type.toLowerCase();
      const fileSize = file.size;
  
      // Validate type
      if (!allowedTypes.includes(fileType)) {
        setErrors(prev => ({ ...prev, bs_image: "Only JPG, JPEG, or PNG files are allowed" }));
        return;
      }
  
      // Validate size
      if (fileSize > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, bs_image: "Image must be smaller than 2MB" }));
        return;
      }
  
      // Clear error if valid
      setErrors(prev => ({ ...prev, bs_image: "" }));
  
      // Convert to base64 and save
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData(prev => ({ ...prev, bs_image: base64String }));
      };
    }
  };
  


  const handleNextStep = () => {
    const validationErrors = validateBusinessForm(formData, step);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (step < 3) setStep(step + 1);
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep(step - 1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const validationErrors = validateBusinessForm(formData, step);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await addRegistration(formData);
      alert("Business registered successfully!");
      console.log("API Response:", response.data);
      localStorage.setItem("businessTempMobile", formData.bs_business_phone)

      navigate("/businessOtp", { state: { bs_business_phone: formData.bs_business_phone } });

    } catch (error) {
      console.error("Error Response:", error.response?.data || error.message);
      alert("Failed to register business. Please try again.");
    }

  };


  return (
    <>
      <Profilenav />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "88vh",
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
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.5,
            zIndex: -1,
          }}
        ></div>

        {/* Form Card */}
        <div
          className="card shadow-lg p-4 mt-3"
          style={{
            width: "100%",
            maxWidth: "600px",
            zIndex: 1,
            borderRadius: "8px",
            backgroundColor: "white",
          }}
        >
          <h2 className="text-center mb-4">Business Registration</h2>
          <form onSubmit={handleSubmit}>
            <h4 className="text-center mb-4">
              {step === 1
                ? "Business Details"
                : step === 2
                  ? "Contact Details"
                  : "Business Category"}
            </h4>

            {step === 1 && (
              <>
                <div className="form-group">
                  <label htmlFor="businessName">Business Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bs_business_name"
                    value={formData.bs_business_name}
                    onChange={handleChange}
                  />
                  {errors.businessName && <small className="text-danger">{errors.businessName}</small>}
                </div>


                <div className="form-group">
                  <label htmlFor="ownerName">Owner Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bs_owner_name"
                    value={formData.bs_owner_name}
                    onChange={handleChange}
                  />
                  {errors.ownerName && <small className="text-danger">{errors.ownerName}</small>}
                </div>

                <div className="form-group">
                  <label htmlFor="businessPhone">Business Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bs_business_phone"
                    value={formData.bs_business_phone}
                    onChange={handleChange}
                    maxLength={10}
                  />
                  {errors.businessPhone && <small className="text-danger">{errors.businessPhone}</small>}

                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="bs_email"
                    value={formData.bs_email}
                    onChange={handleChange}
                  />
                  {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="bs_password"
                    value={formData.bs_password}
                    onChange={handleChange}
                    maxLength={6}
                  />
                  {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>


                <div className="form-group">
                  <label htmlFor="pincode">Pincode</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bs_pincode"
                    value={formData.bs_pincode}
                    onChange={handleChange}
                    maxLength={6}
                  />
                  {errors.pincode && <small className="text-danger">{errors.pincode}</small>}

                </div>

                <div className="form-group">
                  <label htmlFor="buildingName">Building Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bs_building_name"
                    value={formData.bs_building_name}
                    onChange={handleChange}
                  />
                  {errors.buildingName && <small className="text-danger">{errors.buildingName}</small>}

                </div>

                <div className="form-group">
                  <label htmlFor="colonyName">Colony Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bs_colony_name"
                    value={formData.bs_colony_name}
                    onChange={handleChange}
                  />
                  {errors.colonyName && <small className="text-danger">{errors.colonyName}</small>}

                </div>

                <div className="form-group">
                  <label htmlFor="area">Area</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bs_area"
                    value={formData.bs_area}
                    onChange={handleChange}
                  />
                  {errors.area && <small className="text-danger">{errors.area}</small>}

                </div>

                <div className="form-group">
                  <label htmlFor="landmark">Landmark</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bs_landmark"
                    value={formData.bs_landmark}
                    onChange={handleChange}
                  />
                  {errors.landmark && <small className="text-danger">{errors.landmark}</small>}

                </div>

                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bs_city"
                    value={formData.bs_city}
                    onChange={handleChange}
                  />
                  {errors.businessName && <small className="text-danger">{errors.city}</small>}

                </div>

                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bs_state"
                    value={formData.bs_state}
                    onChange={handleChange}
                  />
                  {errors.businessName && <small className="text-danger">{errors.state}</small>}

                </div>
                <div className="form-group">
                  <label htmlFor="bs_image">Business Image</label>
                  <input
                    type="file"
                    className="form-control"
                    name="bs_image"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e)}
                  />

                  {errors.bs_image && <small className="text-danger">{errors.bs_image}</small>}
                </div>



                <div className="form-group">
                  <label htmlFor="bs_desc">Business Description</label>
                  <textarea
                    className="form-control"
                    id="bs_desc"
                    name="bs_desc"
                    rows="4"
                    value={formData.bs_desc}
                    onChange={handleChange}
                  />
                  {errors.bs_desc && <small className="text-danger">{errors.bs_desc}</small>}
                </div>

              </>
            )}

            {step === 2 && (
              <>
                <div className="form-group mt-1">
                  <label htmlFor="contactPerson">Contact Person</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bs_contact_person"
                    value={formData.bs_contact_person}
                    onChange={handleChange}
                    maxLength={10}
                  />
                  {errors.contactPerson && <small className="text-danger">{errors.contactPerson}</small>}

                </div>

                <div className="form-group">
                  <label htmlFor="whatsAppNumber">WhatsApp Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bs_whatsapp_number"
                    value={formData.bs_whatsapp_number}
                    onChange={handleChange}
                    maxLength={10}
                  />
                  {errors.whatsAppNumber && <small className="text-danger">{errors.whatsAppNumber}</small>}

                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="form-group mt-4">
                  <label htmlFor="businessType">Business Type</label>
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
                  {errors.businessType && <small className="text-danger">{errors.businessType}</small>}

                </div>

                <div className="form-group">
                  <label htmlFor="businessCategory">Business Category Id</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bs_business_category"
                    value={formData.bs_business_category}
                    onChange={handleChange}
                  />
                  {errors.businessCategory && <small className="text-danger">{errors.businessCategory}</small>}

                </div>
                <div className="form-group">
                  <label htmlFor="businessSubCategory">Business SubCategory</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bs_business_sub_category"
                    value={formData.bs_business_sub_category}
                    onChange={handleChange}
                  />
                  {errors.businessSubCategory && <small className="text-danger">{errors.businessSubCategory}</small>}

                </div>
              </>
            )}

            <div className="d-flex justify-content-center mt-4">
              {step > 1 && (
                <button
                  type="button"
                  className="btn btn-save  mx-2"
                  style={{ backgroundColor: "#6c757d" }}
                  onClick={handlePreviousStep}
                >
                  Previous
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  className="btn btn-save mx-2"
                  onClick={handleNextStep}
                >
                  Save and Continue
                </button>
              ) : (
                <button type="submit" className="btn btn-save mx-2">
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;