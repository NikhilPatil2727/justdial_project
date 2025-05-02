import {WEB_API} from "../../../common/constant";
import axios from "axios";

export const fetchRecentbusiness = async () => {
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

export const addRecentbusiness = async () => {
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


export const updateRecentbusiness = async () => {
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


export const deleteRecentbusiness = async () => {
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
export const viewRecentbusiness = async () => {
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