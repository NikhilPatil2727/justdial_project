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
        const fullVideoPath = `http://localhost:3001${videoPath}`; 
        setVideoUrl(fullVideoPath);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    if (videos.length === 0 && !loading) {
        return <p></p>;
    }
    
    return (
        <div className="container text-center" style={{ paddingBottom: "50px" }}>
            <h2 className="display-4 text-capitalize mb-3">Videos</h2>
            {loading ? (
                <p>Loading videos...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="row">
                    {videos.map((video, index) => (
                        <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
                            <div className="video-card position-relative">
                                <img
                                    src={Image4}
                                    className="w-100 rounded"
                                    alt="Business Video Thumbnail"
                                    style={{ maxHeight: "300px", cursor: "pointer" }}
                                    onClick={() => openModal(video.vd_path)}
                                />
                                <button
                                    className="play-button"
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        fontSize: "50px",
                                        color: "white",
                                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                                        border: "none",
                                        padding: "15px",
                                        borderRadius: "50%",
                                        cursor: "pointer",
                                        transition: "background-color 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(0, 0, 0, 0.8)")}
                                    onMouseLeave={(e) => (e.target.style.backgroundColor = "rgba(0, 0, 0, 0.5)")}
                                    onClick={() => openModal(video.vd_path)}
                                >
                                    <i className="fa fa-play-circle"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Business Video</h5>
                                <button type="button" className="close" onClick={closeModal}>&times;</button>
                            </div>
                            <div className="modal-body">
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
