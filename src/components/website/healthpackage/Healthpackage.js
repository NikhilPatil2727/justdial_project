
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchHealthpackage } from "./Service";
import { WEB_API } from "../../../common/constant";

const Healthpackage = () => {
  const [data, setData] = useState([]);
  const { bs_id } = useParams();

  const fetchHealthpackageData = async () => {
    try {
        const response = await fetchHealthpackage(bs_id);
        setData(response.data); 
    } catch (err) {
        console.error("Error fetching health packages:", err);
    }
};


  useEffect(() => {
    if (bs_id) {
      fetchHealthpackageData();
    }
  }, [bs_id]);

  if (data.length === 0) {
    return null;
}

  return (
    <div className="container-fluid feature bg-light py-5">
      <div className="container py-5">
        <div className="text-center mx-auto pb-5" style={{ maxWidth: "800px" }}>
          <h2 className="display-4 text-capitalize mb-3">Our Health Packages</h2>
        </div>
        <div className="row g-4">
          {data.length > 0 ? (
            data.map((packageItem) => (
              <div key={packageItem._id} className="col-lg-4">
                <div className="feature-item text-center border p-5 shadow-sm rounded h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div
                      className="feature-img bg-secondary text-white d-inline-flex align-items-center justify-content-center p-4 rounded-circle mb-4"
                    >
                      <i className="fas fa-heartbeat fa-3x"></i>
                    </div>
                    <div className="justify-content-between mb-3">
                      <h4 className="mb-0 text-secondary">{packageItem.hpck_name}</h4>
                    </div>
                    <span className="btn btn-primary py-2 px-4">₹{packageItem.hpck_price}</span>
                    <p className="text-muted mt-3">{packageItem.hpck_desc}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Loading Healthpackages..</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Healthpackage;

