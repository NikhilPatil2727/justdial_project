import {WEB_API} from "../../../common/constant";
import axios from "axios";


export const addRegistration = async (data) => {
    try {
        const response = await axios.post(`${WEB_API}/businessregistration/create` ,data);
        console.log("API Response:", response.data); 
        return response;
    } catch (error) {
        console.log("Error:", error.message);
    }
};




