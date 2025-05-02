
import {WEB_API} from "../../../common/constant";
import axios from "axios";
import { getToken } from '../getbusinesstoken/index';


// export const fetchProduct = async () => {
//     try{
//         const response=await axios.get(`${WEB_API}`);
//         return response;
//     }
//     catch(error){
//         console.log(error.message);
//     }
//     // finally{
//     //     setLoading(false)
//     // }
   

// };

export const addAmenity = async (data) => {
    try {
        const token = await getToken(); 
        

        const response = await axios.post(
            `${WEB_API}/amenity/create`,
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


export const updateAmenity = async (id,formData) => {
    try{
        const response=await axios.put(`${WEB_API}/amenity/update/${id}`,formData);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
  
};


export const deleteAmenity = async (id) => {
    try{
        const response=await axios.delete(`${WEB_API}/amenity/delete/${id}`);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
  
};
export const viewAmenity = async (id) => {
    try{
        const response=await axios.get(`${WEB_API}/amenity/view/${id}`);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
  
};

export const viewAllAmenity = async () => {
    try {
        const token = await getToken(); 

        const response = await axios.get(`${WEB_API}/amenity/viewAll`, {
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
