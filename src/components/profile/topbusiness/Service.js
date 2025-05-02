import {WEB_API} from "../../../common/constant";
import axios from "axios";

export const fetchCategories = async () => {
    try {
      const response = await axios.get(`${WEB_API}/home/top-businesses`);
      return response.data;
    } catch (error) {
      console.log("Fetch error:", error.message);
      return null;
    }
  };
  
// export const fetchTopbusiness = async () => {
//     try {
//         const response = await axios.get(`${WEB_API}/home/top-businesses`);
//         console.log("Api business response:", response.data);
//         return response.data;
//     } catch (error) {
//         console.log("Fetch error:", error.message);
//         return null;
//     }
// };


export const addTopbusiness = async () => {
    try{
        const response=await axios.post(`${WEB_API}`);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
};


export const updateTopbusiness = async () => {
    try{
        const response=await axios.put(`${WEB_API}`);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
};


export const deleteTopbusiness = async () => {
    try{
        const response=await axios.delete(`${WEB_API}`);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
};
export const viewTopbusiness = async () => {
    try{
        const response=await axios.get(`${WEB_API}`);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
};