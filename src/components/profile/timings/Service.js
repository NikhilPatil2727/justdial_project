import {WEB_API} from "../../../common/constant";
import axios from "axios";
import { getToken } from '../getbusinesstoken/index';


// export const fetchTimings = async () => {
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

export const addTimings = async (data) => {
    try {
        const token = await getToken(); // Fetch authentication token

        const response = await axios.post(
            `${WEB_API}/timings/create`,
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



export const updateTiming = async () => {
    try{
        const response=await axios.put(`${WEB_API}/timings/update`);
        console.log("Api responseupdate:",response)
        return response;
    }
    catch(error){
        console.log(error.message);
    }
   
};


export const deleteTiming = async (id) => {
    try{
        const response=await axios.delete(`${WEB_API}/timings/delete/${id}`);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
  
};

export const viewTimings = async (id) => {
    try{
        const response=await axios.get(`${WEB_API}/timings/view/${id}`);
        // console.log("Api responses:",response)
        return response;
    }
    catch(error){
        console.log(error.message);
    }
   
};
// export const viewAllTimings = async () => {
//     try{
//         const response=await axios.get(`${WEB_API}/timings/viewAll`);
//         console.log("Api timinggggggg:",response)
//         return response;
//     }
//     catch(error){
//         console.log(error.message);
//     }
   
// };
export const viewAllTimings = async () => {
    try{
        const token = await getToken(); 

        const response = await axios.get(`${WEB_API}/timings/viewAll`, {
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