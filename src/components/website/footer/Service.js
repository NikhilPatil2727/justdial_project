import { WEB_API } from '../../../common/constant';
import axios from 'axios';

export const fetchAbout = async (bs_id) => {
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
export const fetchContact = async (_id) => {
    try {
        const response = await axios.get(`${WEB_API}/businessregistration/fetch`, {
            params: { _id } 
        });
        return response.data;
    } catch (err) {
        console.error("Error fetching Contact data:", err.message);
        return { status: false, data: [] };
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
        return { status: false, data: [] }; 
    }
};
