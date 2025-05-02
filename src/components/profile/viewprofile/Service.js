import { WEB_API } from "../../../common/constant";
import axios from "axios";
import { getToken } from "../getbusinesstoken/index";

export const fetchViewProfile = async (bs_id) => {
    try {
        const token = await getToken(); 

        const response = await axios.get(`${WEB_API}/viewProfile/getProfileById`, {
            params: { bs_id },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("API response:", response);
        return response;
    } catch (error) {
        console.log("Error:", error.message);
    }
};


