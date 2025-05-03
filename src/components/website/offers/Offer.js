import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import { fetchOffers } from "./Service";
import Image1 from "../../../assets/website/img/pr.jpg";

function OfferSection() {
  const { bs_id } = useParams();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOfferData = async () => {
      try {
        if (bs_id) {
          const response = await fetchOffers(bs_id); 
          const formattedOffers = response.map((offer) => ({
            offer_title: offer.offer_title || "No Title",
            offer_description: offer.offer_description || "No Description",
            offer_discount_percentage: offer.offer_discount_percentage || 0,
            offer_code: offer.offer_code || "N/A",
            offer_start_date: offer.offer_start_date || new Date().toISOString(),
            offer_end_date: offer.offer_end_date || new Date().toISOString(),
            bs_id: offer.bs_id || "N/A",
          }));
          setOffers(formattedOffers);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOfferData();
  }, [bs_id]);

  if (loading) return <p className="text-center"></p>;
  if (error) return <p className="text-center text-danger">Error: {error}</p>;
  if (offers.length === 0) return null;

  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <h2 className="display-4 text-capitalize mb-3" style={{ color: '#000000' }}>Offers</h2>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4">
        {offers.map((offer, index) => (
          <div className="col" key={index}>
            <div className="offer-card-custom card h-100 border-0 shadow-md">
              <div className="card-img-top offer-img-wrapper">
                <img
                  src={Image1}
                  alt={offer.offer_title}
                  className="offer-img"
                />
              </div>
              <div className="card-body text-center d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title text-capitalize" style={{ color: '#7562d8',fontSize:'2rem' }}>{offer.offer_title}</h5>
                  <p className="card-text text-muted" style={{ minHeight: '40px' }}>
                    {offer.offer_description}
                  </p>
                </div>
                <div>
                  <p className="mb-1"style={{fontSize:'1rem' }}><strong>Code:</strong> <span style={{ color: '#7562d8' }}>{offer.offer_code}</span></p>
                  <p className="mb-1"style={{fontSize:'1rem' }}><strong>Valid From:</strong> {new Date(offer.offer_start_date).toLocaleDateString()}</p>
                  <p className="mb-0"style={{fontSize:'1rem' }}><strong>Valid Till:</strong> {new Date(offer.offer_end_date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Embedded CSS */}
      <style>{`
        .offer-card-custom {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 0px;
          border-radius: 12px;
        }

        .offer-card-custom:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 20px rgba(117, 98, 216, 0.2);
        }

        .offer-img-wrapper {
          position: relative;
          height: 200px;
         
          overflow: hidden;
          background: transparent;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
        }

        .offer-img {
          height: 100%;
          width: 56%;
          margin-top:2rem;
         margin-left:5rem;
          object-fit: cover;
          transition: transform 0.4s ease-in-out;
          animation: none;
        }

        .offer-card-custom:hover .offer-img {
          transform: scale(1.05) rotate(-1deg);
        }
      `}</style>
    </section>
  );
}

export default OfferSection;