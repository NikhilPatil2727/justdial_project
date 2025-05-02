import {WEB_API} from '../../../common/constant';
import axios from 'axios';
export const addContact = async (data) => {
    try {
      const response = await axios.post(`${WEB_API}/adminContct/create`, data);
      console.log("API response:", response.data);
      return response;
    } catch (err) {
      console.log("Error in addContact:", err.message);
      throw err;
    }
  };
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
export const fetchMap= async (bs_id) => {
  try {
      const response = await axios.get(`${WEB_API}/Map/fetch`, {
          params: { bs_id } 
      });
      return response.data;
  } catch (err) {
      console.error("Error fetching Map data:", err.message);
      return { status: false, data: [] };
  }
};

