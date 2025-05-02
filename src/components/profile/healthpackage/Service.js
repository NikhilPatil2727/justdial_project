import {WEB_API} from "../../../common/constant";
import axios from "axios";
import { getToken } from "../getbusinesstoken/index";

// export const fetchFacilitys = async () => {
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

export const addHealthPackage = async (data) => {
    try{
        const token = await getToken(); 
        

        const response = await axios.post(
            `${WEB_API}/healthpackages/add`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    
                },
            }
        );

        console.log("api response:",response.data)
        return response;
    }
    catch(error){
        console.log(error.message);
    }
  
};


export const updateHealthPackage = async (id,formData) => {
    try{
        const response=await axios.put(`${WEB_API}/healthpackages/update/${id}`, formData);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
  
};


export const deleteHealthPackage = async (id) => {
    try{
        const response=await axios.delete(`${WEB_API}/healthpackages/delete/${id}`);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
   
};
export const viewFacilitys = async (id) => {
    try{
        const response=await axios.get(`${WEB_API}/healthpackages/view/${id}`);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
  
};

export const viewAllHealthPackages = async () => {
    try{
        const token = await getToken();

        const response = await axios.get(`${WEB_API}/healthpackages/viewAll`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Api response:",response)

        return response;
    }
    catch(error){
        console.log(error.message);
    }
  
};
