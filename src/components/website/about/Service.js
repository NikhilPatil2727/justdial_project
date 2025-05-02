import { WEB_API } from '../../../common/constant';
import axios from 'axios';

// export const fetchAbout = async (bs_id) => {
//     try {
//         const response = await axios.get(`${WEB_API}/websiteAbout/fetch`, {
//             params: { bs_id }
//         });
//         return response.data;
//     } catch (err) {
//         console.error(err.message);
//     }
// };
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
export const fetchKeyfeature = async (bs_id) => {
    try {
        console.log("Fetching key features for bs_id:", bs_id);
        const response = await axios.get(`${WEB_API}/websiteKeyfeatures/fetch`, {
            params: { bs_id } 
        });
        console.log("API Response:", response.data);
        return response;
    } catch (err) {
        console.error("Error fetching key features:", err.message);
        throw err;
    }
};


