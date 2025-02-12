import axios from 'axios';

export const axiosInstance = axios.create({
    // для корректного хоста в продакшене и в режиме разработки
    baseURL: process.env.NEXT_PUBLIC_API_URL
})