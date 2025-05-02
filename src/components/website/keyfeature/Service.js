import { WEB_API } from "../../../common/constant";
import axios from "axios";

export const fetchKeyfeature = async (bs_id) => {
    try {
        console.log("Fetching key features for bs_id:", bs_id);
        const response = await axios.get(`${WEB_API}/websiteKeyfeatures/fetch`, {
            params: { bs_id } 
        });
        console.log("API Response:", response.data);
        return response;
    } catch (err) {
        console.error("Error fetching key features:", err.message);
        throw err;
    }
};
