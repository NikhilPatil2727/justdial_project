import { useState, useEffect } from "react";
import { fetchServices } from "./Service";
import { WEB_API } from "../../../common/constant";
import { useParams } from "react-router-dom";
import service1 from "../../../assets/website/img/service-1.jpg";
import "../../../assets/website/css/bootstrap.min.css";

const Services = () => {
  const { bs_id } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch service data
  const fetchServiceData = async () => {
    try {
      const response = await fetchServices(bs_id);
      if (response?.data?.data) {
        setServices(response.data.data);
      } else {
        setError("No services found");
      }
    } catch (err) {
      setError("Failed to fetch services");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bs_id) fetchServiceData();
  }, [bs_id]);

  if (services.length === 0) {
    return null;
  }

  return (
    <>
      <div id="service-section" className="bg-light py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold "style={{color:"#000000"}}>
              Our Service Is <span style={{color:"#000000"}}>Creative</span>, &{" "}
              <span style={{color:"#000000"}}>Decent</span>
            </h2>
          </div>

          <div className="row g-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="col-lg-4 col-md-6 col-sm-12 border-primary border-2 rounded-3">
                <div className="card h-100 shadow-sm border-0">
                  <div
                    className="overflow-hidden"
                    style={{
                      height: "250px",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}>
                    <img
                      src={service1}
                      alt={service.sv_name || "Service"}
                      className=" img-fluid transition "
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                  </div>

                  <div className="card-body text-center">
                    <h5
                      className="card-title text-dark fs-4 fw-bold text-capitalize">
                      {service.sv_name || "Service Name"}
                    </h5>
                    <p className="card-text fs-5 fw-semibold text-muted text-capitalize">
                      {service.sv_desc || "Description not available"}
                    </p>

                    <span
                      className="btn btn-outline-primary mt-3 rounded-pill py-2"
                      style={{ fontSize: "1.2rem" }}>
                      ₹{service.sv_price || "N/A"}
                    </span>
                  </div>

                  <div className="card-footer bg-white d-flex justify-content-between align-items-center px-3 py-2 border-top">
                    <h6
                      className="mb-0 text-dark text-capitalize fw-semibold"
                      style={{
                        transition: "font-size 0.3s ease",
                        fontSize: "1.1rem",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.fontSize = "1.3rem";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.fontSize = "1.1rem";
                      }}>
                      {service.sv_name || "Service Name"}
                    </h6>
                    <div
                      className=" text-white rounded-circle p-3"
                      style={{ background: "#7562d8" }}>
                      <i
                        className={`fas ${service.icon || "fa-cogs"}`}
                        style={{ fontSize: "20px" }}></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
