import {WEB_API} from "../../../common/constant";
import axios from "axios";

export const fetchTopcategory = async () => {
    try{
        const response=await axios.get(`${WEB_API}/home/top-categories`);
        console.log("APi respn:",response)
        return response;
    }
    catch(error){
        console.log(error.message);
    }
  
   

};

// export const addTopCategory = async () => {
//     try{
//         const response=await axios.post(`${WEB_API}`);
//         return response;
//     }
//     catch(error){
//         console.log(error.message);
//     }
//     // finally{
//     //     setLoading(false)
//     // }
// };


// export const updateTopcategory = async () => {
//     try{
//         const response=await axios.put(`${WEB_API}`);
//         return response;
//     }
//     catch(error){
//         console.log(error.message);
//     }
//     // finally{
//     //     setLoading(false)
//     // }
// };


// export const deleteTopcategory = async () => {
//     try{
//         const response=await axios.delete(`${WEB_API}`);
//         return response;
//     }
//     catch(error){
//         console.log(error.message);
//     }
//     // finally{
//     //     setLoading(false)
//     // }
// };
// export const viewTopcategory = async () => {
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