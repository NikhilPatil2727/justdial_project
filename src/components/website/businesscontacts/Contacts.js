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
      <div id="contact-section" className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: "800px" }}>
        <h2 className="display-4 text-capitalize mb-3">Contact Us</h2>
      </div>
      <div className="container-fluid contact bg-light py-5">
        <div className="container py-5">
          <div className="row g-5 mb-5">
            {/* Contact Form */}
            <div className="col-lg-6 wow fadeInLeft" data-wow-delay="0.2s">
              <div className="text-center mx-auto pb-5" style={{ maxWidth: "800px" }}>
                <p className="text-uppercase text-secondary fs-5 mb-0">Let's Connect</p>
                <h2 className="display-4 text-capitalize mb-3">Send Your Message</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-lg-12 col-xl-6">
                    <div className="form-floating border border-secondary">
                      <input type="text" className="form-control" id="name" name="act_name" value={formData.act_name} onChange={handleInputChange} placeholder="Your Name" />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-lg-12 col-xl-6">
                    <div className="form-floating border border-secondary">
                      <input type="email" className="form-control" id="email" name="act_email" value={formData.act_email} onChange={handleInputChange} placeholder="Your Email" />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-lg-12 col-xl-6">
                    <div className="form-floating border border-secondary">
                      <input type="text" className="form-control" id="phone" name="act_mobile" value={formData.act_mobile} onChange={handleInputChange} placeholder="Your Phone" maxLength={10} />
                      <label htmlFor="phone">Your Phone</label>
                    </div>
                  </div>
                  <div className="col-lg-12 col-xl-6">
                    <div className="form-floating border border-secondary">
                      <input type="text" className="form-control" id="Subject" name="act_subject" value={formData.act_subject} onChange={handleInputChange} placeholder="Subject" />
                      <label htmlFor="Subject">Subject</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating border border-secondary">
                      <textarea className="form-control" placeholder="Leave a message here" id="message" name="act_desc" value={formData.act_desc} onChange={handleInputChange} style={{ height: "160px" }}></textarea>
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100 py-3" type="submit">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="col-lg-6 wow fadeInRight" data-wow-delay="0.4s">
              <div className="contact-map h-100 w-100">
                {contactData && contactData.bs_map_url ? (
                  <iframe
                    className="h-100 w-100"
                    style={{ height: "500px", border: 0 }}
                    src={contactData.bs_map_url}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps Location"
                  ></iframe>
                ) : (
                  <div
                    style={{
                      height: "500px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                    }}
                  >
                    <p style={{ color: "#555", fontSize: "18px", fontWeight: "500" }}>
                      No map found
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

          <div className="row g-5">
            <div className="col-xl-4 wow fadeInUp" data-wow-delay="0.2s">
              <div className="d-inline-flex bg-white w-100 border border-secondary p-4">
                <i className="fas fa-map-marker-alt fa-2x text-secondary me-4"></i>
                <div>
                  <h4>Address</h4>
                  <p className="mb-0">
                    {contactData ? `${contactData.bs_area || ""}, ${contactData.bs_city || ""}, ${contactData.bs_state || ""}` : "Loading address..."}
                  </p>
                </div>

              </div>
            </div>
            <div className="col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.4s">
              <div className="d-inline-flex bg-white w-100 border border-secondary p-4">
                <i className="fas fa-envelope fa-2x text-secondary me-4"></i>
                <div>
                  <h4>Mail Us</h4>
                  <p className="mb-0">{contactData ? contactData.bs_email : "Loading email..."}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.6s">
              <div className="d-inline-flex bg-white w-100 border border-secondary p-4">
                <i className="fa fa-phone-alt fa-2x text-secondary me-4"></i>
                <div>
                  <h4>Telephone</h4>
                  <p className="mb-0">{contactData ? contactData.bs_business_phone : "Loading phone number..."}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
