import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchHealthpackage } from "./Service";

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
    <div className="container-fluid py-5" style={{ background: '#f8f9fa' }}>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3" style={{ color: '#000000' }}>
            Our Health Packages
          </h2>
          <p className="text-muted">Comprehensive healthcare solutions tailored for you</p>
        </div>
        
        <div className="row g-4">
          {data.length > 0 ? (
            data.map((packageItem) => (
              <div key={packageItem._id} className="col-12 col-md-6 col-lg-4">
                <div 
                  className="card h-100 border-0 shadow-hover transition-all"
                  style={{
                    borderRadius: '15px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                >
                  <div className="card-body p-4">
                    <div 
                      className="icon-wrapper mx-auto mb-4"
                      style={{
                        width: '80px',
                        height: '80px',
                        background: '#7562d8',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <i 
                        className="fas fa-heartbeat fa-2x text-white"
                        style={{ transition: 'all 0.3s ease' }}
                      ></i>
                    </div>
                    
                    <h3 
                      className="text-center mb-3 fw-bold"
                      style={{ color: '#000000' }}
                    >
                      {packageItem.hpck_name}
                    </h3>
                    
                    <div className="price-tag text-center mb-4">
                      <span 
                        className="badge rounded-pill px-4 py-2"
                        style={{ 
                          background: '#7562d8',
                          color: 'white',
                          fontSize: '1.2rem'
                        }}
                      >
                        ₹{packageItem.hpck_price}
                      </span>
                    </div>
                    
                    <p 
                      className="text-center text-muted mb-0"
                      style={{ lineHeight: '1.6' }}
                    >
                      {packageItem.hpck_desc}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading Health Packages...</p>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          .shadow-hover {
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          }
          
          .transition-all {
            transition: all 0.3s ease;
          }
          
          .card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 35px rgba(117,98,216,0.15);
          }
          
          .card:hover .icon-wrapper {
            transform: scale(1.1);
            background: #6351d0;
          }
          
          .card:hover .fa-heartbeat {
            transform: scale(1.1);
          }
          
          .price-tag .badge {
            transition: all 0.3s ease;
          }
          
          .card:hover .price-tag .badge {
            background: #6351d0 !important;
          }
          
          @media (max-width: 768px) {
            .card {
              margin-bottom: 1.5rem;
            }
            
            .display-5 {
              font-size: 2.5rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Healthpackage;