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
          console.log("Fetched Data:", response);

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
        console.error("Error fetching offers:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOfferData();
  }, [bs_id]);

  if (loading) {
    return <p className="text-center"></p>;
  }

  if (error) {
    return <p className="text-center text-danger">Error: {error}</p>;
  }

  if (offers.length === 0) {
    return null;
}

  return (
    <section className="container">
      <div className="text-center mx-auto pb-5" style={{ maxWidth: "800px" }}>
        <h2 className="display-4 text-capitalize mb-3">Offers</h2>
      </div>
      <div
        className="offer-list"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
          justifyContent: "center",
        }}
      >
        {offers.length > 0 ? (
          offers.map((offer, index) => (
            <div
              key={index}
              className="offer-card"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "250px",
                height: "400px",
                padding: "15px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", 
                borderRadius: "10px",
                textAlign: "center",
                overflow: "hidden", 
                backgroundColor: "#fff",
                position: "relative",
              }}
            >
              <img
                src={Image1}
                alt={offer.offer_title}
                style={{
                  width: "100%",
                  height: "150px", 
                  objectFit: "cover", 
                  borderRadius: "10px 10px 0 0",
                }}
              />
              <div style={{ padding: "10px", flex: 1 }}>
                <h4 style={{ marginBottom: "5px", fontSize: "18px" }}>{offer.offer_title}</h4>
                <p style={{ marginBottom: "5px", fontSize: "14px", color: "#777" }}>
                  {offer.offer_description}
                </p>
                <p style={{ fontWeight: "bold", fontSize: "14px" }}>
                  <strong>Code:</strong> {offer.offer_code}
                </p>
                <p style={{ fontSize: "14px" }}>
                  <strong>Valid From:</strong> {new Date(offer.offer_start_date).toLocaleDateString()}
                </p>
                <p style={{ fontSize: "14px" }}>
                  <strong>Valid Till:</strong> {new Date(offer.offer_end_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No offers available.</p>
        )}
      </div>
    </section>
  );
}

export default OfferSection;
