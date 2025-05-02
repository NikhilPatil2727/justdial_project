
import { WEB_API } from '../../../common/constant';
import axios from 'axios';

export const fetchProduct = async (bs_id) => {
    try {
        const response = await axios.get(`${WEB_API}/websiteProducts/fetch`, {
            params: { bs_id }
        });
        return response;
    } catch (err) {
        console.log('Error fetching products:', err.message);
        throw err;  
    }
};

