import {WEB_API} from "../../../comman/constant";
import axios from "axios";

export const fetchCatalog = async () => {
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
export const addCatalog = async () => {
    try{
        const response=await axios.post(`${WEB_API}`);
        return response;
    }
    catch(error){
        // setError(error.message);
    }
    finally{
        // setLoading(false)
    }
};
export const updateCatalog = async () => {
    try{
        const response=await axios.put(`${WEB_API}`);
        return response;
    }
    catch(error){
        setError(error.message);
    }
    finally{
        setLoading(false)
    }
};
export const deleteCatalog = async () => {
    try{
        const response=await axios.delete(`${WEB_API}`);
        return response;
    }
    catch(error){
        setError(error.message);
    }
    finally{
        setLoading(false)
    }
};
export const viewCatalog = async () => {
    try{
        const response=await axios.get(`${WEB_API}`);
        return response;
    }
    catch(error){
        setError(error.message);
    }
    finally{
        setLoading(false)
    }
};