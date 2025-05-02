import {WEB_API} from "../../../common/constant";
import axios from "axios";
import { getToken } from '../getbusinesstoken/index';


export const fetchVideos = async () => {
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

export const addVideos = async (data) => {
    try{
        const token = await getToken();

        const response = await axios.post(
            `${WEB_API}/videos/create`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Api response:",response.data)
        return response;
    }
    catch(error){
        console.log(error.message);
    }
   
};


export const updateVideos = async (id,formData) => {
    try{
        const response=await axios.put(`${WEB_API}/videos/update/${id}`,formData);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
    // finally{
    //     setLoading(false)
    // }
};


export const deleteVideos = async (id) => {
    try{
        const response=await axios.delete(`${WEB_API}/videos/delete/${id}`);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
    // finally{
    //     setLoading(false)
    // }
};
export const viewVideos = async (id) => {
    try{
        const response=await axios.get(`${WEB_API}/videos/view/${id}`);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
    // finally{
    //     setLoading(false)
    // }
};
export const viewAllVideos = async () => {
    try{
        const token = await getToken();

        const response = await axios.get(`${WEB_API}/videos/viewAll`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    }
    catch(error){
        console.log(error.message);
    }
    // finally{
    //     setLoading(false)
    // }
};