
import axios from 'axios';
import { WEB_API } from '../../../common/constant';

export const getProfile = async (userId) => {
  try {
    const response = await axios.get(`${WEB_API}/registration/viewuserprofile/${userId}`); 
    return response.data; 
  } catch (err) {
    console.error('Error fetching profile:', err.message);
    throw new Error('Failed to fetch user profile');
  }
};


export const updateProfile = async (userId, updatedData) => {
  try {
    const response = await axios.put(
      `${WEB_API}/registration/updateprofile/${userId}`, 
      updatedData
    );
    return response.data; 
  } catch (err) {
    console.error('Error updating profile:', err.message);
    throw new Error('Failed to update user profile');
  }
};
