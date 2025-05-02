import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchKeyfeature } from "./Service"; 

const Keyfeature = () => {
  const { bs_id } = useParams(); 
  const [likeFeatures, setLikeFeatures] = useState([]);
  const [dislikeFeatures, setDislikeFeatures] = useState([]);

  const fetchKeyfeatureData = async () => {
    try {
      const response = await fetchKeyfeature(bs_id);
      const features = response.data.data;

      const likes = features
        .filter((feature) => feature.kf_title?.toLowerCase() === "like")
        .map((feature) => feature.kf_description);

      const dislikes = features
        .filter((feature) => feature.kf_title?.toLowerCase() === "dislike")
        .map((feature) => feature.kf_description);

      setLikeFeatures(likes);
      setDislikeFeatures(dislikes);
    } catch (err) {
      console.error("Error fetching key features:", err);
    }
  };

  useEffect(() => {
    if (bs_id) {
      fetchKeyfeatureData();
    }
  }, [bs_id]);

  if (likeFeatures.length === 0 && dislikeFeatures.length === 0) {
    return <p className="text-center"></p>;
  }

  return (
    <div className="container-fluid counter py-5">
      <div className="container py-5">
        <div className="text-center mx-auto pb-5" style={{ maxWidth: "600px" }}>
          <h2 className="display-4 text-capitalize text-secondary mb-3">Key Features</h2>
        </div>
        <div className="row g-4">
          {/* Likes Section */}
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.2s">
            <div className="counter-box w-100">
              <div className="counter-item">
                <div className="counter-item-style"></div>
                <div className="counter-item-inner p-5">
                  <i className="fas fa-thumbs-up fa-4x text-secondary"></i>
                  <h4 className="text-dark my-4">Likes</h4>
                  <ul className="mt-4 text-secondary text-side">
                    {likeFeatures.length > 0 ? (
                      likeFeatures.map((desc, index) => <li key={index}>{desc}</li>)
                    ) : (
                      <li className="text-danger">Not found</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Dislikes Section */}
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.4s">
            <div className="counter-box w-100">
              <div className="counter-item">
                <div className="counter-item-style"></div>
                <div className="counter-item-inner p-5">
                  <i className="fas fa-thumbs-down fa-4x text-secondary"></i>
                  <h4 className="text-dark my-4">Dislikes</h4>
                  <ul className="mt-4 text-secondary text-side">
                    {dislikeFeatures.length > 0 ? (
                      dislikeFeatures.map((desc, index) => <li key={index}>{desc}</li>)
                    ) : (
                      <li className="text-danger">Not found</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Keyfeature;
