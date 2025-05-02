import { WEB_API } from "../../../common/constant";
import axios from "axios";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${WEB_API}/registration/create`, userData);
    return response.data;
  } catch (err) {
    console.error("Error during registration:", err.message);
    throw new Error("Registration failed. Please try again.");
  }
};

