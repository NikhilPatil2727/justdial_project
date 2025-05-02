
import { WEB_API } from '../../../common/constant';
import axios from 'axios';

export const fetchServices = async (bs_id) => {
    try {
        const response = await axios.get(`${WEB_API}/websiteServices/fetch/`,{
          params: { bs_id }
        });
        return response;
    } catch (err) {
        console.log('Error fetching products:', err.message);
        throw err;  
    }
};
