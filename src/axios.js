import axios from "axios";

const instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
});

const apiKey = process.env.REACT_APP_IMGBB_API_KEY;
export const imageApiInstance = axios.create({
    baseURL: `https://api.imgbb.com/1/upload?key=${apiKey}`,
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
})

export default instance;