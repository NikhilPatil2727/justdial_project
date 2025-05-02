import { WEB_API } from "../../../common/constant";
import axios from "axios";

// Updated verifyOtp function to accept OTP data
export const verifyOtp = async (otpData) => {
  try {
    const response = await axios.post(`${WEB_API}/registration/verifyOTP`, otpData);
    console.log("api responese:",response)
    return response;
  } catch (err) {
    console.error("Error during OTP verification:", err.message);
    throw new Error("OTP verification failed. Please try again.");
  }
};
