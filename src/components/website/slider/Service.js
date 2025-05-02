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