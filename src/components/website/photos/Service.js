import { WEB_API } from '../../../common/constant';
import axios from 'axios';

export const fetchPhoto = async (bs_id) => {
    try {
        const response = await axios.get(`${WEB_API}/websitePhotos/fetch`, {
            params: { bs_id }  
        });
        console.log("api :",response)

        return response;
    } catch (err) {
        console.log(err.message);
    }
};
