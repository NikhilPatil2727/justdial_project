import {WEB_API} from "../../../common/constant";
import axios from "axios";
import { getToken } from '../getbusinesstoken/index';



export const viewReviews = async () => {
    try {
        const response = await axios.get(`${WEB_API}/reviews/viewAll`);
        console.log("api response:", response.data);
        return response;
    } catch (error) {
        console.log(error.message);
    }
  };
  
//   export const viewReviews = async () => {
//     try {
//         const token = await getToken();

//         const response = await axios.get(`${WEB_API}/reviews/viewAll`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         console.log("API response:", response.data);
//         return response;
//     } catch (error) {
//         console.log(error.message);
//     }
//   };