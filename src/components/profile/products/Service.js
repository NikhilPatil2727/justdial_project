import {WEB_API} from "../../../common/constant";
import axios from "axios";
import { getToken } from '../getbusinesstoken/index';


// export const fetchProduct = async () => {
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


// export const addProduct = async (data) => {
//     try {
//         const token = await getToken();

//         const response = await axios.post(
//             `${WEB_API}/products/createProduct`,
//             data,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             }
//         );

//         console.log("API response:", response.data);
//         return response;
//     } catch (error) {
//         console.log("Error:", error.message);
//     }
// };
export const addProduct = async (data) => {
    try {
        const token = await getToken();
        return await axios.post(`${WEB_API}/products/createProduct`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.error("Error adding product:", error.response?.data || error.message);
        return { error: error.response?.data || "Something went wrong!" };
    }
};



export const updateProduct = async (id,formData) => {
    try{
        const response=await axios.put(`${WEB_API}/products/updateProduct/${id}`,formData);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
  
};


export const deleteProduct = async (id) => {
    try{
        const response=await axios.delete(`${WEB_API}/products/deleteProduct/${id}`);
        return response;
    }
    catch(error){
        console.log(error.message);
    }
  
};
export const viewProduct = async (id) => {
    try{
        const response = await axios.get(`${WEB_API}/products/viewProduct/${id}`);

        return response;
    }
    catch(error){
        console.log(error.message);
    }
  
};


export const viewAllProducts = async () => {
    try {
        const token = await getToken();

        const response = await axios.get(`${WEB_API}/products/viewAllProduct`, {
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