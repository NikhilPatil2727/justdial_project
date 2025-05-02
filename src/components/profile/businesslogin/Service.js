import { WEB_API } from "../../../common/constant";
import axios from "axios";
import { getToken } from '../getbusinesstoken/index';

export const businessLogin = async (data) => {
    try {
        const token = await getToken(); 

        const response = await axios.post(
            `${WEB_API}/businessregistration/businessLogin`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );

        return response;
    } catch (error) {
        console.log(error.message);
    }
};
