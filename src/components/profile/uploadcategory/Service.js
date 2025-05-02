import {WEB_API} from "../../../common/constant";
import axios from "axios";

export const fetchUploadcategory = async () => {
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

export const addUploadcategory = async () => {
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


export const updateUploadcategory = async () => {
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


export const deleteUploadcategory = async () => {
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

export const viewUploadcategory = async () => {
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