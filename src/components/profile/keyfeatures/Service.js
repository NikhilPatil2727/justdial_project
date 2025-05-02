import { WEB_API } from "../../../common/constant";
import axios from "axios";
import { getToken } from "../getbusinesstoken/index";

export const addKeyFeature = async (data) => {
    try {
        const token = await getToken();

        const response = await axios.post(
            `${WEB_API}/keyfeatures/create`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("API Response:", response.data);

        return response;
    } catch (error) {
        console.error("Error adding key feature:", error.message);
    }
};

export const updateKeyFeature = async (id, formData) => {
    try {
        const token = await getToken();

        const response = await axios.put(
            `${WEB_API}/keyfeatures/update/${id}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error updating key feature:", error.message);
    }
};

export const deleteKeyFeature = async (id) => {
    try {
        const token = await getToken();

        const response = await axios.delete(`${WEB_API}/keyfeatures/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error deleting key feature:", error.message);
    }
};

export const viewKeyFeature = async (id) => {
    try {
        const token = await getToken();

        const response = await axios.get(`${WEB_API}/keyfeatures/view/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error fetching key feature:", error.message);
    }
};

export const viewAllKeyFeatures = async () => {
    try {
        const token = await getToken();

        const response = await axios.get(`${WEB_API}/keyfeatures/viewAll`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error fetching key features:", error.message);
    }
};
