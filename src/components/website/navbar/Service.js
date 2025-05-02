import { WEB_API } from "../../../common/constant";
import axios from "axios";

export const fetchContact = async (bs_id) => {
  try {
    const response = await axios.get(`${WEB_API}/businessregistration/fetch`, {
      params: { bs_id }
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching Contact data:", err.message);
    return { status: false, data: [] };
  }
};
export const fetchTimings = async (bs_id) => {
  try {
    const response = await axios.get(`${WEB_API}/websiteTimings/fetch`, {
      params: { bs_id }
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching timings:", error.message);
  }
};
export const fetchSociallink = async (bs_id) => {
  try {
    const response = await axios.get(`${WEB_API}/websiteSociallinks/fetch`, {
      params: { bs_id }
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching social links:", error.message);
  }
};
