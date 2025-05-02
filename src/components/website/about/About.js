import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { WEB_API } from "../../../common/constant";
import { fetchAbout } from "./Service";
import { fetchKeyfeature } from "./Service";

const About = () => {
    const { bs_id } = useParams();
    const [data, setData] = useState(null);
    const [likeFeatures, setLikeFeatures] = useState([]);
    const [dislikeFeatures, setDislikeFeatures] = useState([]);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await fetchAbout(bs_id);
                if (response?.data?.length > 0) {
                    setData(response.data[0]);
                } else {
                    setData({});
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        if (bs_id) {
            fetchAboutData();
        }
    }, [bs_id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const aboutResponse = await fetchAbout(bs_id);
                if (aboutResponse?.data?.length > 0) {
                    setData(aboutResponse.data[0]);
                } else {
                    setData({});
                }

                const keyFeatureResponse = await fetchKeyfeature(bs_id);
                const features = keyFeatureResponse.data.data || [];

                const likes = features
                    .filter((f) => f.kf_title?.toLowerCase() === "like")
                    .map((f) => f.kf_description);

                const dislikes = features
                    .filter((f) => f.kf_title?.toLowerCase() === "dislike")
                    .map((f) => f.kf_description);

                setLikeFeatures(likes);
                setDislikeFeatures(dislikes);
            } catch (err) {
                console.error("Error fetching about or key features:", err);
            }
        };

        if (bs_id) {
            fetchData();
        }
    }, [bs_id]);

    if (!data || Object.keys(data).length === 0) {
        return null;
    }

    const {
        bs_business_name = "No Title Available",
        bs_desc = "No Description Available",
    } = data;

    return (
        <div id="about-section" className="container-fluid about py-5">
            <div className="container py-5">
                <div className="row g-5 align-items-center">
                    <div className="col-xl-6 wow fadeInLeft" data-wow-delay="0.1s">
                        <div className="about-item-image d-flex justify-content-center align-items-center">
                            <img
                                src={data?.bs_image ? `${WEB_API}${data.bs_image}` : ""}
                                className="img-fluid rounded w-75"
                                alt="Business Image"
                                onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
                                }}
                            />
                        </div>
                    </div>


                    <div className="col-xl-6 wow fadeInRight" data-wow-delay="0.1s">
                        <div className="about-item-content">
                            <p className="text-uppercase text-secondary fs-5 mb-0">BUSINESS DETAILS</p>
                            <h2 className="display-4 text-capitalize mb-3">{bs_business_name}</h2>
                            <p className="mb-4 fs-5">{bs_desc}</p>

                            <div className="row gy-0 gx-4 justify-content-between pb-4">
                                <div className="col-lg-6">
                                    <h5 className="text-secondary mb-2">
                                        <i className="fas fa-thumbs-up me-2"></i>Likes
                                    </h5>
                                    <ul className="list-unstyled text-dark">
                                        {likeFeatures.length > 0 ? (
                                            likeFeatures.map((item, index) => (
                                                <li key={index}>
                                                    <i className="fas fa-check text-success me-2"></i>{item}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-muted">Not found</li>
                                        )}
                                    </ul>
                                </div>

                                <div className="col-lg-6">
                                    <h5 className="text-secondary mb-2">
                                        <i className="fas fa-thumbs-down me-2"></i>Dislikes
                                    </h5>
                                    <ul className="list-unstyled text-dark">
                                        {dislikeFeatures.length > 0 ? (
                                            dislikeFeatures.map((item, index) => (
                                                <li key={index}>
                                                    <i className="fas fa-times text-danger me-2"></i>{item}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-muted">Not found</li>
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

export default About;
