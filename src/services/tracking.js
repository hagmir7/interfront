import axios from 'axios';

export const tracking = async (trackingCode) => {
    const response = await axios.get(`https://intercocina.online/api/traking?code=${trackingCode}`);
    
    return response.data;
};