import {WEB_API} from "../../../common/constant";
import axios from "axios";
import { getToken } from '../getbusinesstoken/index';



export const addAdvertise = async (data) => {
    try{
        const response=await axios.post(`${WEB_API}/advertise/createAdvertise`,data);
        console.log("Api response:",response.data)
        return response;
    }
    catch(error){
        console.log(error.message);
    }
   
};


export const viewSubscriptions = async (data) => {
    try{
        const response=await axios.get(`${WEB_API}/subscription/fetch`,data);
        console.log("api response:",response.data)
        return response;
    }
    catch(error){
        console.log(error.message);
    }
   
};

export const saveSubscription = async (subscriptionData) => {
    try{
        const response=await axios.post(`${WEB_API}/subscriptions_history/saveSubscription`,subscriptionData);
        console.log("api saveSubscription:",response)
        return response;
    }
    catch(error){
        console.log(error.message);
    }
   
};

;


export const getSubscriptionHistory = async () => {
    try {
        const token = await getToken(); 
        let data=""

        const response = await axios.post(
            `${WEB_API}/subscriptions_history/SubscriptionHistory`,
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



