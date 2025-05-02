import {WEB_API} from "../../../common/constant";
import axios from "axios";


export const fetchMaincategory = async () => {
    try{
        const response=await axios.get(`${WEB_API}/home/categories`);
        console.log("Api response:",response)
        return response;
    }
    catch(error){
        console.log(error.message);
    }  
   

};

export const addMaincategory = async () => {
    try{
        const response=await axios.post(`${WEB_API}`);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
    // finally{
    //     setLoading(false)
    // }
};


export const updateMaincategory = async () => {
    try{
        const response=await axios.put(`${WEB_API}`);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
    // finally{
    //     setLoading(false)
    // }
};


export const deleteMaincategory = async () => {
    try{
        const response=await axios.delete(`${WEB_API}`);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
    // finally{
    //     setLoading(false)
    // }
};
export const viewMaincategory = async () => {
    try{
        const response=await axios.get(`${WEB_API}`);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
    // finally{
    //     setLoading(false)
    // }
};