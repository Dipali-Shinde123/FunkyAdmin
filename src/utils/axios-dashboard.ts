import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { HOST_API } from "../config-global";

// Create an Axios instance
const axiosInstance = axios.create({ baseURL: HOST_API });

// Axios response interceptor with proper error handling
axiosInstance.interceptors.response.use(
    (res: AxiosResponse) => res,
    (error: AxiosError) => {
        const errorMessage = (error.response && error.response.data) || 'Something went wrong';
        return Promise.reject(errorMessage);
    }
);

export default axiosInstance;

// Fetcher function with proper types
export const fetcher = async (args: [string, AxiosRequestConfig?]): Promise<any> => {
    const [url, config] = args;
    const URL = `${HOST_API}${url}`;
    const res = await axiosInstance.get(URL, { ...config });
    return res.data;
}

// Poster function with proper types
export const poster = async (
    url: string,
    data: any,
    headers: AxiosRequestConfig['headers']
): Promise<any> => {
    const URL = `${HOST_API}${url}`;
    const res = await axios.post(URL, data, { headers });
    return res.data;
}

// Putter function with proper types
export const puter = async (
    url: string,
    data: any,
    headers: AxiosRequestConfig['headers']
): Promise<any> => {
    const URL = `${HOST_API}${url}`;
    const res = await axios.put(URL, data, { headers });
    return res.data;
}

// Deleter function with proper types
export const deleter = async (
    url: string,
    headers: AxiosRequestConfig['headers']
): Promise<any> => {
    const URL = `${HOST_API}${url}`;
    try {
        // Perform the delete request with the correct headers
        const res = await axios.delete(URL, { headers });
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        } else {
            throw new Error('Network error, please try again later.');
        }
    }
}

// API endpoints with types
export const endpoints = {
    users: {
        list: '/admin/user/list',
        create: '/admin/user-create',
        details: '/admin/user/show',
        update: '/admin/user/update',
        delete: '/admin/user/delete',
        blockUnblock: '/admin/blockUnblockStatus'
    },
    content: {
        list: '/admin/user/list',
        create: '/admin/user-create',
        details: '/admin/user/show',
        update: '/admin/user/update',
        delete: '/admin/user/delete',
        blockUnblock: '/admin/blockUnblockStatus'
    }
};