import {WEB_API} from "../../../common/constant";
import axios from "axios";

export const searchBusinesses = async (searchText) => {
    try{
        const response=await axios.get(`${WEB_API}/businessregistration/searchBusinesses/${searchText}`);
        console.log("API response seachhh:",response)
        return response;
    }
    catch(error){
        console.log(error.message);
    }
 

};
