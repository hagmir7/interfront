import axios from 'axios';

export const tracking = async (trackingCode) => {
    const response = await axios.get(`https://online.intercocina.space/api/traking?code=${trackingCode}`);
    
    return response.data;
};