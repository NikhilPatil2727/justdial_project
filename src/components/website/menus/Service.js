import { WEB_API } from '../../../common/constant';
import axios from 'axios';

export const fetchMenu = async (bs_id) => {
    try {
        const response = await axios.get(`${WEB_API}/websiteMenus/fetch`, {
            params: { bs_id } 
        });
        return response;
    } catch (err) {
        console.log('Error fetching menu:', err.message);
        throw err;
    }
};
