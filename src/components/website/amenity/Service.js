
import { WEB_API } from '../../../common/constant';
import axios from 'axios';

export const fetchAmenity = async (bs_id) => {
    try {
        const response = await axios.get(`${WEB_API}/websiteAmenities/fetch`, {
            params: { bs_id }
        });
        return response.data;
    } catch (err) {
        console.error("Error fetching amenities:", err.message);
        throw new Error("Failed to fetch amenities");
    }
};
