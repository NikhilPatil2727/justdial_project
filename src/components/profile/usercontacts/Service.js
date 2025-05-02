import { WEB_API } from '../../../common/constant';
import axios from 'axios';

export const fetchContacts = async (bs_id) => {
    try {
        const response = await axios.get(`${WEB_API}/usercontacts/fetch`, {
            params: { bs_id } 
        });
        return response.data;
    } catch (err) {
        console.error("Error fetching Contact data:", err.message);
        return { status: false, data: [] };
    }
};

