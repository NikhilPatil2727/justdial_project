import { WEB_API } from '../../../common/constant';
import axios from 'axios';

export const fetchOffers = async (bs_id) => {
  try {
    const response = await axios.get(`${WEB_API}/websiteOffers/fetch`, {
      params: { bs_id } 
    });
    
    return response.data?.data || response.data || [];
  } catch (err) {
    console.error("Error fetching offers:", err);
    return [];
  }
};


export const createOffers = async (data) => {
  try {
    const response = await axios.post(`${WEB_API}/websiteOffers/add`, data);
    return response.data;
  } catch (err) {
    console.error("Error creating offer:", err);
    return null;
  }
};
