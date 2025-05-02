import { WEB_API } from "../../../common/constant";
import axios from "axios";


export const userLogin = async (loginData) => {
  try {
    const response = await axios.post(`${WEB_API}/registration/userLogin`, loginData);
    return response.data;
  } catch (err) {
    console.error("Error during login:", err.message);
    throw new Error("Login failed. Please check your credentials.");
  }
};

