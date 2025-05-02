import {WEB_API} from "../../../common/constant";
import axios from "axios";
import { getToken } from "../getbusinesstoken/index";

// export const fetchLabtest = async () => {
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

export const addLabtest = async (data) => {
    try{
        const token = await getToken(); 
        

        const response = await axios.post(
            `${WEB_API}/labtest/create`,
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


export const updateLabtest = async (id,formData) => {
    try{
        const response=await axios.put(`${WEB_API}/labtest/update/${id}`,formData);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
 
};


export const deleteLabtest = async (id) => {
    try{
        const response=await axios.delete(`${WEB_API}/labtest/delete/${id}`);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
  
};

export const viewLabtests = async (id) => {
    try{
        const response=await axios.get(`${WEB_API}/labtest/view/${id}`);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
  
};
export const viewAllLabtests = async () => {
    try{
        const token = await getToken();

        const response = await axios.get(`${WEB_API}/labtest/viewAll`, {
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