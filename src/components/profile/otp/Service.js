import { WEB_API } from "../../../common/constant";
import axios from "axios";

// Updated verifyOtp function to accept OTP data
export const verifyBusinessOTP = async (otpData) => {
    // console.log("Sending data:", formData);
  try {
    const response = await axios.post(`${WEB_API}/businessregistration/verifyBusinessOTP`,otpData);
    console.log("api responese:",response)
    return response;
  } catch (err) {
    console.error("Error during OTP verification:", err.message);
    throw new Error("OTP verification failed. Please try again.");
  }
};
