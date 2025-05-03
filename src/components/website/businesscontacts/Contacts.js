import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addContact, fetchContact, fetchMap } from "./Service";

const Contacts = () => {
  const { bs_id } = useParams();

  const [formData, setFormData] = useState({
    act_name: "",
    act_email: "",
    act_mobile: "",
    act_desc: "",
    act_subject: "",
    act_address: "",
  });

  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetchContact(bs_id);
        if (response?.data?.length > 0) {
          setContactData(response.data[0]);
        } else {
          setContactData({});
        }
      } catch (err) {
        console.error("Error fetching contact data:", err);
      }
    };

    if (bs_id) {
      fetchContactData();
    }
  }, [bs_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactRes = await fetchContact(bs_id);
        const mapRes = await fetchMap(bs_id);

        const contactInfo = contactRes?.data?.[0] || {};
        const mapInfo = mapRes?.data?.[0] || {};
        const combinedData = {
          ...contactInfo,
          bs_map_url: mapInfo.map_address ? JSON.parse(mapInfo.map_address) : null,
        };
        setContactData(combinedData);
      } catch (err) {
        console.error("Error fetching contact or map data:", err);
      }
    };

    if (bs_id) {
      fetchData();
    }
  }, [bs_id]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addContact(formData);
      if (response.status === 200) {
        alert("Message sent successfully!");
        setFormData({
          act_name: "",
          act_email: "",
          act_mobile: "",
          act_desc: "",
          act_subject: "",
          act_address: "",
        });
      }
    } catch (error) {
      console.error("Error sending contact details:", error);
      alert("Failed to send message. Try again!");
    }
  };

  return (
    <>
  <div className="container-fluid py-5" style={{ backgroundColor: "#f8f8ff" }}>
  <div className="container">
  
  <div className="text-center mb-5">
    <h2 className="fw-bold" style={{ color: "#000000", fontSize:"55px"}}>Contact Us</h2>
    <hr style={{ width: "80px", borderTop: "3px solid #801313", margin: "0 auto" }} />
    <p className="text-muted mt-2">
      We'd love to hear from you. Reach out with any questions or feedback!
    </p>
  </div>
  



    <div className="row g-4">
      {/* Left Column: Form Only */}
      <div className="col-md-6">
  <div className="bg-white p-4 rounded shadow border border-light h-100">
    <h4 className="text-center fw-bold" style={{ color: "#7562d8" }}>
      CONTACT US
    </h4>
    <hr style={{ width: "60px", border: "2px solid #752e2e", margin: "0 auto 20px" }} />

    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="First Name *"
            name="act_name"
            value={formData.act_name}
            onChange={handleInputChange}
            style={{ height: "78px", fontSize:"20px"}}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Last Name *"
            name="act_lastname"
            value={formData.act_lastname || ""}
            onChange={handleInputChange}
            style={{ height: "78px", fontSize:"20px"}}
          />
        </div>
        <div className="col-12">
          <input
            type="email"
            className="form-control"
            placeholder="Email *"
            name="act_email"
            value={formData.act_email}
            onChange={handleInputChange}
            style={{ height: "78px", fontSize:"20px"}}
          />
        </div>
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            placeholder="Mobile Number *"
            name="act_mobile"
            value={formData.act_mobile || ""}
            onChange={handleInputChange}
            style={{ height: "78px", fontSize:"20px"}}
          />
        </div>
        <div className="col-12">
        <textarea
  className="form-control p-2"
  rows="3"
  placeholder="Subject *"
  name="act_subject"
  value={formData.act_subject || ""}
  onChange={handleInputChange}
  style={{ fontSize:"20px",resize: "none"}}
></textarea>
</div>
<div className="col-12">
  <textarea
    className="form-control"
    rows="5"
    placeholder="Comment or Message *"
    name="act_desc"
    value={formData.act_desc}
    onChange={handleInputChange}
    style={{ height: "140px", fontSize:"20px",resize: "none"}}
  ></textarea>
</div>

        <div className="col-12 text-start">
          <button type="submit" className="btn px-4 py-2" style={{fontSize: "20px", backgroundColor: "#7562d8", color: "#fff"}}>
            Submit <i className="fas fa-paper-plane ms-2"></i>
          </button>
        </div>
      </div>
    </form>
  </div>
</div>


        {/* Right Column: Company Info + Map */}
        <div className="col-md-6">
          <div className="bg-white p-4 rounded shadow border border-light h-100 d-flex flex-column">
            <h4 className="fw-bold text-center" style={{ color: "#7562d8" }}>
              ZOTONO
            </h4>
            <hr style={{ width: "60px", border: "2px solid #801313", margin: "0 auto 20px" }} />

            <div className="row g-3">
  <div className="col-12">
    <div className="p-3 border rounded d-flex align-items-center" style={{ backgroundColor: "#fff5f2", borderColor: "#ff7f50" }}>
      <i className="fa fa-phone me-2 text-dark"></i>
      <span>+91 96208 67855</span>
    </div>
  </div>

  <div className="col-12">
    <div className="p-3 border rounded d-flex align-items-center" style={{ backgroundColor: "#fff5f2", borderColor: "#ff7f50" }}>
      <i className="fa fa-envelope me-2 text-dark"></i>
      <span>ajkplusone2004@gmail.com</span>
    </div>
  </div>

  <div className="col-12 mb-4">
    <div className="p-3 border rounded d-flex align-items-start" style={{ backgroundColor: "#fff5f2", borderColor: "#ff7f50" }}>
      <i className="fa fa-map-marker-alt me-2 text-dark mt-1"></i>
      <span>
        XXXXXXXXXXXX<br />
        Plot No:25-26, Survey No:- 323,<br />
        Udyambag,<br />
        Belgaum-590008,<br />
        Karnataka, India
      </span>
    </div>
  </div>
</div>

            {contactData && contactData.bs_map_url && (
              <iframe
                className="w-100 mt-auto"
                style={{ height: "250px", border: 0, borderRadius: "10px" }}
                src={contactData.bs_map_url}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
</>
  
  );
  
  
};

export default Contacts;
