  
import { WEB_API } from '../../../common/constant';
import axios from 'axios';

export const fetchLabtest = async (bs_id) => {
    try {
        console.log("Fetching lab tests for bs_id:", bs_id);
        const response = await axios.get(`${WEB_API}/websiteLabtest/fetch`, {
            params: { bs_id }
        });
        console.log("API Response:", response.data);
        return response;
    } catch (err) {
        console.error("Error fetching labtest:", err.message);
        throw err;
    }
};
