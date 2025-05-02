import {WEB_API} from "../../../common/constant";
import axios from "axios";

export const fetchAllCategorydetails = async (id) => {
    try{
        const response=await axios.get(`${WEB_API}/businessregistration/view/${id}`);
        // console.log("API response:",response)
        return response;
    }
    catch(error){
        console.log(error.message);
    }
 

};

// export const getReview = async (id) => {
//     try{
//         const response=await axios.get(`${WEB_API}/reviews/fetch/${id}`);
//         console.log("API review response:",response)
//         return response;
//     }
//     catch(error){
//         console.log(error.message);
//     }
 

// };



// export const addCategorydetails = async () => {
//     try{
//         const response=await axios.post(`${WEB_API}`);
//         return response;
//     }
//     catch(error){
//         console.log(error.message);
//     }
    
// };


// export const updateCategorydetails = async () => {
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


// export const deleteCategorydetails = async () => {
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
// export const viewCategorydetails = async () => {
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