import { WEB_API } from "../../../common/constant";
import axios from "axios";
import { getToken } from "../getbusinesstoken/index";

export const addMenu = async (data) => {
    try {
        const token = await getToken();
        const response = await axios.post(
            `${WEB_API}/menu/create`,
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
        console.log(error.message);
    }
};

export const updateMenu = async (id, formData) => {
    try {
        const response = await axios.put(`${WEB_API}/menu/update/${id}`, formData);
        return response;
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteMenu = async (id) => {
    try {
        const response = await axios.delete(`${WEB_API}/menu/delete/${id}`);
        return response;
    } catch (error) {
        console.log(error.message);
    }
};

export const viewMenu = async (id) => {
    try {
        const response = await axios.get(`${WEB_API}/menu/view/${id}`);
        return response;
    } catch (error) {
        console.log(error.message);
    }
};

export const viewAllMenus = async () => {
    try {
        const token = await getToken();
        const response = await axios.get(`${WEB_API}/menu/viewAll`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.log(error.message);
    }
};
