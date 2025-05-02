import {WEB_API} from "../../../common/constant";
import axios from "axios";
import { getToken } from '../getbusinesstoken/index';


// export const fetchOffers = async (data) => {
//     try{
//         const response=await axios.get(`${WEB_API}/offer/create`,data);
//         return response;
//     }
//     catch(error){
//         console.log(error.message);
//     }
  
    
   

// };

export const addOffers = async (data) => {
    try {
        const token = await getToken();

        const response = await axios.post(
            `${WEB_API}/offer/create`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("API response:", response.data);
        return response;
    } catch (error) {
        console.log("Error:", error.message);
    }
};

export const viewAllOffers = async () => {
    try {
        const token = await getToken();

        const response = await axios.get(`${WEB_API}/offer/viewAll`, {
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

export const updateOffers = async (id) => {
    try{
        const response=await axios.put(`${WEB_API}/offer/update/${id}`);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
   
};


export const deleteOffers = async (id) => {
    try{
        const response=await axios.delete(`${WEB_API}/offer/delete/${id}`);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
   
};
export const viewOffers = async (id) => {
    try{
        const response=await axios.get(`${WEB_API}/offer/view/${id}`);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
  
};

