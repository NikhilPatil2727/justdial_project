import {WEB_API} from "../../../common/constant";
import axios from "axios";

export const fetchDetails= async () => {
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

export const addDetails = async () => {
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


export const updateDetails = async () => {
    try{
        const response=await axios.put(`${WEB_API}`);
        return response;
    }
    catch(error){
        // setError(error.message);
    }
    finally{
        // setLoading(false)
    }
};


export const deleteDetails = async () => {
    try{
        const response=await axios.delete(`${WEB_API}`);
        return response;
    }
    catch(error){
        // setError(error.message);
    }
    finally{
        // setLoading(false)
    }
};
export const viewDetails = async () => {
    try{
        const response=await axios.get(`${WEB_API}`);
        return response;
    }
    catch(error){
        // setError(error.message);
    }
    finally{
        // setLoading(false)
    }
};