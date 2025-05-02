import React, { useState, useEffect } from 'react';
import reviewImage from '../../../assets/profile/images/customer-img1.jpg'; // Import the image
import Profilenav from '../profilenav/Profilenav';
import { viewReviews } from "./Service";

const Reviews = () => {
    const [data, setData] = useState([]);

    const viewReviewsData = async () => {
        try {
            const response = await viewReviews();
            setData(response.data.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        viewReviewsData();
    }, []);

    return (
        <>
            <Profilenav />
            <div className="container mt-5">
                <h3 className="text-center mb-5">Reviews</h3>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-5">
                    {data.length > 0 ? (
                        data.map((review, index) => (
                            <div className="col d-flex" key={index}>
                                <div className="card crd-review shadow-sm w-100">
                                    <div className="card-wrapper">
                                        <img src={reviewImage} className="card-img-top" alt={`Review ${index + 1}`} />
                                        <div className="card-body" style={{ backgroundColor: '#f8f9fa', padding: '20px', flexGrow: 1 }}>
                                            <h6 className="card-title-one">{review.rv_name || 'Anonymous'}</h6>
                                            <p className="card-text">"{review.rv_desc}"</p>
                                            <p className="card-date" style={{ fontSize: '0.85rem', color: '#6c757d' }}>{new Date(review.rv_date_time).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stars">
                                            {'★'.repeat(review.rv_ratings)}{'☆'.repeat(5 - review.rating)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center w-100">No reviews available</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Reviews;
