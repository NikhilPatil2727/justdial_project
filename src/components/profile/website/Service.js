import {WEB_API} from "../../../common/constant";
import axios from "axios";
import { getToken } from "../getbusinesstoken";



export const addWebsite = async (data) => {
    try{
        const token = await getToken();

        const response = await axios.post(
            `${WEB_API}/website/create`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Api response :",response.data)
        return response;
    }
    catch(error){
        console.log(error.message);
    }
 
};


export const updateWebsite = async (data) => {
    try{
        const response=await axios.put(`${WEB_API}/website/update`,data);
        console.log("Api responseUpdate:",response.data)
        return response;
    }
    catch(error){
        console.log(error.message);
    }
  
};



export const viewWebsite = async (id,data) => {
    try{
        const response=await axios.get(`${WEB_API}/website/view/${id}`,data);
        console.log("Api responseview:",response)
        return response;
    }
    catch(error){
        console.log(error.message);
    }
 
};