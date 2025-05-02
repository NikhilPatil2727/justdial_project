 
import { WEB_API } from '../../../common/constant';
import axios from 'axios';

export const fetchVideos = async (bs_id) => {
    try {
        const response = await axios.get(`${WEB_API}/websiteVideos/fetch`, {
            params: { bs_id }
        });
        return response;
    } catch (err) {
        console.log(err.message);
    }
};
