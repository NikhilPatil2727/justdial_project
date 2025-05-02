  
import { WEB_API } from '../../../common/constant';
import axios from 'axios';

export const fetchPricelist = async (data) => {
    try {
        const response = await axios.get(`${WEB_API}/websitePricelist/fetch`, {
            params: { bs_id: data.bs_id }   
        });
        return response;
    } catch (err) {
        console.log(err.message);
    }
};
