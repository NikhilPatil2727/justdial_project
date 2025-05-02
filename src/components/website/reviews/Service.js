import { WEB_API } from '../../../common/constant';
import axios from 'axios';

export const fetchReview = async (bs_id) => {
  try {
    console.log("Fetching reviews for bs_id:", bs_id);
    const response = await axios.get(`${WEB_API}/websiteReviews/fetch`, {
      params: { bs_id }, 
    });
    console.log("API Response:", response.data);
    return response;
  } catch (err) {
    console.error("Error fetching Review:", err.message);
    throw err;
  }
};


export const fetchUserById = async (us_id) => {
  try {
    const response = await axios.get(`${WEB_API}/registration/userlogin`, {
      params: { us_id }
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching user details:", err.message);
    throw new Error("Error fetching user details.");
  }
};

export const submitReviewToBackend = async (bs_id, reviewData) => {
  try {
    const response = await axios.post(`${WEB_API}/websiteReviews/create`, {
      bs_id,
      ...reviewData
    });

    return response.data;
  } catch (err) {
    console.error("Error submitting review:", err.message);
    throw new Error("Error submitting review to the backend.");
  }
};
