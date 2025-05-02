import {WEB_API} from "../../../common/constant";
import axios from "axios";
import { getToken } from '../getbusinesstoken/index';


export const addPhotos = async (data) => {
    try {
        const token = await getToken();

        const response = await axios.post(
            `${WEB_API}/photos/create`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("API response:", response.data);
        return response;
    } catch (error) {
        console.log("Error:", error.message);
    }
};

export const updatePhotos = async (id,formData) => {
    try{
        const response=await axios.put(`${WEB_API}/photos/update/${id}`,formData);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
  
};




export const deletePhotos = async (id) => {
    try{
        const response=await axios.delete(`${WEB_API}/photos/delete/${id}`);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
 
};
export const viewPhotos = async (id) => {
    try{
        const response=await axios.get(`${WEB_API}/photos/view/${id}`);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
    // finally{
    //     setLoading(false)
    // }
};


export const viewAllPhotos = async () => {
    try {
        const token = await getToken();

        const response = await axios.get(`${WEB_API}/photos/viewAll`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("API response:", response);
        return response;
    } catch (error) {
        console.log("Error:", error.message);
    }
};