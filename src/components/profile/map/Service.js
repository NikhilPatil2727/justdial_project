import {WEB_API} from "../../../common/constant";
import axios from "axios";
import { getToken } from '../getbusinesstoken/index';


// export const fetchMap = async () => {
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

export const addMap = async (data) => {
    try{
        const token = await getToken();

        const response = await axios.post(
            `${WEB_API}/Map/create`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Api responseeee:",response.data)
        return response;
    }
    catch(error){
        console.log(error.message);
    }
  
};


export const updateMap = async (data) => {
    try{
        const response=await axios.put(`${WEB_API}/Map/update`,data);
        // console.log("Api response:",response)
        return response;
    }
    catch(error){
        console.log(error.message);
    }
  
};


// export const deleteMap = async () => {
//     try{
//         const response=await axios.delete(`${WEB_API}`);
//         return response;
//     }
//     catch(error){
//         console.log(error.message);
//     }
   
// };
export const viewMap = async (id) => {
    try {
        const response = await axios.get(`${WEB_API}/Map/view/${id}`);
        return response;
    } catch (error) {
        console.error("Error fetching map:", error.message);
    }
};