import {WEB_API} from "../../../common/constant";
import axios from "axios";
import { getToken } from '../getbusinesstoken/index';


// export const fetchServices = async () => {
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

export const addServices = async (data) => {
    try{
        const token = await getToken(); 
        

        const response = await axios.post(
            `${WEB_API}/services/create`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    
                },
            }
        );
        console.log("api respnose:",response.data)
        return response;
    }
    catch(error){
        console.log(error.message);
    }
   
};



export const updateServices = async (id,formData) => {
    try{
        const response=await axios.put(`${WEB_API}/services/update/${id}`,formData);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
    
};


export const deleteServices = async (id) => {
    try{
        const response=await axios.delete(`${WEB_API}/services/delete/${id}`);
        console.log(response)
        return response;
    }
    catch(error){
        console.log(error.message);
    }
  
};
export const viewServices = async (id) => {
    try{
        const response=await axios.get(`${WEB_API}/services/view/${id}`);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
 
};
export const viewAllServices = async () => {
    try{
        const token = await getToken(); 

        const response = await axios.get(`${WEB_API}/services/viewAll`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        return response;
    }
    catch(error){
        console.log(error.message);
    }
  
};
