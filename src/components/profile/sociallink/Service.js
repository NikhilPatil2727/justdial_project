import {WEB_API} from "../../../common/constant";
import axios from "axios";
import { getToken } from '../getbusinesstoken/index';


// export const fetchSociallink = async () => {
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

export const addSociallink = async (data) => {
    try{
          const token = await getToken(); 
        

        const response = await axios.post(
            `${WEB_API}/sociallinks/create`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    
                },
            }
        );
        console.log("Api responsecreate:",response.data)
        return response;
    }
    catch(error){
        console.log(error.message);
    }
  
};


export const updateSociallink = async () => {
    try{
        const response=await axios.put(`${WEB_API}/sociallinks/update`);
        console.log("Api responseupdate:",response)
        return response;
    }
    catch(error){
        console.log(error.message);
    }
   
};

export const deleteSociallink = async (id) => {
    try{
        const response=await axios.delete(`${WEB_API}/sociallinks/delete/${id}`);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
    // finally{
    //     setLoading(false)
    // }
};
export const viewSociallink = async (id) => {
    try{
        const response=await axios.get(`${WEB_API}/sociallink/view/${id}`);
        // console.log("Api responses:",response)
        return response;
    }
    catch(error){
        console.log(error.message);
    }
   
};

 export const viewAllSociallink = async () => {
     try{
    const token = await getToken(); 

    const response = await axios.get(`${WEB_API}/sociallinks/viewAll`, {
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
