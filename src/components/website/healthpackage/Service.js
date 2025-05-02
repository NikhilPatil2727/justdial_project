
import { WEB_API } from "../../../common/constant";
import axios from "axios";

export const fetchHealthpackage = async (bs_id) => {
    try {
        const response = await axios.get(`${WEB_API}/websiteHealthpackage/fetch/`, {
            params: { bs_id }
        });
        return response.data; 
    } catch (err) {
        console.error("Error fetching Healthpackage:", err.message);
        throw new Error("Failed to fetch Healthpackage");
    }
};


