import {WEB_API} from "../../../common/constant";
import axios from "axios";






export const updateContacts = async (data) => {
    try{
        const response=await axios.put(`${WEB_API}/businessregistration/update` ,data);
        console.log('Api resonse:', response.data)
        return response;
    }
    catch(error){
        console.log(error.message);
    }
  
};



export const viewContacts = async (id) => {
    try {
        const response = await axios.get(`${WEB_API}/businessregistration/view/${id}`);
        console.log("businessregistration:",response)
        return response;
    } catch (error) {
        console.error("Error fetching contact details:", error);
        throw error;
    }
};
