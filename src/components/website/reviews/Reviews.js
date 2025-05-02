import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchReview, fetchUserById, submitReviewToBackend } from "./Service";
import { Modal, Button, Form } from 'react-bootstrap';

const Reviews = () => {
  const { bs_id, us_id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  const [newReview, setNewReview] = useState({
    rv_name: '', 
    rv_date_time: '',
    rv_desc: '',
    rv_ratings: 0
  });
  const [userName, setUserName] = useState(localStorage.getItem('userName') || 'Anonymous'); 

  // Fetch reviews from the backend
  const fetchReviewData = async () => {
    try {
      const response = await fetchReview(bs_id);
      if (response?.data?.status) {
        setData(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Error fetching reviews.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch user data and store in localStorage
  const fetchUserData = async () => {
    try {
      if (us_id) {
        const userResponse = await fetchUserById(us_id);
        if (userResponse?.data?.name) {
          setUserName(userResponse.data.name);
          localStorage.setItem('userName', userResponse.data.name);
        }
      }
    } catch (err) {
      console.error("Error fetching user name:", err);
      setUserName('Anonymous'); 
    }
  };

  useEffect(() => {
    if (us_id && !localStorage.getItem('userName')) {
      fetchUserData(); 
    }
    if (bs_id) {
      fetchReviewData();
    }
  }, [bs_id, us_id]);

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newReviewData = { 
      ...newReview, 
      rv_date_time: new Date() 
    };

    try {
      await submitReviewToBackend(bs_id, newReviewData); 
      setData([...data, newReviewData]);
      setShowModal(false);
      setNewReview({
        rv_name: userName,
        rv_date_time: '',
        rv_desc: '',
        rv_ratings: 0
      });
    } catch (err) {
      console.error("Error submitting review:", err);
      setError("Error submitting review.");
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  if (loading) {
    return <p></p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  if (data.length === 0) {
    return <p className="text-center"></p>;
  }

  return (
    <div id="reviews-section" className="container py-5">
      <div className="text-center mx-auto pb-4" style={{ maxWidth: "800px" }}>
        <h2 className="display-4 text-capitalize mb-3">Our Clients' Reviews</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>Add Review</Button>
      </div>
      <div className="row">
        {data.map((review, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">
            <div className="card shadow h-100 border-0">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <i
                    className="bi bi-person-circle fs-1 text-primary me-3"
                    style={{ fontSize: "2rem" }}
                  ></i>
                  <div>
                    <h5 className="mb-0">{review.rv_name || "Anonymous"}</h5>
                    <small className="text-muted">
                      {new Date(review.rv_date_time).toDateString()}
                    </small>
                  </div>
                </div>
                <p className="card-text">{review.rv_desc || "No review available."}</p>
                <p className="text-warning">⭐ {review.rv_ratings}/10</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for adding a review */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="rv_name"
                value={userName}
                onChange={handleInputChange}
                readOnly 
              />
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="rv_date_time"
                value={newReview.rv_date_time ? new Date(newReview.rv_date_time).toISOString().split('T')[0] : ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="rv_desc"
                value={newReview.rv_desc}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </Form.Group>
            <Form.Group controlId="formRatings">
              <Form.Label>Ratings</Form.Label>
              <Form.Control
                type="number"
                name="rv_ratings"
                value={newReview.rv_ratings}
                onChange={handleInputChange}
                min="0"
                max="10"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">Submit Review</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Reviews;
