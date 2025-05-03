import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image4 from "../../../assets/website/img/p4.jpg";
import { fetchVideos } from "./Service";

const Videos = () => {
  const { bs_id } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    if (bs_id) {
      fetchVideosData();
    }
  }, [bs_id]);

  const fetchVideosData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchVideos(bs_id);
      const result = response?.data;
      if (result?.status && Array.isArray(result.data)) {
        setVideos(result.data);
      } else {
        setError("Invalid response format");
      }
    } catch (error) {
      setError("Error fetching videos");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (videoPath) => {
    const fullVideoPath =` http://localhost:3001${videoPath}`;
    setVideoUrl(fullVideoPath);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (videos.length === 0 && !loading) {
    return <p className="text-center text-muted">No videos available.</p>;
  }

  return (
    <div className="container py-5 mb-5">
    <h2 className="text-center mb-5 fw-bold text-black">Business Videos</h2>
  
    <style>
      {`
        .video-card {
          color: white;
          height: 210px;
          overflow: hidden;
          margin-bottom: 10px;
          transition: transform 0.3s ease;
          border-radius:50px;
        }
  
        .video-card:hover {
          transform: translateY(-5px);
        }
  
        .video-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          margin-top: 0px;
          border-radius: 8px;
        }
  
        .play-btn {
          width: 60px;
          height: 60px;
          font-size: 24px;
          transition: transform 0.3s ease, background-color 0.3s ease;
        }
  
        .play-btn:hover {
          transform: scale(1.1);
          background-color:rgb(113, 95, 195);
        }
      `}
    </style>
  
    {loading ? (
      <p className="text-center text-white">Loading videos...</p>
    ) : error ? (
      <p className="text-danger text-center">{error}</p>
    ) : (
      <div className="row">
        {videos.map((video, index) => (
          <div key={index} className="col-12 col-sm-6 col-lg-4 col-xl-3">
            <div className="card shadow-sm border-0 video-card" style={{ cursor: "pointer" }}>
              <div className="position-relative">
                <img
                  src={Image4}
                  className="video-img"
                  alt="Business Video"
                  onClick={() => openModal(video.vd_path)}
                />
                <button
                  className="position-absolute start-50 translate-middle btn btn-dark rounded-circle play-btn"
                  style={{ top: "55%" }}
                  onClick={() => openModal(video.vd_path)}
                >
                  <i className="fa fa-play text-white"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  
    {showModal && (
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title">Business Video</h5>
              <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
            </div>
            <div className="modal-body p-0">
              <video width="100%" height="auto" controls>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  
  );
};

export default Videos;