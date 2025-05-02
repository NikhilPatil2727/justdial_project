
import { WEB_API } from '../../../common/constant';
import axios from 'axios';

export const fetchFacility = async (bs_id) => {
    try {
        const response = await axios.get(`${WEB_API}/websiteFacility/fetch`, {
            params: { bs_id } 
        });
        console.log(response);
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
};
