import axios from 'axios';

export const tracking = async (trackingCode) => {
    const response = await axios.get(`https://intercocina.online/api/tracking?code=${trackingCode}`);
    return response.data;
};